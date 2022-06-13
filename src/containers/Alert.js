import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { clearAlertMessage } from '../actions';
import Alert from '../components/Alert/Alert';

export default connect(
    state => ({
    message: state.alert.message
}), dispatch => ({
    handleClose: bindActionCreators(clearAlertMessage, dispatch)
}))(Alert);
