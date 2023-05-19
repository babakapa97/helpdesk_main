import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Row, Stack, Col, Card, Accordion } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VNaviBar from '../components/VNaviBar';
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';

function KnowBase({ user_id }) {

  const [knowbase_items, setKnowBaseItem] = useState([]);
  const access = localStorage.getItem('accessToken');

  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/knowbase/', {
      headers: {
        'Authorization': `Bearer ${access}`,
      }
    })

      .then(response => setKnowBaseItem(response.data))
      .catch(error => {

        if (error.response) {
          console.log(error.response.data); // ошибка от сервера
        } else if (error.request) {
          console.log(error.request); // нет ответа от сервера
        } else {
          console.log('Error', error.message); // общая ошибка
        }
        console.log(error.config); // конфигурация запроса
      });
  }, []);

  return (
    <div>
      <Stack gap={0}>
        <Container fluid>
          <Row>
            <Col sm={2}><VNaviBar /></Col>
            <Col>
              <Card>
                <Card.Header as="h6"><Row><Navigation user_id={user_id} /></Row> </Card.Header>
                <Card.Body><Row><SearchBar user_id={user_id} /></Row>
                </Card.Body>
              </Card>
              <Container fluid>
                <Card>
                  <Card.Body>
                    <Accordion>
                      {knowbase_items.map(item => (
                        <Accordion.Item key={item.id} eventKey={item.id.toString()}>
                          <Accordion.Header>{item.title}</Accordion.Header>
                          <Accordion.Body>{item.content}</Accordion.Body>
                        </Accordion.Item>
                      ))}
                    </Accordion>
                  </Card.Body>
                </Card>
              </Container>
            </Col>
          </Row>
        </Container>
      </Stack>
    </div>
  );
}

export default KnowBase;