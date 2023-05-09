import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import HNaviBar from '../components/HNaviBar';
import { Container } from 'react-bootstrap';
import Row from 'react-bootstrap/Row';
import Navigation from '../components/Navigation';
import { Link } from 'react-router-dom';
axios.defaults.withCredentials = true;


function TicketList() {
    const [tickets, setTickets] = useState([]);
    const accessToken = localStorage.getItem('accessToken');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tickets', {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
            }
        })
            .then(response => setTickets(response.data))
            .catch(error => console.log(error))
    }, []);

    return (
        <>
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
        </>
    );
}

export default TicketList;
