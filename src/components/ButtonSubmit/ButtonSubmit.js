import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSubmit.css';

const ButtonSubmit = ({ text, isLoading, handleSubmit }) => {
    return (
        <button className='button' onClick={handleSubmit}>
            {isLoading ? (
                <div className='button-loader' />
            ) : (
                <span>{text}</span>
            )}
        </button>
    );
};

ButtonSubmit.propTypes = {
    text: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default ButtonSubmit;


