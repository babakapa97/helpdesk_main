import React, { useState } from 'react';
import axios from 'axios';
import { Form, Button, Alert, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';

function Login({ setUserId }) {
  const token = localStorage.getItem('accessToken');
  const [username, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (token) {
      const decodedToken = jwtDecode(token);
      const userId = decodedToken.user_id;
      setUserId(userId);
      navigate('/tickets/', { replace: true });
    } else {
      try {
        const response = await axios.post('http://localhost:8000/api/token/', { username, password });
        const { access } = response.data;
        localStorage.setItem('accessToken', access);
        const decodedToken = jwtDecode(access);
        const userId = decodedToken.user_id;
        setUserId(userId);
        navigate('/tickets/', { replace: true });
      } catch (error) {
        console.log(error);
        setError('Неправильный логин или пароль');
      }
    }
  };

  return (
    <div className="container">
      <Card className="text-center">
      <Card.Header><h2>Вход</h2>
      <p>В систему технической поддержки ГБУЗ «Республиканский медицинский информационно-аналитический центр»</p>
      </Card.Header>
      <Card.Body><Form onSubmit={handleSubmit}>
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
      </Card.Body>
      </Card>
    </div>
  );
}

export default Login;
