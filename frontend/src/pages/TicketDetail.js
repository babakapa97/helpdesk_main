import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form, Stack } from 'react-bootstrap';
import VNaviBar from '../components/VNaviBar';
import Navigation from '../components/Navigation';


function TicketDetail() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  let { id } = useParams();


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/`+id+`/`);
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
    return <p>Loading...</p>;
  }

  if (!ticket) {
    return <p>Unable to fetch ticket.</p>;
  }

  return (
    <div>
      <Stack gap={0}>
          <Container fluid>
            <Row>
              <Col sm={2}><VNaviBar /></Col>
              <Col>
                <Row><Navigation /></Row>  
      <Container>
      <Row>
        <Col>
      <Card as="h5">
      <Card.Header>Заявка №{ticket.id}</Card.Header>
      <Card.Body>
        <Card.Title>{ticket.title}</Card.Title>
        <Card.Text>
        {ticket.description}
        </Card.Text>
        <Button variant="primary">Тык</Button>
      </Card.Body>
      <Card.Footer className="text-muted">Вложения <a href={ticket.attach}>ссылка</a></Card.Footer>
      <Card.Footer className="text-muted">Создано {ticket.created_at}</Card.Footer>
    </Card></Col>
    <Col xs={6} md={4}><>
    <Form.Group className="mb-3">
        <Form.Label>Категория</Form.Label>
        <Form.Select disabled>
          <option>{ticket.category.name}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Статус</Form.Label>
        <Form.Select disabled>
          <option>{ticket.status.name}</option>
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
        <Form.Select disabled>
          <option>{ticket.agent}</option>
        </Form.Select>
      </Form.Group>
    </></Col>
    </Row>
    </Container>
    </Col>
    </Row>
    </Container>
    </Stack>
    </div>
  );
}

export default TicketDetail;
