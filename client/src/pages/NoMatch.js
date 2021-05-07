import React from 'react';
import { Link } from 'react-router-dom';

const NoMatch = () => {
    return (
        <div>
            <div>NoMatch page 404</div>
            <Link to="/">go Home</Link>
        </div>
    )
};

export default NoMatch;