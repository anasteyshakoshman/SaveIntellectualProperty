import { CONDITION, USER } from '../constants/action-types';

const initialState = {
    isMainImageLoading: false,
    isProfileisMainImageLoading: false,
    isProfileImagesLoading: false
};

export const condition = (state = initialState, action) => {
    switch (action.type) {
        case CONDITION.SET_PARAM: {
            return {
                ...state,
                ...action.result
            };
        }

        case USER.SET_AUTHOR_IMAGES: {
            return {
                ...state,
                isProfileImagesLoading: false
            }
        }

        default:
            return state;
    }
};

export default condition;
