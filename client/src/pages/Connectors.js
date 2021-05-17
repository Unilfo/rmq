import React from 'react';
import { Button, Row, Col } from 'antd'

const Connectors = () => {

    const handleClick = async () => {

        const token = Buffer.from(`rmq:rmq`, "utf8").toString(
            "base64"
        );

        var myHeaders = new Headers();
        myHeaders.append("Authorization", `Basic ${token}`);
        
        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow'
        };
        
        fetch("http://192.168.52.133/serv/hs/oneserv/getnom", requestOptions)
          .then(response => response.text())
          .then(result => console.log('result',result))
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

        fetch("http://192.168.3.135/Tech/hs/api/msg", requestOptions)
            .then(response => response.text())
            .then(result => console.log('result', result))
            .catch(error => console.log('error', error));
    }

    const style = { background: '#0092ff', padding: '8px 0' }

    return (
        <div>
        <Row gutter={16}>
            <Col className="gutter-row" span={6}>
                <div>Connectors page</div>
            </Col>
        </Row>
        <Row gutter={16}>
            <Col>
                <Button type="primary" onClick={() => handleClick()}>Connect to 1c get</Button>
            </Col>
            <Col>
                <Button type="primary" onClick={() => handleClickPost()}>Connect to 1c post</Button>
            </Col>
        </Row>
        </div>
    )
};

export default Connectors;