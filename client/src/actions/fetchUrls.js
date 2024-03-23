import axios from 'axios';

const baseApiUrl = process.env.REACT_APP_API_URL;

export const FETCH_ALL_URLS = 'FETCH_ALL_URLS';
export const SET_FETCHING_ALL_URLS = 'SET_FETCHING_ALL_URLS';

export const fetchAllUrls = () => {
    return async (dispatch) => {
        dispatch(setFetchingAllUrls(true));
        try {
            const response = await axios.get(`//${baseApiUrl}/all`);
            dispatch({
                type: FETCH_ALL_URLS,
                payload: response.data.data,
            });
        } catch (error) {
            console.error('Error fetching all URLs:', error);
        } finally {
            dispatch(setFetchingAllUrls(false));
        }
    };
};

export const setFetchingAllUrls = (isFetching) => ({
    type: SET_FETCHING_ALL_URLS,
    payload: isFetching,
});
