import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form, Stack, Spinner, Alert } from 'react-bootstrap';
import VNaviBar from '../components/VNaviBar';
import Navigation from '../components/Navigation';


function TicketDetail({ user_id }) {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status_id: '',
    author: user_id
  });

  let { id } = useParams();

  //подгрузка категорий из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // подгрузка статусов из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/status/')
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'category_id' || name === 'status_id') {
      value = parseInt(value);
    }

    if (name === 'title' || name === 'description') {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/` + id + `/`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  if (loading) {
    return <Spinner animation="border" />;
  }

  if (!ticket) {
    return <p>Заявка недоступна.</p>;
  }

  const updateData = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      updateData[key] = value;
    }
  });

  const updateTicket = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/`, updateData);
      console.log(response.data);
      setShowAlert(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateTicket();
  };

  const handleAssign = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/`, {
            agent_id: user_id
        });
        console.log(response.data);
        setShowAlert(true);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};


return (
  <div>
    {showAlert && (
      <Alert key="success" variant="success">
        Изменения сохранены
      </Alert>
    )}
    <Stack gap={0}>
      <Container fluid>
        <Row>
          <Col sm={2}><VNaviBar /></Col>
          <Col>
            <Card>
              <Card.Header> <Row><Navigation user_id={user_id} /></Row> </Card.Header>
              <Card.Body>
                <Container>
                  <Row>
                    <Col>
                      <Card as="h8">
                        <Card.Header>Заявка №{ticket.id}</Card.Header>
                        <Card.Body>
                          <Card.Title name="title" defaultValue={formData.title} onInput={handleChange}>{ticket.title}</Card.Title>
                          <Card.Text name="description" defaultValue={formData.description} onInput={handleChange}>
                            {ticket.description}
                          </Card.Text>

                        </Card.Body>
                        <Card.Footer className="text-muted">Вложения <a href={ticket.attach}>ссылка</a></Card.Footer>
                        <Card.Footer className="text-muted">Создано {ticket.created_at}</Card.Footer>
                      </Card>
                    </Col>

                    <Col xs={6} md={4}><>
                      <Form.Group className="mb-3">
                        <Form.Label>Категория</Form.Label>
                        <Form.Select name="category_id" onChange={handleChange} value={formData.category_id}>
                          {ticket && (
                            <option value={ticket.category.category_id}>
                              {ticket.category.name}
                            </option>
                          )}
                          {categories.map((category) => {
                            // Проверка наличия категории в тикете
                            const isTicketCategory = ticket && category.category_id === ticket.category.category_id;
                            if (!isTicketCategory) {
                              return (
                                <option key={category.category_id} value={category.category_id}>
                                  {category.name}
                                </option>
                              );
                            }
                            return null; // Исключаем повторяющуюся категорию
                          })}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Статус</Form.Label>
                        <Form.Select name="status_id" onChange={handleChange} value={formData.status_id}>
                          {ticket && (
                            <option value={ticket.status.status_id}>
                              {ticket.status.name}
                            </option>
                          )}
                          {status.map((status) => {
                            // Проверка наличия статуса в тикете
                            const isTicketStatus = ticket && status.status_id === ticket.status.status_id;
                            if (!isTicketStatus) {
                              return (
                                <option key={status.status_id} value={status.status_id}>
                                  {status.name}
                                </option>
                              );
                            }
                            return null; // Исключаем повторяющийся статус
                          })}
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Автор</Form.Label>
                        <Form.Select disabled>
                          <option>{ticket.author.username}</option>
                        </Form.Select>
                      </Form.Group>
                      <Form.Group className="mb-3">
                        <Form.Label>Назначено</Form.Label>
                        <Button variant="dark" className='btn-choose' size='sm' onClick={handleAssign}>Назначить себе</Button>
                        <Form.Select>
                          <option>{ticket.agent && ticket.agent.username}</option>
                        </Form.Select>
                        <Form.Group>
                          <Button variant="success" className='btn-comm' onClick={handleSave}>Сохранить</Button>
                        </Form.Group>
                      </Form.Group>
                    </></Col>
                  </Row>
                </Container>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Stack>
  </div>
);
}

export default TicketDetail;
