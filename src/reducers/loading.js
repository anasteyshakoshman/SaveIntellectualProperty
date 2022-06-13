import { LOADING } from '../constants/action-types';

const initialState = {
    isLoading: false
};

export const loading = (state = initialState, action) => {
    switch (action.type) {
        case LOADING.TURN_ON: {
            return {
                ...state,
                isLoading: true
            };
        }

        case LOADING.TURN_OFF: {
            return {
                ...state,
                isLoading: false
            };
        }


        default:
            return state;
    }
};

export default loading;
