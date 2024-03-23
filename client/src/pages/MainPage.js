import React from 'react';
import Form from '../components/Form'
import UrlView from "../components/UrlView";

export default () => (
    <div className="row justify-content-center mt-5" id="Page-container">
        <div className="col-12 col-md-8 col-lg-8">
            <div className="row justify-content-center">
                <div className="col-12 col-md-9">
                    <Form/>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 col-md-10">
                    <UrlView/>
                </div>
            </div>
        </div>
    </div>
)