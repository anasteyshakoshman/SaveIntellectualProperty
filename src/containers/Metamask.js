import { connect } from 'react-redux';
import Metamask from '../components/Metamask/Metamask';
import { bindActionCreators } from 'redux';
import { getUserAddress } from '../actions';

export default connect(
    (state, ownProps) => ({
        ...ownProps,
        userAddress: state.user.address
    }),
    dispatch => bindActionCreators({
        getUserAddress
    }, dispatch)
)(Metamask);
