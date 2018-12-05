import { server_uri } from "../../config";
import {authenticate} from "../Authentication/AuthenticationActions"

import { SHOW_LOGIN_ERROR } from "../../constants"

export const showLoginError = (error) => ({
    type: SHOW_LOGIN_ERROR,
    payload: error
})

export const loginUser = (identity, password) => dispatch => {
    const url = server_uri + "/users/login";
    const request = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            email: identity,
            password: password
        })
    };
    fetch(url, request)
        .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
        .then(({ data, isOk }) => {
            if (isOk) {
                dispatch(authenticate({access_token: data["access_token"]}))
            } else {
                dispatch(showLoginError(data["errors"].join()))
            }
        })
        .catch(error => {
            console.log(error);
        });
};
