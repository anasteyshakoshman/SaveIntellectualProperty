import {USER, ALERT, CONDITION, IMAGE } from '../constants/action-types';
import { Api } from '../api';
import {
    cancelMetamaskApprove,
    walletConnectionProcessStartedErrorCode,
    pinataOptions,
    IS_PROFILE_BUTTON_LOADING,
    IS_PROFILE_IMAGES_LOADING,
    IS_MAIN_IMAGE_LOADING
} from '../constants';

// ALERT
export const setAlertMessage = (message) => dispatch => {
    dispatch({
        type: ALERT.SET_MESSAGE,
        message
    });
};

export const clearAlertMessage = () => dispatch => {
    dispatch(setAlertMessage(''));
};

// CONDITION
const conditionSetParam = (paramName, paramValue) => dispatch => {
    dispatch({
        type: CONDITION.SET_PARAM,
        result: {
            [paramName]: paramValue
        }
    });
};

// USER
export const getUserAddress = () => dispatch => {
    return Api.connectMetamask()
        .then(response => {
            if (!response?.length) {
                throw new Error();
            }

            dispatch({
                type: USER.SET_ADDRESS,
                address: response[0]
            });

            // После удачной авторизации подгружаем информацию об авторе и его список работ
            dispatch(getAuthorInfo());
            dispatch(getListImages());
        })
        .catch(error => {
            switch(error?.code) {
                case walletConnectionProcessStartedErrorCode:
                    dispatch(setAlertMessage('Запрос на подключение к Metamask был отправлен, пожалуйста, подождите'));
                    break;
                case cancelMetamaskApprove:
                    dispatch(setAlertMessage('Доступ к аккаунту metamask не был предоставлен'));
                    break;
                default:
                    dispatch(setAlertMessage('Что-то пошло не так, пожалуйста, попробуйте позже'));

            }
        });
};

export const setAuthorInfo = (name, description) => async (dispatch, getState) => {
    const {
        address,
        name: oldName,
        description: oldDescription
    } = getState().user;

    if (!address) {
        return;
    }

    dispatch(conditionSetParam(IS_PROFILE_BUTTON_LOADING, true));

    try {
        const isNewName = name !== oldName;
        const isNewDescription = description !== oldDescription;

        // Чтобы один раз запрашивалась оплата при изменении обоих параметров
        if (isNewName && isNewDescription) {
            await Api.setAuthorData(address, name, description);

            dispatch({
                type: USER.SET_DATA,
                name,
                description
            });
        } else if (isNewName) {
            await Api.setAuthorName(address, name);

            dispatch({
                type: USER.SET_NAME,
                name
            });
        } else if (isNewDescription) {
            await Api.setAuthorDescription(address, description);

            dispatch({
                type: USER.SET_DESCRIPTION,
                description
            });
        }

        dispatch(conditionSetParam(IS_PROFILE_BUTTON_LOADING, false));
    } catch (error) {
        dispatch(handleMetamaskError(error));
        dispatch(conditionSetParam(IS_PROFILE_BUTTON_LOADING, false));

    }
};

export const getAuthorInfo = ()  => async (dispatch, getState) => {
    const {
        address,
        name: oldName,
        description: oldDescription
    } = getState().user;

    if (!address) {
        return;
    }

    const name = await Api.getAuthorName(address);

    if (name && name !== oldName) {
        dispatch({
            type: USER.SET_NAME,
            name
        });
    }

    const description = await Api.getAuthorDescription(address);

    if (description && description !== oldDescription) {
        dispatch({
            type: USER.SET_DESCRIPTION,
            description
        });
    }
}

