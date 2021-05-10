import React from 'react';
import { Button } from 'antd'

const Connectors = () => {

    const handleClick = async () => {

        var requestOptions = {
            method: 'GET',
        };

        fetch("http://localhost/ttt/hs/test/get", requestOptions)
            .then(response => response.text())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));

    }

    const handleClickPost = async () => {
        let user = {
            name: 'John',
            surname: 'Smith'
        };

        var myHeaders = new Headers();
        myHeaders.append('Content-type', 'application/JSON;  charset=utf-8')

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(user)
        };

        fetch("http://localhost/ttt/hs/test/post", requestOptions)
            .then(response => response.text())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));
    }

    return (
        <div>
            <div>Connectors page</div>
            <Button type="primary" onClick={() => handleClick()}>Connect to 1c get</Button>
            <Button type="primary" onClick={() => handleClickPost()}>Connect to 1c post</Button>
        </div>
    )
};

export default Connectors;