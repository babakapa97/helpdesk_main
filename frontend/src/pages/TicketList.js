import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import { Container, Row, Stack, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import VNaviBar from '../components/VNaviBar';
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';

axios.defaults.withCredentials = true;

function TicketList({user_id}) {
    const [tickets, setTickets] = useState([]);
    const access = localStorage.getItem('accessToken');
    console.log(user_id);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tickets/', {
            headers: {
                'Authorization': `Bearer ${access}`,
            }
        })

            .then(response => setTickets(response.data))
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
        <>
            <Stack gap={0}>
                <Container fluid>
                    <Row>
                        <Col sm={2}><VNaviBar /></Col>
                        <Col>
                            <Row><Navigation user_id={user_id} /></Row>
                            <Row><SearchBar /></Row>
                            <Container fluid>
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <th>№</th>
                                            <th>Название</th>
                                            <th>Описание</th>
                                            <th>Автор</th>
                                            <th>Статус</th>
                                            <th>Категория</th>
                                            <th>Назначено</th>
                                            <th>Дата создания</th>
                                            <th>Обновлено</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {tickets.map(ticket => (
                                            <tr key={ticket.id}>
                                                <td><Link to={`/tickets/${ticket.id}`}>{ticket.id}</Link></td>
                                                <td><Link to={`/tickets/${ticket.id}`}>{ticket.title}</Link></td>
                                                <td>{ticket.description}</td>
                                                <td>{ticket.author.username}</td>
                                                <td>{ticket.status.name}</td>
                                                <td>{ticket.category.name}</td>
                                                <td>{ticket.agent}</td>
                                                <td>{ticket.created_at}</td>
                                                <td>{ticket.updated_at}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </Table>
                            </Container>
                        </Col>
                    </Row>
                </Container>
            </Stack>
        </>

    );
}

export default TicketList;
