import { server_uri } from "../../config";
import {SAVE_ITEMS} from "../../constants"

export const saveItems = (items) => ({
    type: SAVE_ITEMS,
    payload: items
})

export const showItem = (item_id) => (dispatch) => {
    console.log(item_id)
}

export const getAllItems = () => dispatch => {
    const accessToken = localStorage.getItem("access_token");
    const url = server_uri + "/items";
    const request = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken
        }
    };
    fetch(url, request)
        .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
        .then(({ data, isOk }) => {
            if (isOk) {
                dispatch(saveItems(data))
                console.log(data);
            } else {
                console.log("Else", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
};

export const addItemRequest = () => dispatch => {
    const accessToken = localStorage.getItem("access_token");
    const url = server_uri + "/items";
    const request = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken
        },
        body: JSON.stringify({
            email: "hello",
            password: "world"
        })
    };
    fetch(url, request)
        .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
        .then(({ data, isOk }) => {
            if (isOk) {
                // console.log(data);
                dispatch(getAllItems())
            } else {
                console.log("Else", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
};
