import { combineReducers } from 'redux'
import UserAuthReducer from "./Admin/Auth/UserAuthReducer";

const RootReducer = combineReducers({
    userAuth: UserAuthReducer
});

export default RootReducer;
