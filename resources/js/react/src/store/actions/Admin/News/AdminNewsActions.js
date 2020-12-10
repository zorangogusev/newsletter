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
