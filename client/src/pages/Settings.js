import React, { useEffect, useState } from 'react';
import { Form, Button } from 'antd';
import { io } from "socket.io-client";


const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};

var socket = io("http://localhost:8000");

const Settings = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    socket.on("getMsg", (data) => {
      setList((l) => [...l, data]);
      console.log('getMsg---', data);
    });
    console.log('start listen io');
    socket.emit("get");
  }, []);

  useEffect(() => {
    console.log('list', list);
  }, [list])

  const onFinish = (values) => {

  };

  const sendMsg = () => {
    let d = JSON.stringify(Date.now());
    console.log('sendMsg', d);
    socket.emit("testMsg", { msg: d });
  };

  return (
    <Form>
      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="button" onClick={() => sendMsg()}>
          Отправить тестовое сообщение
        </Button>
      </Form.Item>
      { list && list.map((el) => <div key={el}>{el}</div>)}
    </Form>
  );
};


export default Settings;