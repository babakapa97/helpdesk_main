import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Login({ setUserId }) {
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  

    try {
      const response = await axios.post('http://localhost:8000/api/token/', { username: username, password: password });
      const { access } = response.data;
      localStorage.setItem('accessToken', access);
      const decodedToken = jwtDecode(access);
      const userId = decodedToken.user_id;
      setUserId(userId);
      // console.log(access);
      navigate('/ticket_list/', { replace: true });
    } catch (error) {
      console.log(error);
      setError('Неправильный логин или пароль');
    }
  };

  return (
    <div className="container">
      <h2>Вход</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Логин</Form.Label>
          <Form.Control type="text" placeholder="Введите логин" value={username} onChange={(event) => setLogin(event.target.value)} required />
        </Form.Group>

        <Form.Group controlId="formBasicPassword">
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password" placeholder="Введите пароль" value={password} onChange={(event) => setPassword(event.target.value)} required />
        </Form.Group>

        <Button variant="primary" type="submit">
          Войти
        </Button>
      </Form>
    </div>
  );
};

export default Login;
