import {
    SIGNUP_SHOW_EMAIL_ERROR,
    SIGNUP_SHOW_PASSWORD_ERROR
} from "../../constants";

// const initStateAuthentication = {
//     emailError: ""
// };
const initStateAuthentication = {
    isAuthenticated: false,
    user: {},
    messages: {
        email: "",
        password: ""
    }
};

function messages(state = { email: "", password: "" }, action) {
    switch (action.type) {
        case SIGNUP_SHOW_EMAIL_ERROR:
            return { ...state, email: action.payload };
        case SIGNUP_SHOW_PASSWORD_ERROR:
            return { ...state, password: action.payload };
        default:
            return state;
    }
}

export function authentication(state = initStateAuthentication, action = {}) {
    switch (action.type) {
        case SIGNUP_SHOW_EMAIL_ERROR:
            return {
                ...state,
                messages: messages(state.messages, action)
            };

        case SIGNUP_SHOW_PASSWORD_ERROR:
            return {
                ...state,
                messages: messages(state.messages, action)
            };
        default:
            return state;
    }
}
