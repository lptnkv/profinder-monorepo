import { authReducer } from "./slices/authSlice"
import jobsReducer from "./slices/jobsSlice"
import userReducer from "./slices/userSlice"

import {combineReducers} from "redux"

const rootReducer = combineReducers({
    jobs: jobsReducer,
    users: userReducer,
    auth: authReducer,
})

export default rootReducer