import { server_uri } from "../../config";
import {
    SAVE_CURRENT_ITEM,
    OPEN_CURRENT_ITEM,
    CLOSE_CURRENT_ITEM,
    ON_ITEM_TITLE_CHANGE,
    ON_ITEM_IMAGE_CHANGE,
    ON_ITEM_PAGE_URL_CHANGE,
    ON_ITEM_CSS_SELECTOR_CHANGE,
    ON_ITEM_ATTRIBUTE_NAME_CHANGE,
    ON_ITEM_TRACKING_CHANGE
} from "../../constants";

import { getAllItems } from "../Items/ItemsActions";

export const saveCurrentItem = item => ({
    type: SAVE_CURRENT_ITEM,
    payload: item
});

export const openCurrentItem = () => ({
    type: OPEN_CURRENT_ITEM
});

export const closeCurrentItem = () => ({
    type: CLOSE_CURRENT_ITEM
});

export const onItemTitleChange = title => ({
    type: ON_ITEM_TITLE_CHANGE,
    payload: title
});

export const onItemImageChange = image => ({
    type: ON_ITEM_IMAGE_CHANGE,
    payload: image
});

export const onItemPageUrlChange = url => ({
    type: ON_ITEM_PAGE_URL_CHANGE,
    payload: url
});

export const onItemCssSelectorChange = selector => ({
    type: ON_ITEM_CSS_SELECTOR_CHANGE,
    payload: selector
});

export const onItemAttributeNameChange = attribute => ({
    type: ON_ITEM_ATTRIBUTE_NAME_CHANGE,
    payload: attribute
});

export const onItemTrackingChange = isTracked => ({
    type: ON_ITEM_TRACKING_CHANGE,
    payload: isTracked
})


// export const onItemTrackingChange = isTracked => ({
//     type: ON_ITEM_TRACKING_CHANGE,
//     payload: isTracked
// })

export const onSaveButtonSubmit = () => (dispatch, getState) => {
    const item = getState().application.item.currentItem;
    const accessToken = localStorage.getItem("access_token");
    const url = server_uri + "/items/" + item._id;
    const request = {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            Authorization: accessToken
        },
        body: JSON.stringify(item)
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

export const onDeleteButtonSubmit = () => (dispatch, getState) => {
    const confirmation = window.confirm("Do you wanna delete this item?");
    if (confirmation) {
        const item_id = getState().application.item.currentItem._id;
        const accessToken = localStorage.getItem("access_token");
        const url = server_uri + "/items/" + item_id;
        const request = {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
                Authorization: accessToken
            }
        };
        fetch(url, request)
            .then(resp => resp.json().then(data => ({ data, isOk: resp.ok })))
            .then(({ data, isOk }) => {
                if (isOk) {
                    dispatch(closeCurrentItem());
                    dispatch(getAllItems());
                    console.log(data);
                } else {
                    console.log("Else", data);
                }
            })
            .catch(error => {
                console.log(error);
            });
    }
};

export const getItemById = itemId => dispatch => {
    // console.log(itemId);
    const accessToken = localStorage.getItem("access_token");
    const url = server_uri + "/items/" + itemId;
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
                console.log(data);
                dispatch(saveCurrentItem(data["item"]));
                dispatch(openCurrentItem());
            } else {
                console.log("Else", data);
            }
        })
        .catch(error => {
            console.log(error);
        });
};
