import { useState } from 'react';
import { useNavigate, Outlet } from 'react-router-dom';
import axios from 'axios';
import { Form, Input, Button, message } from 'antd';

function Login() {
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleLogin = (values) => {
    setLoading(true);
    console.log(values);
    axios
      .post('http://localhost:8000/api/token/', JSON.stringify(values), {
        headers: {
          'Content-Type': 'application/json',
        },
      }) 
      .then((response) => {
        const { access, refresh } = response.data;
        localStorage.setItem('accessToken', access);
        localStorage.setItem('current_user', username)
        message.success('Вход выполнен успешно');
        console.log(localStorage.getItem('accessToken'));
        navigate('/', { replace: true });
        window.location.reload();
      })
      .catch((error) => {
        console.error(error);
        message.error('Ошибка при входе');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  return (
    <> <Form onFinish={handleLogin}>
      <Form.Item
        label="Имя пользователя"
        name="username"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите имя пользователя',
          },
        ]}
      >
        <Input type="text" value={username} onChange={handleUsernameChange} />
      </Form.Item>

      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: 'Пожалуйста, введите свой пароль',
          },
        ]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Войти
        </Button>
      </Form.Item>
    </Form></>
  );
}

export default Login;



