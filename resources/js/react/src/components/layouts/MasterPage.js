import React from 'react';
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Routes from "../../Routes";

const MasterPage = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <div className="container">
                    <Routes/>
                </div>
            </Router>
        </div>
    );
};

export default MasterPage;
