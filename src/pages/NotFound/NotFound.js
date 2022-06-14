import React from 'react';
import { Link } from 'react-router-dom';
import './NotFound.css';

const NotFound = () => {
    return (
        <div className='not-found'>
            404!
            <Link className='link' to='/'>На главную :)</Link>
        </div>
    );
};

export default NotFound;
