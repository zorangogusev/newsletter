import React from 'react';
import { Link } from 'react-router-dom';

const AdminNavBarLinks = () => {
    return (
        <div>
            <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Admin
                </a>
                <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="nav-item" to="/admin-pages/dashboard">
                        <span className="nav-link">Dashboard</span>
                    </Link>
                    <Link className="nav-item" to="/admin-pages/logout">
                        <span className="nav-link">Logout</span>
                    </Link>
                </div>
            </li>
        </div>
    );
};

export default AdminNavBarLinks
