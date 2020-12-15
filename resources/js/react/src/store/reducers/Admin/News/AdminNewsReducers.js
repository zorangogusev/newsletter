const initState = {
    adminNewsResponse: '',
    adminAddNews: '',
    adminEditNews: '',
    adminEditNewsMessage: '',
    adminDeleteNewsMessage: '',
    viewNews: '',
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

        case 'GET_NEWS_FOR_VIEW_NEWS_PAGE_SUCCESS':
            console.log('GET_NEWS_FOR_VIEW_NEWS_PAGE_SUCCESS here')
            return {
                ...state,
                viewNews: action.response
            }

        case 'RESET_VIEW_NEWS':
            return {
                ...state,
                viewNews: '',
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
            let { adminNewsResponse } = state;
            let data = adminNewsResponse.data.data.filter(news => news.id != action.response.data.id );
            adminNewsResponse.data.data = [];
            data.map((mappingData) => {
                adminNewsResponse.data.data.push({
                    'id': mappingData.id,
                    'title': mappingData.title,
                    'body': mappingData.body,
                    'image': mappingData.image,
                })
            });

            return {
                ...state,
                adminDeleteNewsMessage: action.response,
                adminNewsResponse: { ...state.adminNewsResponse, adminNewsResponse },
            }

        case 'DELETE_NEWS_ERROR':
            // console.log('DELETE_NEWS_ERROR here')
            // console.log(action)
            return {
                ...state,
                adminDeleteNewsMessage: action.response,
            }
        case 'SEARCH_NEWS_SUCCESS':
            // console.log('SEARCH_NEWS_SUCCESS here')
            // console.log(action)
            return {
                ...state,
                adminNewsResponse: action.response.data,
            }

        case 'SEARCH_NEWS_ERROR':
            // console.log('SEARCH_NEWS_ERROR here')
            // console.log(action)
            return {
                ...state,
                adminNewsResponse: action.response,
            }
        case 'RESET_EDIT_NEWS_VARS':
            // console.log('RESET_EDIT_NEWS_VARS here')
            return {
                ...state,
                adminEditNewsMessage: '',
                adminEditNews: '',
                adminDeleteNewsMessage: '',
            }

        case 'RESET_ADMIN_ADD_NEWS':
            // console.log('RESET_EDIT_NEWS_VARS here')
            return {
                ...state,
                adminAddNews: '',
            }
        default:
            return state
    }
}

export default AdminNewsReducers
