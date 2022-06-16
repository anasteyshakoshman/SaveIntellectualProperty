import { connect } from 'react-redux';
import Profile from '../pages/Profile/Profile';
import { bindActionCreators } from 'redux';
import { getUserAddress, setAuthorInfo, setAlertMessage } from '../actions';

export default connect(
    state => ({
        user: state.user,
        listAuthorImages: state.user.listAuthorImages,
        listOwnerImages: state.user.listOwnerImages,
        isButtonLoading: state.condition.isProfileButtonLoading,
        isListLoading: state.condition.isProfileImagesLoading
    }),
    dispatch => bindActionCreators({
        getUserAddress,
        setAuthorInfo,
        setAlertMessage
    }, dispatch)
)(Profile);
