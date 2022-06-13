import { ALERT } from '../constants/action-types';

const initialState = {
    message: ''
};

export const alert = (state = initialState, action) => {
    switch (action.type) {
        case ALERT.SET_MESSAGE: {
            return {
                ...state,
                message: action.message
            };
        }

        case ALERT.CLEAR_MESSAGE: {
            return {
                ...state,
                message: ''
            };
        }

        default:
            return state;
    }
};

export default alert;
