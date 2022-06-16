import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Main from '../pages/Main/Main';
import {
    setAlertMessage,
    getUserAddress,
    clearImageData,
    setImageSha256,
    saveImageToPinata,
    saveImageToBlockchain
} from '../actions';

export default connect(
    state => ({
        authorAddress: state.user.address,
        isImageLoading: state.condition.isMainImageLoading
    }),
    dispatch => bindActionCreators({
        setAlertMessage,
        getUserAddress,
        clearImageData,
        setImageSha256,
        saveImageToPinata,
        saveImageToBlockchain
    }, dispatch)
)(Main);
