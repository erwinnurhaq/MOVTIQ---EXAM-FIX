import Axios from 'axios';
import { API_URL } from '../../support/API_URL';

export const fetchMoviesRequest = () => {
    return {
        type: 'FETCH_MOVIES_REQUEST'
    }
}

export const fetchMoviesSuccess = (movies) => {
    return {
        type: 'FETCH_MOVIES_SUCCESS',
        payload: movies
    }
}

export const fetchMoviesError = (error) => {
    return {
        type: 'FETCH_MOVIES_ERROR',
        payload: error
    }
}


export function fetchMovies() {
    return dispatch => {
        dispatch(fetchMoviesRequest());
        Axios.get(`${API_URL}/movies`)
            .then(resp => {
                dispatch(fetchMoviesSuccess(resp.data));
                console.log(resp.data)
            })
            .catch(error => {
                dispatch(fetchMoviesError(error));
            })
    }
}

export function deleteMovie(id) {
    return dispatch => {
        Axios.delete(`${API_URL}/movies/${id}/`)
            .then(() => {
                console.log('remove success')
                dispatch(fetchMovies());
            })
            .catch(error => { console.log(error) });
    }
}

export function addMovie(input) {
    return dispatch => {
        Axios.post(`${API_URL}/movies`, { ...input, booked: [] })
            .then(() => {
                console.log('add success')
                dispatch(fetchMovies())
            })
            .catch(error => console.log(error))
    }
}

export function editMovie(id, input) {
    return dispatch => {
        Axios.put(`${API_URL}/movies/${id}`, { ...input, booked: [] })
            .then(() => {
                console.log('edit success')
                dispatch(fetchMovies())
            })
            .catch(error => console.log(error))
    }
}
