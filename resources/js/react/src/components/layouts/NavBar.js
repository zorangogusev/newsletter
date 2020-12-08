import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavBarLinks from "./AdminNavBarLinks";
import { useDispatch, useSelector } from 'react-redux';
import DehazeIcon from '@material-ui/icons/Dehaze';

const NavBar = (props) => {

    const isLoggedIn = useSelector(state => state.userAuth.isLoggedIn);

    return (
        <div className="main-page-navbar">
            <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#3f51b5', zIndex: '10000'}}>
                <div className="container">
                    <Link className="navbar-brand" to="/">News</Link>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                        {/*<DehazeIcon  style={{ borderColor: '#FFF'}} />*/}
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav ml-auto">
                            <Link className="nav-item" to="/"><span className="nav-link">Home</span></Link>
                            <Link className="nav-item" to="/about"><span className="nav-link">About</span></Link>

                            { isLoggedIn ? <AdminNavBarLinks /> : '' }
                            { isLoggedIn ? '' : <Link className="nav-item" to="/login"><span className="nav-link">Login</span></Link> }
                            { isLoggedIn ? '' : <Link className="nav-item" to="/register"><span className="nav-link">Register</span></Link> }
                        </ul>
                    </div>
                </div>
            </nav>

        </div>
    );
};

export default NavBar;
