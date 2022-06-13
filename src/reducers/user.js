import { USER } from '../constants/action-types';

const initialState = {
    address: '',
    name: '',
    description: '',
    listOwnerImages: {},
    listAuthorImages: {}
};

export const user = (state = initialState, action) => {
    switch (action.type) {
        case USER.SET_ADDRESS: {
            return {
                ...state,
                address: action.address
            };
        }

        case USER.SET_NAME: {
            return {
                ...state,
                name: action.name
            };
        }

        case USER.SET_DESCRIPTION: {
            return {
                ...state,
                description: action.description
            };
        }

        case USER.SET_AUTHOR_IMAGES: {
            return {
                ...state,
                listAuthorImages: action.data
            };
        }

        case USER.SET_OWNER_IMAGES: {
            return {
                ...state,
                listOwnerImages: action.data
            };
        }

        default:
            return state;
    }
};

export default user;
