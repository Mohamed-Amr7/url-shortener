import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <div id="Page-container">
        <div className="row justify-content-center" style={{paddingBottom: "1%"}}>
            <div className="col-md-6">
                <h1 className="text-center" id="error_code">404</h1>
                <h4 className="text-center" id="error_description">URL Not found.</h4>
            </div>
        </div>
        <div className="row justify-content-center">
            <div className="col-2">
                <Link to="/">
                    <button className="btn btn-warning btn-block" >
                        Take me back
                    </button>
                </Link>
            </div>
        </div>
    </div>
);