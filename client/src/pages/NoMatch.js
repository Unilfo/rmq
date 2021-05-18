import React from 'react';
import { Link } from 'react-router-dom';
import './nomatch.scss'

const NoMatch = () => {
    return (
        <div className={'no_match_page'}>
            <div className={'no_match_page_404'}>404</div>
            <div className={'no_match_page_text'}>Not Found</div>
            {/*<Link to="/">go Home</Link>*/}
        </div>
    )
};

export default NoMatch;