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

const initItemState = {
    open: false,
    currentItem: {
        title: "",
        image: "",
        page_url: "",
        css_selector: "",
        attribute_name: ""
    }
};

export function item(state = initItemState, action = {}) {
    switch (action.type) {
        case SAVE_CURRENT_ITEM:
            // return { ...state, currentItem: action.payload };
            return { ...state, currentItem: {...initItemState.currentItem, ...action.payload}};
            // return { ...state, currentItem: {...state.currentItem, ...action.payload}};

        case OPEN_CURRENT_ITEM:
            return { ...state, open: true };
        case CLOSE_CURRENT_ITEM:
            return { ...state, open: false };

        case ON_ITEM_TITLE_CHANGE:
            return { ...state, currentItem: {...state.currentItem, title: action.payload} }
        case ON_ITEM_IMAGE_CHANGE:
            return { ...state, currentItem: {...state.currentItem, image: action.payload} }
        case ON_ITEM_PAGE_URL_CHANGE:
            return { ...state, currentItem: {...state.currentItem, page_url: action.payload} }
        case ON_ITEM_CSS_SELECTOR_CHANGE:
            return { ...state, currentItem: {...state.currentItem, css_selector: action.payload} }
        case ON_ITEM_ATTRIBUTE_NAME_CHANGE:
            return { ...state, currentItem: {...state.currentItem, attribute_name: action.payload} }
        case ON_ITEM_TRACKING_CHANGE:
            const value = action.payload ? "tracking": "stoped"
            console.log(value);
            return  { ...state, currentItem: {...state.currentItem, tracking: {...state.currentItem.tracking, status: value}} }

        default:
            return state;
    }
}
