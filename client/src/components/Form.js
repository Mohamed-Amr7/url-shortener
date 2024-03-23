import React from 'react';
import {connect} from 'react-redux';
import {generateUrl} from "../actions/generateUrl";

const Form = ({generateUrl, isLoading}) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        generateUrl(e.target.url.value);
    }

    return (
        <form onSubmit={handleSubmit} id="url-form">
            <div className="row">
                <div className="col-10 col-md-10 mx-auto">
                    <div className="form-group">
                        <input type="text" className="form-control" disabled={isLoading} name="url"
                               placeholder={'https://sample-url.com'}/>
                    </div>
                </div>
                <div className="col-3 col-md-2 mx-auto">
                    <div className="form-group d-md-block d-none">
                        <button type="submit" disabled={isLoading} className="btn btn-primary">
                            Shorten
                            <i className="fas fa-cut"></i>
                        </button>
                    </div>

                    <div className="form-group d-block d-md-none">
                        <button type="submit" className="btn btn-primary btn-block">
                            Shorten
                            <i className="fas fa-cut"></i>
                        </button>
                    </div>
                </div>
            </div>
        </form>
    )
}


const mapStateToProps = state => ({
    isLoading: state.url.isLoading
})

const mapDispatchToProps = dispatch => ({
    generateUrl: url => dispatch(generateUrl(url))
})

export default connect(mapStateToProps, mapDispatchToProps)(Form);