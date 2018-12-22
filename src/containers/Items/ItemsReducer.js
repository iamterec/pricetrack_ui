import {SAVE_ITEMS} from "../../constants"
const initItemsState = {
    listOfItems: []

}
export function items(state = initItemsState, action={}) {
    switch(action.type) {
        case SAVE_ITEMS:
            return { ...state, listOfItems: action.payload }
        default:
            return state
    }

}
