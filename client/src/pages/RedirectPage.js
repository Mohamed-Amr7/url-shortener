import React from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios";

const baseApiUrl = process.env.REACT_APP_API_URL

const RedirectPage = () => {
    const {shortId} = useParams();
    axios.get(`//${baseApiUrl}/${shortId}`)
        .then((response) => {
            window.location.replace(response.data.url)
        }).catch(() => window.location.replace(`/404`));

    return <div>Redirecting...</div>;
};
export default RedirectPage;
