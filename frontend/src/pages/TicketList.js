import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { Table, Tag, Button } from 'antd';

const TicketList = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:8000/api/tickets/')
            .then((response) => {
                const data = response.data;
                setTickets(data);
            })
            .catch((error) => console.error('Невозможно показать тикеты:', error));
    }, []);

    const handleTitleClick = (event) => {
        event.preventDefault();
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Название',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Статус',
            dataIndex: 'status',
            key: 'status',
            filters: [
                { text: 'Новая', value: 'Новая' },
                { text: 'В работе', value: 'В работе' },
                { text: 'Решена', value: 'Решена' },
                { text: 'Ожидающие', value: 'Ожидающие' },
            ],
            onFilter: (value, record) => record.status.name === value,
            render: (status, text, record) => (
                <>
                <Tag
                    color={
                        status && status.name === 'Новая'
                            ? 'green'
                            : status && status.name === 'В работе'
                                ? 'blue'
                                : status && status.name === 'Решена'
                                    ? 'black'
                                    : 'red'
                    }
                >
                    {status && status.name}
                </Tag>
                {/* <Button type="link" onClick={() => handleTitleClick(record)}>{text}</Button> */}
                </>
            ),
        },
        {
            title: 'Категория',
            dataIndex: 'category',
            key: 'category',
            render: (category) => category && category.name,
        },
        {
            title: 'Автор',
            dataIndex: 'author',
            key: 'author',
            render: (author) => author && author.username,
        },
        {
            title: 'Назначено',
            dataIndex: 'agent',
            key: 'agent',
            render: (agent) => agent && agent.username,
        },
    ];

    return (
    <>
    <SearchBar />
    <Table columns={columns} dataSource={tickets} />
    </>);
};

export default TicketList;
