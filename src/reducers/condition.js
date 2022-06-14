import { CONDITION } from '../constants/action-types';

const initialState = {
    buttonLoading: false,
    wasRequestListImages: false
};

export const condition = (state = initialState, action) => {
    switch (action.type) {
        case CONDITION.LOADING_TURN_ON: {
            return {
                ...state,
                buttonLoading: true
            };
        }

        case CONDITION.LOADING_TURN_OFF: {
            return {
                ...state,
                buttonLoading: false
            };
        }

        case CONDITION.WAS_REQUEST_IMAGE_LIST: {
            return {
                ...state,
                wasRequestListImages: action.result
            };
        }


        default:
            return state;
    }
};

export default condition;
