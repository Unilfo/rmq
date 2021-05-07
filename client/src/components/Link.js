import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

const LinkCustom = ({ data, className }) => {

    const [links, setLinks] = useState(data);

    useEffect(() => {
        setLinks(data);
    }, [data]);

    const handleClick = (item) => {
        const state = links.map(el => el === item ? { ...el, active: true } : { ...el, active: false });
        setLinks(state);
    };

    if (links) {
        return links.map(el => {
            const style = el.active ? `${className} active` : className;
            return <Link to={el.path} key={el.path} className={style} onClick={() => handleClick(el)}>{el.title}</Link>
        })
    } else {
        return (<div>null</div>)
    }
};

export default LinkCustom;