import { AUTHENTICATE_USER, LOG_OUT_USER, SHOW_LOGIN_ERROR } from "../../constants";

// const initStateAuthentication = {
//     emailError: ""
// };
const initStateAuthentication = {
    isAuthenticated: false,
    user: {},
    loginError: ""
};

if (window.localStorage.getItem("access_token")) {
    initStateAuthentication.isAuthenticated = true;
}

export function authentication(state = initStateAuthentication, action = {}) {
    switch (action.type) {
        case AUTHENTICATE_USER:
            localStorage.setItem("access_token", action.payload);
            return { ...state, isAuthenticated: true };

        case LOG_OUT_USER:
            localStorage.removeItem("access_token")
            return { ...state, isAuthenticated: false };

        case SHOW_LOGIN_ERROR:
            return { ...state, loginError: action.payload }

        default:
            return state;
    }
}
