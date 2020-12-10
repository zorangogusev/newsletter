import { combineReducers } from 'redux'
import AdminAuthReducer from "./Admin/Auth/AdminAuthReducer";
import AdminNewsReducers from "./Admin/News/AdminNewsReducers";

const RootReducer = combineReducers({
    adminAuth: AdminAuthReducer,
    adminNews: AdminNewsReducers
});

export default RootReducer;
