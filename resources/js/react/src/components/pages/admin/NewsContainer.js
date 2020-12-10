import React from 'react';
import {Link} from "react-router-dom";

const NewsContainer = ({ title, children }) => {
    return (
        <div className="container">
            <div className="card">
                <div className="card-header">
                    <div className="row">
                        <div className="col-6">
                            { title }
                        </div>
                        <div className="col-6 text-right">
                            <Link to="/admin-pages/news/add-news" className="btn btn-primary">ADD NEW NEWS</Link>
                        </div>
                    </div>
                </div>
                <div className="card-body">
                    { children }
                </div>
            </div>
        </div>
    );
};

export default NewsContainer;
