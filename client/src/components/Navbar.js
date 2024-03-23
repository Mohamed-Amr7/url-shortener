import React from 'react';
import {Link} from 'react-router-dom';

export default () => (
    <nav style={{ minWidth: '100%' }} className="navbar navbar-expand navbar-light bg-light">
        <div className="container-fluid" >
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link className="nav-link" to="/">Home</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/all">All</Link>
                </li>
            </ul>
        </div>
    </nav>
);
