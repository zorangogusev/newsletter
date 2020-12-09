const axios = window.axios;

const BASE_API_URL = 'http://newsletter.deb.test:8081/api/';


export const AdminRegisterAction = (inputFields, props) =>
{
    console.log('AdminRegisterAction here');
    console.log(inputFields);



    return (dispatch) => {
        dispatch({type: 'RESET_AUTH_RESPONSE'})
        dispatch({type: 'LOADING'})

        axios.post(BASE_API_URL + 'admin/register', inputFields)
            .then(response => {
                if (response.data.hasOwnProperty('success') && response.data.success == true) {
                    localStorage.setItem('admin-token', response.data.token)
                    dispatch({type: 'REGISTER_SUCCESS', response })
                } else if(response.data.hasOwnProperty('success') && response.data.success == false) {
                    dispatch({type: 'REGISTER_ERROR', response})
                }
            }).catch(response => {
                console.log('catch error here')
                dispatch({type: 'REGISTER_ERROR', response})

            });
    }
}


export const AdminLoginAction = (inputFields, props) =>
{
    return (dispatch) => {
        dispatch({type: 'RESET_AUTH_RESPONSE'})
        dispatch({type: 'LOADING'})

        axios.post(BASE_API_URL + 'admin/login', inputFields)
            .then(response => {
                if (response.data.hasOwnProperty('success') && response.data.success == true) {
                    localStorage.setItem('admin-token', response.data.token)
                    dispatch({type: 'LOGIN_SUCCESS', response })
                } else if(response.data.hasOwnProperty('success') && response.data.success == false) {
                    dispatch({type: 'LOGIN_ERROR', response})
                }
            }).catch(response => {
            console.log('catch error here')
            dispatch({type: 'LOGIN_ERROR', response})

        });

    }
}

export const resetAdminAuthResponseAction = () => {
    return (dispatch) => {
        // console.log('resetAdminAuthResponseAction here')
        dispatch({type:'RESET_AUTH_RESPONSE'})
    }
}
