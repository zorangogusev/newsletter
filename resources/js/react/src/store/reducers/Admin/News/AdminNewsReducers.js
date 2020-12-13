const initState = {
    adminNewsResponse: '',
    adminAddNews: '',
    adminEditNews: '',
    adminEditNewsMessage: '',
    adminDeleteNewsMessage: '',
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
            // console.log('GET_NEWS_FOR_EDIT_SUCCESS here')
            // console.log(action.response);
            return {
                ...state,
                adminEditNews: action.response
            }

        case 'GET_NEWS_FOR_EDIT_ERROR':
            // console.log('GET_NEWS_FOR_EDIT_ERROR here')
            // console.log(action.response)
            return {
                ...state,
                adminEditNews: action.response
            }

        case 'EDIT_NEWS_SUCCESS':
            // console.log('EDIT_NEWS_SUCCESS here')
            // console.log(action)
            return {
                ...state,
                adminEditNewsMessage: action.response,
            }

        case 'EDIT_NEWS_ERROR':
            return {
                ...state,
                adminEditNews: '',
            }

        case 'DELETE_NEWS_SUCCESS':
            // console.log('DELETE_NEWS_SUCCESS here')
            // console.log(action)
            return {
                ...state,
                adminDeleteNewsMessage: action.response,
            }

        case 'DELETE_NEWS_ERROR':
            // console.log('DELETE_NEWS_ERROR here')
            // console.log(action)
            return {
                ...state,
                adminDeleteNewsMessage: action.response,
            }

        case 'RESET_EDIT_NEWS_VARS':
            // console.log('RESET_EDIT_NEWS_VARS here')
            return {
                ...state,
                adminEditNewsMessage: '',
                adminEditNews: '',
                adminDeleteNewsMessage: '',
            }
        default:
            return state
    }
}

export default AdminNewsReducers
