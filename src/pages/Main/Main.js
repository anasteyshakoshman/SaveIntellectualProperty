import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
// components
import { Link } from 'react-router-dom';
import Input from '../../components/Input/Input';
import ButtonSubmit from '../../containers/ButtonSumbit';
import Metamask from '../../containers/Metamask';
// resources
import {
    paperIcon,
    lineIcon
} from '../../resources';
// utils
import { generateImageSha256 } from '../../utils';
import throttle from 'lodash.throttle';
// constants
import {
    IMAGE_DESCRIPTION,
    IMAGE_NAME,
    AUTHOR,
    FILE,
    inputImageFields,
    errorsImageMap
} from '../../constants';
// styles
import './Main.css';

const Main = (props) => {
    const {
        authorAddress,
        saveImageToPinata,
        saveImageToBlockchain,
        getUserAddress,
        clearImageData,
        setImageSha256
    } = props;

    const [form, setForm] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (errors[AUTHOR]) {
            setTimeout(async () => {
                await getUserAddress();
            }, 2000);
        }
    }, [errors[AUTHOR]]);

    useEffect(() => {
        if (!authorAddress) {
            getUserAddress();
        }
    }, []);

    const checkClearError = useCallback((fieldName) => {
        if (errors[fieldName]) {
            setErrors({
                ...errors,
                [fieldName]: ''
            });
        }
    }, [errors, setErrors]);

    const handleChangeInput = useCallback((fieldName, isFile = false) => async (event) => {
        event.preventDefault();

        const fieldValue = isFile ? event?.target?.files[0] : event?.target?.value;

        setForm({
            ...form,
            [fieldName]: fieldValue
        });

        if (isFile) {
            await clearImageData();
            generateImageSha256(fieldValue, setImageSha256);
        }

        checkClearError(fieldName);
    }, [form, errors]);

    const checkValidForm = useCallback( () => {
        const isFilledName = Boolean(form[IMAGE_NAME]);
        const isFilledDescription = Boolean(form[IMAGE_DESCRIPTION]);
        const isFilledFile = Boolean(form[FILE]);

        setErrors({
            [IMAGE_NAME]: isFilledName ? '' : errorsImageMap[IMAGE_NAME],
            [IMAGE_DESCRIPTION]: isFilledDescription ? '' : errorsImageMap[IMAGE_DESCRIPTION],
            [FILE]: isFilledFile ? '' : errorsImageMap[FILE],
            [AUTHOR]: !authorAddress
        });

        return isFilledName && isFilledDescription && isFilledFile && authorAddress;
    }, [form, authorAddress, setErrors]);

    const handleSubmit = useCallback(throttle(async () => {
        // check valid of input data
        if (!checkValidForm()) {
            return;
        }

        // save image and metadata to pinata server
        const { image_name, image_description, file } = form;

        await saveImageToPinata(
            image_name,
            image_description,
            file
        );

        // save image unical hash to blockchain
        const isSuccess = await saveImageToBlockchain();

        if (isSuccess) {
            setForm({});
        }
    }, 3000), [form, setForm, saveImageToPinata, saveImageToBlockchain]);

    return (
        <div className='main'>
            <div className='left'>
                <div className='description'>
                    <h1 className='description-title'>
                        SIP
                        <img
                            className='title-icon'
                            src={paperIcon}
                            alt='' />
                    </h1>
                    <img src={lineIcon} alt='' />
                    <h3 className='description-subtitle'>
                        Загрузите картинку и&nbsp;получите на нее авторское право на&nbsp;блокчейн
                    </h3>
                </div>
                <div className='help'>
                    <Link to='/profile'>
                        <h3 className='link-title'>
                            Ваш профиль
                        </h3>
                    </Link>
                    <Metamask isError={errors[AUTHOR]} />
                </ div>
            </ div>
            <div className='right'>
                <div className='form'>
                    {inputImageFields.map(data => (
                        <Input
                            {...data}
                            key={data.name}
                            value={form[data.name] || ''}
                            error={errors[data.name]}
                            handleChange={handleChangeInput} />
                    ))}
                    <ButtonSubmit
                        text='Получить авторство'
                        handleSubmit={handleSubmit} />
                </div>
            </div>
        </div>
    );
};

Main.propTypes = {
    authorAddress: PropTypes.string.isRequired,
    saveImageToPinata: PropTypes.func.isRequired,
    saveImageToBlockchain: PropTypes.func.isRequired,
    clearImageData: PropTypes.func.isRequired,
    getUserAddress: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired,
    setImageSha256: PropTypes.func.isRequired
};

export default Main;
