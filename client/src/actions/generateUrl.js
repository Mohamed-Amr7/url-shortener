import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_API_URL
export const GENERATE_URL = "GENERATE_URL",
    SET_LOADING = "SET_LOADING",
    SET_ERROR = "SET_ERROR"


export const generateUrl = (url) => {
    return dispatch => {
        if(!url) return dispatch({type: SET_ERROR});
        dispatch(setLoading(true))
        axios.post(`//${baseApiUrl}/short`, {origUrl: url})
            .then(res => {
                dispatch({
                    type: GENERATE_URL,
                    payload: res.data
                })

            })
            .catch(() => {
                dispatch({
                    type: SET_ERROR,
                })
            })
    }
}

export const setLoading = (isLoading) => ({
    type: SET_LOADING,
    payload: isLoading,
});