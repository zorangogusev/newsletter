import React, { useEffect } from 'react';
import {AdminLogoutAction} from "../../../store/actions/Admin/Auth/AdminAuthActions";
import { useDispatch } from 'react-redux';

const Logout = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AdminLogoutAction(props.history));
    }, [])

    return (
        <div>
            <h4>This is Logout page</h4>
        </div>
    );
};

export default Logout
