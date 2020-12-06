import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AdminNavBarLinks from "./AdminNavBarLinks";
import { useDispatch, useSelector } from 'react-redux';

const NavBar = (props) => {

    // const [isLoggedIn, setIsLoggedIn] = useState(true);

    const dispatch = useDispatch();

    console.log(props);

    const isLoggedIn = useSelector(state => state.userAuth.isLoggedIn);

    console.log('isLoggedIn here')
    console.log(isLoggedIn)

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link className="navbar-brand" to="/">News</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ml-auto">
                        <Link className="nav-item" to="/">
                            <span className="nav-link">Home</span>
                        </Link>

                        <Link className="nav-item" to="/about">
                            <span className="nav-link">About</span>
                        </Link>
                        { isLoggedIn ? <AdminNavBarLinks /> : <Link className="nav-item" to="/login"><span className="nav-link">Login</span></Link> }
                    </ul>
                </div>
            </nav>

        </div>
    );
};

export default NavBar;
