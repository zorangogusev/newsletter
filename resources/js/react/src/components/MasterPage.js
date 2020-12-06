import React from 'react';
import NavBar from "./layouts/NavBar";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About'

const MasterPage = () => {
    return (
        <div>
            <Router>
                <NavBar />
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
            </Router>
        </div>
    );
};

export default MasterPage;
