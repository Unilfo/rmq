import React, { useContext } from 'react';
import { AppStateContext } from '../../components/provider';
import { useHistory } from 'react-router-dom';
import './login.scss';
import { Button } from 'antd';
import { Input } from 'antd';

const Login = () => {
  const history = useHistory();
  const { appSetLogin } = useContext(AppStateContext);

  const login = () => {
    appSetLogin();
    history.push('/');
  };

  return (
    <div className="login">
      <form className="login login__form">
          <div className="login login__input">
            <Input value={''} placeholder='Email'/>
          </div>
          <div className="login login__input">
            <Input value={''} placeholder='Password' type='password' />
          </div>
        <Button type="primary" className="login login__button" onClick={() => login()}>Войти</Button>
      </form>
    </div>
  )
};


export default Login;