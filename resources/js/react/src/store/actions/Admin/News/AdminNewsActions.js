import { axios, BASE_API_URL } from "../../../../api";

export const getNewsForHomePage = (page) => {
    return (dispatch) => {
        // console.log('getNewsForHomePage here')
        let pager = 9;
        let getAllNewsUrl;
        if(page == '') {
            getAllNewsUrl = 'home/' + pager;
        } else {
            getAllNewsUrl = 'home/' + pager + '?page=' + page;
        }
        axios.get(BASE_API_URL + getAllNewsUrl)
            .then(response => {
                // console.log('ok')
                // console.log(response);
                dispatch({type:'GET_ALL_NEWS_SUCCESS', response})
            }).catch(response => {
            // console.log('catch error here')
            console.log(response);

        });
    }
}

export const getNewsForViewNewsPage = (id) => {
    return (dispatch) => {
        // console.log('getNewsForViewNewsPage here')
        axios.get(BASE_API_URL + 'view-news/' + id)
            .then(response => {
                // console.log('ok')
                // console.log(response);
                dispatch({type:'GET_NEWS_FOR_VIEW_NEWS_PAGE_SUCCESS', response})
            }).catch(response => {
            // console.log('catch error here')
            console.log(response);
        });
    }
}

export const getAllNews = (page) => {

    return (dispatch) => {
        // console.log('getAllNews here')
        let token = localStorage.getItem('admin-token')
        let pager = 5;
        let getAllNewsUrl;
        if(page == '') {
            getAllNewsUrl = 'admin/get-all-news/' + token + '/' + pager;
        } else {
            getAllNewsUrl = 'admin/get-all-news/' + token + '/' + pager + '?page=' + page;
        }
        // console.log('getAllNewsUrl here')
        // console.log(getAllNewsUrl)
        axios.get(BASE_API_URL + getAllNewsUrl)
            .then(response => {
                // console.log(response);
                dispatch({type:'GET_ALL_NEWS_SUCCESS', response})
            }).catch(response => {
            console.log('catch error here')

        });
    }
}

export const addNews = (fields, props) => {

    return (dispatch) => {
        // console.log('addNews here')
        // console.log(fields)
        // console.log(props)
        let token = localStorage.getItem('admin-token')
        fields.token = token;
        axios.post(BASE_API_URL + 'admin/add-news', fields)
            .then(response => {
                // console.log(response);
                dispatch({type:'ADD_NEW_NEWS_SUCCESS', response})
                // window.location.href = '/admin-pages/dashboard';
                props.history.push('/admin-pages/dashboard')
            }).catch(response => {
            console.log('catch error here')
            // console.log(response)
            dispatch({type:'ADD_NEW_NEWS_ERROR', response})
        });
    }
}

export const loadDataForNews = (id) => {

    return (dispatch) => {
        console.log('action editNews here')
        let token = localStorage.getItem('admin-token')
        return new Promise((resolve, reject) => {
            axios.get(BASE_API_URL + 'admin/get-single-news/' + token + '/' + id)
                .then(response => {
                    // console.log(response);
                    dispatch({type:'GET_NEWS_FOR_EDIT_SUCCESS', response})
                    resolve(response)
                })
                .catch(response => {
                // console.log('catch error here')
                dispatch({type:'GET_NEWS_FOR_EDIT_ERROR', response})
                reject(response)
            });

        })
    }
}

export const editSingleNews = (fields, id) => {

    return (dispatch) => {
        // console.log('editSingleNews here')
        let token = localStorage.getItem('admin-token')
        fields.token = token;
        axios.post(BASE_API_URL + 'admin/edit-news/' + id, fields)
            .then(response => {
                // console.log(response);
                dispatch({type:'EDIT_NEWS_SUCCESS', response})
                // window.location.href = '/admin-pages/dashboard';
            }).catch(response => {
            console.log('catch error here')
            dispatch({type:'EDIT_NEWS_ERROR', response})
        });
    }
}

export const deleteNewsAction = (id) => {

    return (dispatch) => {
        console.log('deleteNews here')
        console.log(id)
        let token = localStorage.getItem('admin-token')
        axios.post(BASE_API_URL + 'admin/delete-news/' + token + '/' + id)
            .then(response => {
                // console.log(response);
                dispatch({type:'DELETE_NEWS_SUCCESS', response})
            }).catch(response => {
            // console.log('catch error here')
            // console.log(response)
            dispatch({type:'DELETE_NEWS_ERROR', response})
        });
    }
}

export const getSearchNews = (search_content, page) => {
    return (dispatch) => {
        console.log('getSearchNews here')
        let token = localStorage.getItem('admin-token')
        let pager = 5;
        let contactsDataUrl;
        if(page == '') {
            contactsDataUrl = 'admin/search-news/'  + search_content + '/' + token + '/' + pager;
        } else {
            contactsDataUrl = 'admin/search-news/' + search_content + '/' + token + '/' + pager + '?page=' + page;
        }

        axios.get(BASE_API_URL + contactsDataUrl)
            .then(response => {
                console.log(response);
                dispatch({type:'SEARCH_NEWS_SUCCESS', response})
            }).catch(response => {
            console.log('catch error here')
            dispatch({type:'SEARCH_NEWS_ERROR', response})
        });
    }
}
