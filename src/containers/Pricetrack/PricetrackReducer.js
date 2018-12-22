import {combineReducers} from "redux"
import {items} from "../Items/ItemsReducer"
import {item} from "../Item/ItemReducer"

export const application = combineReducers({items, item})


