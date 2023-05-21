import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tickets/')
      .then((response) => {
        const data = response.data;
        setTickets(data);
      })
      .catch((error) => console.error('Невозможно показать тикеты:', error));
  }, []);

  const handleRowClick = (record) => {
    navigate(`/tickets/${record.id}`);
  };

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
      render: (text, record) => (
        <ClickableTableCell onClick={() => handleRowClick(record)}>
          {text}
        </ClickableTableCell>
      ),
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
      render: (status) => (
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

  // Компонент-обертка для ячейки таблицы с возможностью клика
  const ClickableTableCell = ({ onClick, children }) => (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );

  return (
    <>
      <SearchBar />
      <Table columns={columns} dataSource={tickets} rowKey="id" onRowClick={handleRowClick} />
    </>
  );
};

export default TicketList;
