import {combineReducers} from "redux"
import {items} from "../Items/ItemsReducer"
import {item} from "../Item/ItemReducer"
import {user} from "../UserProfile/UserProfileReduser"

export const application = combineReducers({items, item, user})


