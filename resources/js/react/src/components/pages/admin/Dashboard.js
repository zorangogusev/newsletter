import React, { useEffect } from 'react';
import NewsContainer from "./NewsContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { getAllNews, deleteNewsAction } from '../../../store/actions/Admin/News/AdminNewsActions'
import Card from "@material-ui/core/Card/Card";

const Dashboard = (props) => {

    const dispatch = useDispatch();

    const adminNewsResponse = useSelector(state => state.adminNews.adminNewsResponse);
    const adminDeleteNewsMessage = useSelector(state => state.adminNews.adminDeleteNewsMessage);

    useEffect(() => {
        dispatch(getAllNews())

        return () => {
            dispatch({ type: 'RESET_EDIT_NEWS_VARS'});
        }
    }, [])


    const deleteNews = (e, id) => {
        // console.log(id)
        const confirmDialog = window.confirm('Delete news with id ' + id);
        if (confirmDialog == true) {
            dispatch(deleteNewsAction(id))
        }
    }

    const getAllNewsForDashboard = () => {
        if(!adminNewsResponse) {
            return (
                <tr>
                    <td colSpan="4">Loading posts...</td>
                </tr>
            )
        }

        return  adminNewsResponse.data.map((news) => (
            <tr key={news.id}>
                <td>{news.id}</td>
                <td>{news.title}</td>
                <td>{news.body}</td>
                <td>
                    <Link className="btn btn-success mr-2" to={`/admin-pages/news/edit-news/${news.id}`}>EDIT</Link>
                    <button type="button" className="btn btn-danger" onClick={ (e) => { deleteNews(e, news.id) } }>DELETE</button>
                    {/*<button type="button" className="btn btn-danger" onClick={ deleteNews(news.id)  }>DELETE</button>*/}
                </td>
            </tr>

        ));
    };

    return (
        <div className="mt-5">
            <NewsContainer title="Dashboard">
                <div className="table table-striped">

                    {
                        adminDeleteNewsMessage && adminDeleteNewsMessage.data.success == true
                            ? <div className="alert alert-success p-2 border-radius-5px">{ adminDeleteNewsMessage.data.message }</div>
                            : ''
                    }

                    {
                        adminDeleteNewsMessage && adminDeleteNewsMessage.data.success == false
                            ? <div className="alert alert-danger p-2 border-radius-5px">{ adminDeleteNewsMessage.data.message }</div>
                            : ''
                    }

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
