import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const githubUrl = process.env.REACT_APP_GITHUB_URL

const Github = () => (
    <footer className="footer mt-auto py-3 bg-dark fixed-bottom" >
        <div className="container text-center">
            <span className="text-muted">
                <a  href={githubUrl} target="_blank" rel="noopener noreferrer" >
                    <FontAwesomeIcon icon={faGithub} color={"white"} size={"2x"}/>
                </a>
            </span>
        </div>
    </footer>
)

export default Github;
