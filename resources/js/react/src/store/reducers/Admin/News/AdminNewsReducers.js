const initState = {
    adminNewsResponse: '',
    adminAddNews: '',
    adminEditNews: '',
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
        case 'GET_NEWS_FOR_EDIT_SUCCESS':
            console.log('GET_NEWS_FOR_EDIT_SUCCESS here')
            console.log(action.response);
            return {
                ...state,
                adminEditNews: action.response
            }

        case 'GET_NEWS_FOR_EDIT_ERROR':
            // console.log('GET_NEWS_FOR_EDIT_ERROR here')
            return {
                ...state,
                adminEditNews: action.response
            }

        case 'EDIT_NEWS_SUCCESS':
            // console.log('EDIT_NEWS_SUCCESS here')
            console.log(action)
            return {
                ...state,
                // adminEditNews: '',
            }

        case 'EDIT_NEWS_ERROR':
            return {
                ...state,
                adminEditNews: '',
            }

        default:
            return state
    }
}

export default AdminNewsReducers
