import { connect } from 'react-redux';
import Profile from '../pages/Profile/Profile';
import { bindActionCreators } from 'redux';
import { getListImages } from '../actions';

export default connect(
    state => ({
        user: state.user,
        listAuthorImages: state.user.listAuthorImages,
        listOwnerImages: state.user.listOwnerImages
    }),
    dispatch => ({
        getListImages: bindActionCreators(getListImages, dispatch)
    })
)(Profile);
