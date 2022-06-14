import { connect } from 'react-redux';
import Profile from '../pages/Profile/Profile';
import { bindActionCreators } from 'redux';
import { getUserAddress, setAuthorInfo, setAlertMessage } from '../actions';

export default connect(
    state => ({
        user: state.user,
        listAuthorImages: state.user.listAuthorImages,
        listOwnerImages: state.user.listOwnerImages
    }),
    dispatch => bindActionCreators({
        getUserAddress,
        setAuthorInfo,
        setAlertMessage
    }, dispatch)
)(Profile);
