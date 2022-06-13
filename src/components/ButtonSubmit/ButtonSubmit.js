import React from 'react';
import PropTypes from 'prop-types';
import './ButtonSubmit.css';

const ButtonSubmit = ({ price, isLoading, handleSubmit }) => {
    return (
        <button className='button' onClick={handleSubmit}>
            {isLoading ? (
                <div className='button-loader' />
            ) : (
                <span>
                    Получить авторство
                    {/*{price && (*/}
                    {/*    <p className='button-subtitle'>*/}
                    {/*            <span>*/}
                    {/*                Цена за газ*/}
                    {/*            </span>*/}
                    {/*        <span>*/}
                    {/*            &nbsp;{price} ETH*/}
                    {/*        </span>*/}
                    {/*    </p>*/}
                    {/*)}*/}
                </span>
            )}
        </button>
    );
};

ButtonSubmit.propTypes = {
    price: PropTypes.number,
    isLoading: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default ButtonSubmit;


