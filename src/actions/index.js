import { USER, ALERT, LOADING, IMAGE } from '../constants/action-types';
import { Api } from '../api';
import {
    cancelMetamaskPayment,
    walletConnectionProcessStartedErrorCode,
    pinataOptions
} from '../constants';

// LOADING
const turnOnLoading = () => dispatch => {
    dispatch({
        type: LOADING.TURN_ON
    });
};

const turnOffLoading = () => dispatch => {
    dispatch({
        type: LOADING.TURN_OFF
    });
};


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
        })
        .catch(error => {
            switch(error?.code) {
                case walletConnectionProcessStartedErrorCode:
                    dispatch(setAlertMessage('Запрос на подключение к Metamask был отправлен, пожалуйста, подождите'));
                    break;
                case cancelMetamaskPayment:
                    dispatch(setAlertMessage('Оплата транзакции была отменена'));
                    break;
                default:
                    dispatch(setAlertMessage('Что-то пошло не так, пожалуйста, попробуйте позже'));

            }
        });
};

export const getUserName = ()  => async (dispatch, getState) => {
    //
}

export const getUserDescription = ()  => async (dispatch, getState) => {
    //
}

export const getListImages = () => async (dispatch, getState) => {
    const { address, listAuthorImages } = getState().user;

    if (!address) {
        return;
    }

    try {
        const listTokens = await Api.getListAuthorImages(address);

        if (!listTokens?.length) {
            return;
        }

        const listImages = {};

        for (const tokenId of listTokens) {
            const imageHash = await Api.getImageIdentifier(Number(tokenId));

            // Если изображение с заданным tokenId не сохранено в БД блокчейна
            // или инфо об изображении уже загружено на клиент - скипаем
            if (!imageHash || Object.keys(listAuthorImages[imageHash] || {})?.length) {
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
    } catch(error) {}
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

    dispatch(turnOnLoading());

    const data = new FormData();
    const autorAddress = user.address;
    const metadata = JSON.stringify({
        name: hash, // в это поле кладем сгенерированное sha256 картинки для последующего получения изображения по хэшу
        keyvalues: {
            name,
            description,
            autorAddress,
            ownerAddress: autorAddress,
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
                dispatch(turnOffLoading());
            } else if (!IpfsHash) {
                throw new Error();
            }
        })
        .catch(() => {
            dispatch(setAlertMessage('Не удалось сохранить изображение, попробуйте еще раз'));
            dispatch(turnOffLoading());
        });
};

export const saveImageToBlockchain = () => async (dispatch, getState) => {
    const { image: { hash }, user: { address } } = getState();

    if (!hash) {
        return false;
    }

    dispatch(turnOnLoading());

    try {
        const response = await Api.saveImageHashToBlockchain(hash, address);

        if (!response?.status) {
            throw new Error();
        }

        dispatch(setAlertMessage('Работа успешно загружена, вы можете посмотреть информацию о ней в профиле'));
        dispatch(clearImageData());
        dispatch(turnOffLoading());

        return true;
    } catch (error) {
        if (error?.code === cancelMetamaskPayment) {
            dispatch(setAlertMessage('Оплата транзакции была отменена'));
        } else {
            dispatch(setAlertMessage('Что-то пошло не так, попробуйте еще раз :)'));
        }

        await Api.deleteImageFromPinata(hash)
            .then(() => {
                dispatch(clearImageData());
            }).catch();

        dispatch(turnOffLoading());

        return false;
    }
}


