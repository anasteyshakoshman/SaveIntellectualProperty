import React from 'react';
import PropTypes from 'prop-types';
import { Snackbar } from '@mui/material';

const Alert = ({ message, handleClose }) => {
    return (
        <Snackbar
            message={message}
            open={Boolean(message)}
            autoHideDuration={4000}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            onClose={handleClose} />
    );
};

Alert.propTypes = {
    message: PropTypes.string.isRequired,
    handleClose: PropTypes.func.isRequired
};

export default Alert;
