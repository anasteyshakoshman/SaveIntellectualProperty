import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
// components
import Input from '../../components/Input/Input';
import ButtonSubmit from '../../containers/ButtonSumbit';
import { Link } from 'react-router-dom';
import Metamask from '../../containers/Metamask';
// constants
import { userPropTypes, imagePropType } from '../../propTypes';
// utils
import { convertDate } from '../../utils';
import {
    AUTHOR_NAME,
    AUTHOR_DESCRIPTION,
    PINATA_IMAGE_URL,
    inputAuthorFields
} from '../../constants';
// styles
import { downloadIcon } from '../../resources';
import './Profile.css';

const Profile = (props) => {
    const { user, listAuthorImages, getUserAddress, setAuthorInfo, setAlertMessage } = props;

    const [form, setForm] = useState({
        [AUTHOR_NAME]: user.name,
        [AUTHOR_DESCRIPTION]: user.description
    });

    const handleSubmit = useCallback(async () => {
        if (!user.address) {
            getUserAddress();
            return;
        }

        if (!form[AUTHOR_NAME] && !form[AUTHOR_DESCRIPTION]) {
            setAlertMessage('Заполните данные для отправки :)');
            return;
        }

        const { author_name, author_description } = form;

        // Сохраняем введенные автором данные на блокчейн
        await setAuthorInfo(author_name, author_description);
    }, [form, setAuthorInfo]);

    const handleChangeInput = useCallback(fieldName => event => {
        event.preventDefault();

        setForm({
            ...form,
            [fieldName]: event?.target?.value
        });
        }, [form]);

    return (
        <div className='profile'>
            <div className='profile-block'>
                <div className='profile-title'>Автор</div>
                <div className='item'>
                    <Metamask />
                    <br />
                    {inputAuthorFields.map(data => (
                        <Input
                            {...data}
                            key={data.name}
                            value={form[data.name] || ''}
                            handleChange={handleChangeInput} />
                    ))}
                    <ButtonSubmit
                        text='Сохранить'
                        handleSubmit={handleSubmit} />
                </div>
                <Link to='/'>
                    <div className='download-button'>
                        Загрузить еще работу
                    </div>
                </Link>
            </div>
            <div className='profile-block'>
                <div className='profile-title'>Работы</div>
                <div className='works'>
                    {Object.keys(listAuthorImages)?.length ? Object.values(listAuthorImages)?.map(image => {
                        // delete autorAddress
                        const { name, description, ipfs_pin_hash, autorAddress, createdAt } = image;

                        return (
                            <div key={name} className='works-item'>
                                <img className='image' src={PINATA_IMAGE_URL + ipfs_pin_hash} alt='' />
                                <div className='name'>
                                    {name}
                                </div>
                                <div className='description'>
                                    {description}
                                </div>
                                <div className='subtitle'>
                                    Автор:
                                </div>
                                <div className='description'>
                                    {user.address === autorAddress ? 'Вы' :  autorAddress}
                                </div>
                                <div className='subtitle'>
                                    Права получены:
                                </div>
                                <div className='description'>
                                    {convertDate(createdAt)}
                                </div>
                            </div>
                        )
                    }) : null}
                    <Link to='/'>
                        <div className='works-item download'>
                            <img className='download-icon' src={downloadIcon} alt=''/>
                            <span className='download-text'>Загрузить еще работу</span>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

Profile.propTypes = {
    user: userPropTypes.isRequired,
    listOwnerImages: PropTypes.objectOf(imagePropType).isRequired,
    listAuthorImages: PropTypes.objectOf(imagePropType).isRequired,
    getUserAddress: PropTypes.func.isRequired,
    setAuthorInfo: PropTypes.func.isRequired,
    setAlertMessage: PropTypes.func.isRequired
};

export default Profile;
