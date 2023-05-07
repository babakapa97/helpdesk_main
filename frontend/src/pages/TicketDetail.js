import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Card, Button, Container, Row, Col, Form } from 'react-bootstrap';


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
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
      <Card.Footer className="text-muted">{ticket.created_at}</Card.Footer>
    </Card></Col>
    <Col xs={6} md={4}><>
      <Form.Group className="mb-3">
        <Form.Label>Категория</Form.Label>
        <Form.Control placeholder="Категория" disabled />
      </Form.Group>
      
      <Form.Group className="mb-3">
        <Form.Label>Статус</Form.Label>
        <Form.Select disabled>
          <option>{ticket.status}</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Check type="checkbox" label="Can't check this" disabled />
      </Form.Group>
    </></Col>
    </Row>
    </Container>
    </div>
  );
}

export default TicketDetail;
