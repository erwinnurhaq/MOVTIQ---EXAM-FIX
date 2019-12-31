const initialState = {
    loading: false,
    movies: [],
    error: ''
}

const MovieReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'FETCH_MOVIES_REQUEST':
            return {
                ...state,
                loading: true
            }
        case 'FETCH_MOVIES_SUCCESS':
            console.log('fetch movies success')
            return {
                ...state,
                loading: false,
                movies: action.payload
            }
        case 'FETCH_MOVIES_ERROR':
            console.log(action.payload)
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default MovieReducer;