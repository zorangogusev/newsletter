import { combineReducers } from 'redux'
import AdminAuthReducer from "./Admin/Auth/AdminAuthReducer";

const RootReducer = combineReducers({
    adminAuth: AdminAuthReducer
});

export default RootReducer;
