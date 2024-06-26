import React from 'react';
import {connect} from 'react-redux';
import {CopyToClipboard} from 'react-copy-to-clipboard';

const UrlView = ({isLoading, url, generationError}) => (
    <div>
        {isLoading
            ? <div className="text-center text-warning ">
                <div className="spinner-border" role="status">
                    <span className="sr-only">Loading...</span>
                </div>
            </div>
            : generationError ?
                <p className="h2 text-center text-danger">Invalid Url</p>
                : url && <div>
                <p className="lead text-center">
                    <a href={url.data.shortId} target="_blank" id="url">
                        {url.data.shortUrl}
                    </a>
                    <CopyToClipboard text={url.data.shortUrl} style={{display: "inline-block"}}>
                        <button className="btn btn-link" onClick={() => alert("Copied to clipboard!")}>
                            <i className="copy-clipboard far fa-clipboard" id="clipboard"></i>
                        </button>
                    </CopyToClipboard>
                </p>
            </div>
        }
    </div>
)

const mapStateToProps = state => ({
    isLoading: state.url.isLoading,
    url: state.url.lastUrl,
    generationError: state.url.error,
})

export default connect(mapStateToProps)(UrlView);