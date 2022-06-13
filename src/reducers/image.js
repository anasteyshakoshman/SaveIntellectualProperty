import { IMAGE } from '../constants/action-types';

const initialState = {
    hash: '',
    isDuplicate: false
};

export const image = (state = initialState, action) => {
    switch (action.type) {
        case IMAGE.SET_HASH: {
            return {
                ...state,
                hash: action.hash
            };
        }

        case IMAGE.SET_IS_DUPLICATE: {
            return {
                ...state,
                isDuplicate: true
            };
        }

        case IMAGE.CLEAR_DATA: {
            return {
                ...state,
                hash: '',
                isDuplicate: false
            };
        }

        default:
            return state;
    }
};

export default image;
