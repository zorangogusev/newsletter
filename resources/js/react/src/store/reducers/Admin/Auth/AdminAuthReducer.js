const  initState = {
    isLoggedIn: false,
    adminAuthResponse: ''
}

const AdminAuthReducer = (state = initState, action) =>
{
    switch(action.type)
    {
        case 'REGISTER_SUCCESS':
            console.log('REGISTER_SUCCESS here')
            return {
                ...state,
                adminAuthResponse: 'Registered successfully.'
            }

        case 'LOGIN_SUCCESS':
            console.log('LOGIN_SUCCESS here')
            return {
                ...state,
                isLoggedIn: true
            }

        default:
            return state
    }
}

export default AdminAuthReducer;
