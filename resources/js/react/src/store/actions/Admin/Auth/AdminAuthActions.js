

export const AdminRegisterAction = (inputFields, props) =>
{
    console.log('AdminRegisterAction here');
    console.log(inputFields);

    return (dispatch) => {
        dispatch({type: 'REGISTER_SUCCESS'})
    }
}


export const AdminLoginAction = (inputFields, props) =>
{
    console.log('AdminLoginAction here');
    console.log(inputFields);


    return (dispatch) => {
        dispatch({type: 'LOGIN_SUCCESS'})
    }
}
