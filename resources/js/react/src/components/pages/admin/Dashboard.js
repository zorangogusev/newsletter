import React, { useEffect } from 'react';
import NewsContainer from "./NewsContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews } from '../../../store/actions/Admin/News/AdminNewsActions'

const Dashboard = (props) => {

    const dispatch = useDispatch();

    const adminNewsResponse = useSelector(state => state.adminNews.adminNewsResponse.data);

    useEffect(() => {
        dispatch(getAllNews())
    }, [])

    const getAllNewsForDashboard = () => {
        if(!adminNewsResponse) {
            return (
                <tr>
                    <td colSpan="4">Loading posts...</td>
                </tr>
            )
        }

        return  adminNewsResponse.map((news) => (
            <tr key={news.id}>
                <td>{news.id}</td>
                <td>{news.title}</td>
                <td>{news.body}</td>
                <td>
                    <Link className="btn btn-success mr-2" to={`/admin-pages/news/edit-news/${news.id}`}>EDIT</Link>
                    <button type="button" className="btn btn-danger">DELETE</button>
                </td>
            </tr>

        ));
    };

    return (
        <div className="mt-5">
            <NewsContainer title="Dashboard">
                <div className="table table-striped">
                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th>ID.</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { getAllNewsForDashboard() }
                        </tbody>
                    </table>
                </div>
            </NewsContainer>
        </div>
    );
};

export default Dashboard
