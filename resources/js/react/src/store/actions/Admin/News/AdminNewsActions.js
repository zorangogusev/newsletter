const axios = window.axios;

const BASE_API_URL = 'http://newsletter.deb.test:8081/api/';

export const getAllNews = () => {

    return (dispatch) => {
        console.log('getAllNews here')
        let token = localStorage.getItem('admin-token')
        axios.get(BASE_API_URL + 'admin/get-all-news/' + token,)
            .then(response => {
                console.log(response);
                dispatch({type:'GET_ALL_NEWS_SUCCESS', response})
            }).catch(response => {
            console.log('catch error here')

        });
    }
}

export const addNews = (fields) => {

    return (dispatch) => {
        console.log('addNews here')
        let token = localStorage.getItem('admin-token')
        fields.token = token;
        axios.post(BASE_API_URL + 'admin/add-news', fields)
            .then(response => {
                // console.log(response);
                dispatch({type:'ADD_NEW_NEWS_SUCCESS', response})
                window.location.href = '/admin-pages/dashboard';
            }).catch(response => {
            console.log('catch error here')
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
