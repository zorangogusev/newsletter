import React, { useState } from 'react';
import { Route, Redirect } from "react-router";
import { useDispatch, useSelector } from 'react-redux';

import Home from "./components/pages/Home";
import About from "./components/pages/About";
import Dashboard from "./components/pages/admin/Dashboard";
import Logout from "./components/pages/admin/Logout";
import Login from './components/pages/admin/auth/Login';
import Register from "./components/pages/admin/auth/Register";
import AddNews from "./components/pages/admin/news/AddNews";
import EditNews from "./components/pages/admin/news/EditNews";
import ViewNews from "./components/pages/admin/news/ViewNews";

const Routes = (props) => {
    const isLoggedIn = useSelector(state => state.adminAuth.isLoggedIn);

    return (
        <div>
            <Route exact path="/" component={Home} />
            <Route exact path="/view-news/:id" props={props} component={ViewNews} />
            <Route exact path="/about" component={About} />
            <Route path="/login" render={props => (
                isLoggedIn ? <Redirect to={{ pathname: 'admin-pages/dashboard', state: { from: props.location } }} /> : <Login {...props} />
            )} />
            <Route path="/register" render={props => (
                isLoggedIn ? <Redirect to={{ pathname: 'admin-pages/dashboard', state: { from: props.location } }} /> : <Register {...props} />
            )} />

        {/* ======= Admin Routes ======== */}
            <Route path="/admin-pages/dashboard" render={props => (
                isLoggedIn ? <Dashboard {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
            <Route path="/admin-pages/logout" render={props => (
                isLoggedIn ? <Logout {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
            <Route path="/admin-pages/news/add-news" render={props => (
                isLoggedIn ? <AddNews {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
            <Route path="/admin-pages/news/edit-news/:id" render={props => (
                isLoggedIn ? <EditNews {...props} /> : <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )} />
        </div>
    );
};

export default Routes
