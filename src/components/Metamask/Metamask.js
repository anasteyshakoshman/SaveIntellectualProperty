import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { getShortEthAddress } from '../../utils';

const Metamask = ({ userAddress, isError, getUserAddress }) => {
    return (
        <Fragment>
            {userAddress ? (
                <h3 className='link-account'>
                    Metamask: <span className='link-address'>{getShortEthAddress(userAddress)}</span>
                </h3>
            ) : (
                <h3
                    className={`link-title ${isError ? 'link-title__error' : ''}`}
                    onClick={getUserAddress}>
                    Подключить Metamask
                </h3>
            )}
        </Fragment>
    );
};

Metamask.propTypes = {
    userAddress: PropTypes.string.isRequired,
    isError: PropTypes.bool,
    getUserAddress: PropTypes.func.isRequired
};

Metamask.defaultProps = {
  isError: false
};

export default Metamask;


