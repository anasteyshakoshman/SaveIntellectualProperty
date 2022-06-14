import { connect } from 'react-redux';
import ButtonSubmit from '../components/ButtonSubmit/ButtonSubmit';

export default connect((state, ownProps) => ({
    ...ownProps,
    isLoading: state.condition.buttonLoading
}))(ButtonSubmit);
