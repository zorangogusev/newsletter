const initState = {
    adminNewsResponse: '',
    adminAddNews: ''
}

const AdminNewsReducers = (state = initState, action) =>
{
    switch(action.type)
    {
        case 'GET_ALL_NEWS_SUCCESS':
            // console.log('GET_ALL_NEWS_SUCCESS here')
            return {
                ...state,
                adminNewsResponse: action.response.data
            }

        case 'ADD_NEW_NEWS_SUCCESS':
            // console.log('ADD_NEW_NEWS_SUCCESS here')
            // console.log(action.response);
            return {
                ...state,
                adminAddNews: action.response
            }
        default:
            return state
    }
}

export default AdminNewsReducers
