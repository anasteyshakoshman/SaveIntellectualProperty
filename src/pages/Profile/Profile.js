import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { userPropTypes, imagePropType } from '../../propTypes';
import { PINATA_IMAGE_URL } from '../../constants';
import './Profile.css';

const Profile = (props) => {
    const { user, listAuthorImages, getListImages } = props;

    useEffect(() => {
        getListImages().then(() => {
            console.log(listAuthorImages);
        });
    }, []);

    // const renderAuthorNode = (author) => (
    //     <div>
    //         <span>
    //             Автор: {author.name ? author.name : author.address}
    //         </span>
    //         {author.description && (
    //             <span>
    //                 Об Авторе: {author.description}
    //             </span>
    //         )}
    //     </div>
    // );

    return (
        <div>
            <div>Автор</div>
            <div className=''>

            </div>
            {Object.keys(listAuthorImages)?.length && Object.values(listAuthorImages)?.map(image => {
                const { name, description, authorAddress, ipfs_pin_hash } = image;

                return (
                    <div key={name}>
                        <div>{name}</div>
                        <div>{description}</div>
                        <div>Автор: {authorAddress === user.address ? 'Вы' : authorAddress}</div>
                        <img src={PINATA_IMAGE_URL + ipfs_pin_hash} alt='' />
                    </div>
                )
            })}
        </div>
    );
};

Profile.propTypes = {
    user: userPropTypes.isRequired,
    listOwnerImages: PropTypes.objectOf(imagePropType).isRequired,
    listAuthorImages: PropTypes.objectOf(imagePropType).isRequired,
    getListImages: PropTypes.func.isRequired
};

export default Profile;
