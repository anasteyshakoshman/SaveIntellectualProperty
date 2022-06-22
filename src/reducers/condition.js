import { CONDITION, IMAGE, USER } from '../constants/action-types';
import { IS_MAIN_IMAGE_LOADING, IS_PROFILE_IMAGES_LOADING, IS_PROFILE_BUTTON_LOADING } from '../constants';

const initialState = {
    [IS_MAIN_IMAGE_LOADING]: false,
    [IS_PROFILE_BUTTON_LOADING]: false,
    [IS_PROFILE_IMAGES_LOADING]: false
};

export const condition = (state = initialState, action) => {
    switch (action.type) {
        case CONDITION.SET_PARAM: {
            return {
                ...state,
                ...action.result
            };
        }

        case IMAGE.SET_IS_DUPLICATE: {
            return {
                ...state,
                isMainImageLoading: false
            }
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
