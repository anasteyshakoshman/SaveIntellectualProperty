import React, { Fragment } from 'react';
import { cloudBig, cloudLittle, cloudMiddle, lineBigIcon } from '../../resources';
import './Background.css';

const Background = () => {
    return (
        <Fragment>
            <img
                className='cloud-icon__big'
                src={cloudBig}
                alt='' />
            <img
                className='cloud-icon__middle'
                src={cloudMiddle}
                alt='' />
            <img
                className='cloud-icon__little'
                src={cloudLittle}
                alt='' />
            <img
                className='line-big-icon'
                src={lineBigIcon}
                alt='' />
        </Fragment>
    );
};

export default Background;
