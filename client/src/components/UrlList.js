import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import {connect, useDispatch} from 'react-redux';
import { fetchAllUrls } from '../actions/fetchUrls';

const UrlList = ({ urls }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchAllUrls());
    }, [dispatch]);

    return (
        <div className="container">
            <h2 className="my-4 text-center">Shortened URLs</h2>
            <ul className="list-group">
                {urls.length > 0 ? (
                    urls.map((url, idx) => (
                        <li key={idx} className="list-group-item">
                            <div className="row">
                                <div className="col-12 col-md-8">
                                    <Link to={`/${url.shortId}`} className="text-primary">{url.shortUrl}</Link>
                                    <a href={url.origUrl} target="_blank" rel="noopener noreferrer" className="text-secondary ml-2" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                        ({url.origUrl.length > 50 ? url.origUrl.substring(0, 50) + '...' : url.origUrl})
                                    </a>
                                </div>
                                <div className="col-12 col-md-4 text-md-right">
                                    Clicks: <span className="badge badge-secondary">{url.clicks}</span>
                                </div>
                            </div>
                        </li>
                    ))
                ) : (
                    <p className="text-center">Loading URLs...</p>
                )}
            </ul>
        </div>

    );
};

const mapStateToProps = (state) => ({
    urls: state.url.allUrls || [],
});

export default connect(mapStateToProps)(UrlList);
