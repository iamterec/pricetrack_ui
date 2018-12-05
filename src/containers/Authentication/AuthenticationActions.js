import {AUTHENTICATE_USER,
LOG_OUT_USER} from "../../constants"

export const authenticate = (access_token) => ({
    type: AUTHENTICATE_USER,
    payload: access_token
})

export const logOut = () => ({
    type: LOG_OUT_USER
})
