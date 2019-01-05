import { server_uri } from "../../config";

import {
    ON_PROFILE_USERNAME_CHANGE,
    ON_PROFILE_AVATAR_CHANGE
} from "../../constants";

export const saveUserProfile = () => (dispatch, getState) => {
    console.log("hello from save user profile");

    const user = getState().application.user;
    const accessToken = localStorage.getItem("access_token");
    const url = server_uri + "/users/me";
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken
        },
        body: JSON.stringify({
            username: user.username,
            avatar: user.avatar
        })
    };
    fetch(url, request)
        .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
        .then(({ data, isOk }) => {
            if (isOk) {
                console.log(data);
            } else {
                console.log("Else", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const onUsernameChange = username => ({
    type: ON_PROFILE_USERNAME_CHANGE,
    payload: username
});

export const onAvatarChange = avatar_url => ({
    type: ON_PROFILE_AVATAR_CHANGE,
    payload: avatar_url
});
