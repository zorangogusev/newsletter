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
