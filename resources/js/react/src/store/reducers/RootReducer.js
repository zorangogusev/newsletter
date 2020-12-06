import { combineReducers } from 'redux'
import UserAuthReducer from "./User/Auth/UserAuthReducer";

const RootReducer = combineReducers({
    userAuth: UserAuthReducer
});

export default RootReducer;
