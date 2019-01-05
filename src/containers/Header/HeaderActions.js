import {SAVE_USER} from "../../constants"

export const saveUser = (user) => ({
    type: SAVE_USER,
    payload: user
})