export const getListImages = () => async (dispatch, getState) => {
    const { address, listAuthorImages: prevListImages } = getState().user;

    if (!address) {
        return;
    }

    dispatch(conditionSetParam(IS_PROFILE_IMAGES_LOADING, true));

    try {
        const listTokens = await Api.getListAuthorImages();

        if (!listTokens?.length) {
            dispatch(conditionSetParam(IS_PROFILE_IMAGES_LOADING, false));
            return;
        }

        const listImages = prevListImages;

        for (const tokenId of listTokens) {
            const imageHash = await Api.getImageIdentifier(Number(tokenId));

            // Если изображение с заданным tokenId не сохранено в БД блокчейна
            // или инфо об изображении уже загружено на клиент - скипаем
            if (!imageHash || Object.keys(prevListImages[imageHash] || {})?.length) {
                continue;
            }

            const response = await Api.getImageFromPinata(imageHash);

            if (response?.data?.count) {
                const { ipfs_pin_hash, metadata } = response?.data?.rows[0];

                listImages[imageHash] = {
                    ipfs_pin_hash,
                    ...metadata.keyvalues
                };
            }
        }

        dispatch({
            type: USER.SET_AUTHOR_IMAGES,
            data: listImages
        });
    } catch(error) {
        dispatch(conditionSetParam(IS_PROFILE_IMAGES_LOADING, false));

    }
};

// IMAGE
export const clearImageData = () => dispatch => {
    dispatch({
        type: IMAGE.CLEAR_DATA
    });
};

export const setImageSha256 = (imageSha256) => dispatch => {
    dispatch({
        type: IMAGE.SET_HASH,
        hash: imageSha256
    });
}

export const saveImageToPinata = (name, description, file) => async (dispatch, getState) => {
    const { image, user } = getState();
    const { hash, isDuplicate } = image;

    if (isDuplicate) {
        dispatch(setAlertMessage('Данное изображение уже было зарегистрировано в сети'));
        return;
    }

    dispatch(conditionSetParam(IS_MAIN_IMAGE_LOADING, true));

    const authorAddress = user.address;
    let authorName = '';

    try {
        authorName = await Api.getAuthorName(authorAddress);
    } catch (error) {}

    const data = new FormData();
    const metadata = JSON.stringify({
        name: hash, // в это поле кладем сгенерированное sha256 картинки для последующего получения изображения по хэшу
        keyvalues: {
            name,
            description,
            authorAddress,
            authorName,
            ownerAddress: authorAddress,
            createdAt: (new Date()).toString()
        }
    });

    data.append('file', file, name);
    data.append('pinataMetadata', metadata);
    data.append('pinataOptions', JSON.stringify(pinataOptions));

    await Api.saveImageToPinata(data)
        .then(response => {
            if (response?.status !== 200) {
                throw new Error();
            }

            const { IpfsHash = '', isDuplicate = false } = response?.data;

            if (isDuplicate) {
                dispatch(setAlertMessage('Данное изображение уже было зарегистрировано в сети'));

                dispatch({
                    type: IMAGE.SET_IS_DUPLICATE
                });
            } else if (IpfsHash) {
                dispatch({
                    type: IMAGE.SET_PINATA_SAVING
                });
            } else {
                throw new Error();
            }
        })
        .catch(() => {
            dispatch(setAlertMessage('Не удалось сохранить изображение, попробуйте еще раз'));
            dispatch(conditionSetParam(IS_MAIN_IMAGE_LOADING, false));

        });
};

export const saveImageToBlockchain = () => async (dispatch, getState) => {
    const {
        user: { address },
        image: { hash, wasSavedToPinata }
    } = getState();

    if (!hash || !wasSavedToPinata) {
        return false;
    }

    dispatch(conditionSetParam(IS_MAIN_IMAGE_LOADING, true));

    try {
        const response = await Api.saveImageHashToBlockchain(hash, address);

        if (!response?.status) {
            throw new Error();
        }

        dispatch(setAlertMessage('Работа успешно загружена, вы можете посмотреть информацию о ней в профиле'));
        dispatch(clearImageData());
        dispatch(conditionSetParam(IS_MAIN_IMAGE_LOADING, false));

        // Обновляем список работ на клиенте после регистрации новой работы
        dispatch(getListImages());

        return true;
    } catch (error) {
        dispatch(handleMetamaskError(error));

        Api.deleteImageFromPinata(hash)
            .then(() => {
                dispatch(clearImageData());
            }).catch();

        dispatch(conditionSetParam(IS_MAIN_IMAGE_LOADING, false));

        return false;
    }
}

const handleMetamaskError = (error) => async (dispatch) => {
    if (error?.code === cancelMetamaskApprove) {
        dispatch(setAlertMessage('Оплата транзакции была отменена'));
    } else {
        dispatch(setAlertMessage('Что-то пошло не так, попробуйте еще раз :)'));
    }
};


