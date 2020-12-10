const initState = {
    adminNewsResponse: ''
}

const AdminNewsReducers = (state = initState, action) =>
{
    switch(action.type)
    {
        case 'GET_ALL_NEWS_SUCCESS':
            console.log('GET_ALL_NEWS_SUCCESS here')
            return {
                ...state,
                adminNewsResponse: action.response.data
            }

        default:
            return state
    }
}

export default AdminNewsReducers
