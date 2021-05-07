import React, { useEffect, useState, useMemo } from 'react';
import { Form, Input, Button } from 'antd';
import { io } from "socket.io-client";
import { Typography } from 'antd';


const socket = io("http://localhost:8000");

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 8,
  },
};
const tailLayout = {
  wrapperCol: {
    offset: 8,
    span: 8,
  },
};



const Settings = () => {
  const [testConnection, setTestConnection] = useState("danger");
  const [show, setShow] = useState(false);
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('inituser')));
  const [list, setList] = useState([]);
  const [msg, setMsg] = useState({ msg: 'test' });
  const { Text } = Typography;

  useEffect(() => {
    console.log('triger');
    socket.on("user_check", (data) => {
      console.log('user_check---', data);
    });
    socket.on("getMsg", (data) => {
      setList((l) => [...l, data]);
      console.log('getMsg---', data);
    });
  }, []);


  useEffect(() => {
    console.log('list', list);
  }, [list])

  // useEffect(() => () => {
  //   setTestConnection("danger");
  //   setShow(false);
  // }, []);

  const onFinish = (values) => {
    localStorage.setItem('inituser', JSON.stringify(values));
    socket.emit("connectToRmq", values);
    console.log('values:', values);
  };

  const sendMsg = () => {
    let d = JSON.stringify(Date.now());
    console.log({ msg: d });
    setMsg({ msg: d });
  };

  useEffect(() => {
    socket.emit("testMsg", { msg, user });
    console.log('отправил testMsg', { msg, user });
  }, [msg]);

  const getMsg = () => {
    setList(l => [...l, 'asd'])
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
    >
      <Form.Item
        label="Username"
        name="username"
        initialValue={user?.username || ''}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        initialValue={user?.password || ''}
      >
        <Input.Password />
      </Form.Item>


      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit">
          Проверить
        </Button>
        {show && <Text type={testConnection}>{testConnection}</Text>}
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="button" onClick={() => sendMsg()}>
          Отправить
        </Button>
        <Button type="primary" htmlType="button" onClick={() => getMsg()}>
          Получить
        </Button>
      </Form.Item>
      {list && list.map((el) => <div key={el}>{el}</div>)}
    </Form>
  );
};


export default Settings;