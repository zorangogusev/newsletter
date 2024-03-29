import React, { useEffect, useState } from 'react';
import NewsContainer from "./NewsContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import {getAllNews, deleteNewsAction, getSearchNews} from '../../../store/actions/Admin/News/AdminNewsActions'
import Pagination from 'rc-pagination';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import TextField from '@material-ui/core/TextField';

const Dashboard = (props) => {

    const [search_content, setSearchContent] = useState('');

    const dispatch = useDispatch();

    const adminNewsResponse = useSelector(state => state.adminNews.adminNewsResponse);
    const adminDeleteNewsMessage = useSelector(state => state.adminNews.adminDeleteNewsMessage);

    useEffect(() => {
        const page = '';
        dispatch(getAllNews(page))

        return () => {
            dispatch({ type: 'RESET_EDIT_NEWS_VARS'});
        }
    }, [])

    const paginateContent = (currentPage) => {
        // console.log('paginateContent here')
        // console.log('currentPage is: ' + currentPage)
        // console.log('pageSize is: ' + pageSize)

        dispatch(getAllNews(currentPage))
    }

    const deleteNews = (e, id) => {
        const confirmDialog = window.confirm('Delete news with id ' + id);
        if (confirmDialog == true) {
            dispatch(deleteNewsAction(id))
        }
    }

    const handleKeyUp = (e) => {
        // console.log('search_content is:')
        // console.log(search_content)
        // console.log('search_content.length is: ')
        // console.log(search_content.length)

        setSearchContent(e.target.value)
        if(search_content == '' || search_content.length == 1) {
            // console.log('search_content is null')
            const page = '';
            dispatch(getAllNews(page))
        } else {
            // console.log('search_content is....')
            let page = '';
            dispatch(getSearchNews(search_content, page))
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

        return  adminNewsResponse.data.data.map((news) => (
            <tr key={news.id}>
                <td>{news.id}</td>
                <td><img src={adminNewsResponse.file_directory + '/' + news.image} width="50" height="50" /></td>
                <td>{news.title}</td>
                <td className="text-right">
                    <Link className="btn btn-success mr-2" to={`/admin-pages/news/edit-news/${news.id}`}>EDIT</Link>
                    <button type="button" className="btn btn-danger" onClick={ (e) => { deleteNews(e, news.id) } }>DELETE</button>
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
                    <TextField
                        id="search_content"
                        label="search"
                        fullWidth
                        margin="normal"
                        onKeyUp={handleKeyUp}
                    />

                    <table className="table table-striped mt-4">
                        <thead>
                        <tr>
                            <th width="25">ID.</th>
                            <th width="25">Image</th>
                            <th width="25">Title</th>
                            <th width="25" className="text-center">Action</th>
                        </tr>
                        </thead>
                        <tbody>
                            { getAllNewsForDashboard() }
                        </tbody>
                    </table>

                    {adminNewsResponse
                        ?
                        <Pagination
                            showTitle={false}
                            defaultPageSize={5}
                            tooltip={''}
                            current={adminNewsResponse.data.current_page}
                            total={adminNewsResponse.data.total}
                            onChange={paginateContent}
                            className="pagination-restyle"
                            prevIcon={<ArrowBackIosIcon />}
                            jumpPrevIcon={<ArrowBackIcon/>}
                            jumpNextIcon={<ArrowForwardIcon/>}
                            nextIcon={<ArrowForwardIosIcon/>}
                        />
                        : null
                    }
                </div>
            </NewsContainer>
        </div>
    );
};

export default Dashboard
