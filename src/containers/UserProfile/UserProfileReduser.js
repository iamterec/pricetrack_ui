import {
    SAVE_USER,
    ON_PROFILE_USERNAME_CHANGE,
    ON_PROFILE_AVATAR_CHANGE
} from "../../constants";

const initUserState = {
    _id: "",
    email: "",
    username: "",
    avatar: ""
};

export function user(state = initUserState, action = {}) {
    switch (action.type) {
        case SAVE_USER:
            return { ...state, ...action.payload };

        case ON_PROFILE_USERNAME_CHANGE:
            return { ...state, username: action.payload };

        case ON_PROFILE_AVATAR_CHANGE:
            return { ...state, avatar: action.payload };

        default:
            return state;
    }
}
