const  initState = {
    isLoggedIn: localStorage.getItem('admin-token') ? true : false,
    adminAuthResponse: ''
}

const AdminAuthReducer = (state = initState, action) =>
{
    switch(action.type)
    {
        case 'REGISTER_SUCCESS':
            // console.log('reducer REGISTER_SUCCESS here')
            // console.log(action.response)
            return {
                ...state,
                adminAuthResponse: 'Registered successfully.',
                isLoggedIn: true
            }

        case 'REGISTER_ERROR':
            // console.log('reducer REGISTER_ERROR here');
            // console.log(action.response)
            return {
                ...state,
                adminAuthResponse: action.response
            }

        case 'LOGIN_SUCCESS':
            // console.log('LOGIN_SUCCESS here')
            // console.log(action.response)
            return {
                ...state,
                isLoggedIn: true
            }

        case 'LOGIN_ERROR':
            // console.log('LOGIN_ERROR here')
            // console.log(action.response)
            return {
                ...state,
                adminAuthResponse: action.response
            }
        case 'RESET_AUTH_RESPONSE':
            // console.log('RESET_AUTH_RESPONSE here')
            return {
                ...state,
                adminAuthResponse: ''
            }

        case 'LOADING':
            // console.log('LOADING here')
            return {
                ...state,
                adminAuthResponse: 'Loading...'
            }
        default:
            return state
    }
}

export default AdminAuthReducer;
