import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { typesFiles } from '../../constants';
import './Input.css';

const Input = ({ name, value, placeholder, error, isBig, isFile, handleChange }) => {
    const [inputFileRef, setInputFileRef] = useState(null);

    const setFileInputNode = useCallback(node => {
        setInputFileRef(node);
    }, []);

    const fileInputClick = useCallback(() => {
        inputFileRef.click();
    }, [inputFileRef]);

    const errorNode = (
        <div className='input-error'>
            {error}
        </div>
    );

    const inputClassnames = cx('input', {
        'input__big': isBig,
        'input__error': error,
        'input__filled': isFile && value
    });

    // input file
    if (isFile) {
        return (
            <>
                <button
                    className={inputClassnames}
                    onClick={fileInputClick}>
                    <span className='button-placeholder'>
                        {value ? value?.name : placeholder}
                    </span>
                    <input
                        ref={setFileInputNode}
                        type='file'
                        className='input__file'
                        accept={typesFiles}
                        multiple={false}
                        onChange={handleChange(name, true)} />
                </button>
                {error && errorNode}
            </>
        );
    }

    // textarea
    if (isBig) {
        return (
            <>
                <textarea
                    className={inputClassnames}
                    name={name}
                    value={value}
                    placeholder={placeholder}
                    onChange={handleChange(name)} />
                {error && errorNode}
            </>
        );
    }

    // input text
    return (
        <>
            <input
                className={`input ${error ? 'input__error' : ''} ${isBig ? 'input__big' : ''}`}
                type='text'
                name={name}
                value={value}
                placeholder={placeholder}
                onChange={handleChange(name)} />
            {error && errorNode}
        </>
    );
};

Input.propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]).isRequired,
    error: PropTypes.string,
    placeholder: PropTypes.string.isRequired,
    handleChange: PropTypes.func.isRequired
};

Input.defaultProps = {
    error: ''
};

export default Input;
