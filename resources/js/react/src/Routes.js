import React, { useState } from 'react';
import { Route, Redirect } from "react-router";
import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/admin/Dashboard";
import Logout from "./components/admin/Logout";
import Login from './components/auth/Login';
import { useDispatch, useSelector } from 'react-redux';

const Routes = (props) => {

    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    const dispatch = useDispatch();

    const isLoggedIn = useSelector(state => state.userAuth.isLoggedIn);

    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/about" component={About} />
            <Route path="/login" render={props => (
                isLoggedIn ? <Redirect to={{ pathname: 'admin-pages/dashboard', state: { from: props.location } }} /> : <Login {...props} />
            )} />

        {/* ======= Admin Routes ======== */}
            <Route path="/admin-pages/dashboard" render={props => (
                isLoggedIn ? <Dashboard {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
            <Route path="/admin-pages/logout" render={props => (
                isLoggedIn ? <Logout {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        </div>
    );
};

export default Routes
