import { server_uri } from "../../config";
import {AUTHENTICATE_USER,
LOG_OUT_USER} from "../../constants"

export const authenticate = (access_token) => ({
    type: AUTHENTICATE_USER,
    payload: access_token
})

export const logOut = () => ({
    type: LOG_OUT_USER
})

export const loginWithGoogleToken = (google_token) => (dispatch) => {
    console.log("Sending token: ", google_token)
    
    const url = server_uri + "/users/login/google";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({access_token: google_token["access_token"]})
    };

    fetch(url, request)
        .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
        .then(({ data, isOk }) => {
            if (isOk) {
                dispatch(authenticate(data))
            } else {
                console.log("Else", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
}
