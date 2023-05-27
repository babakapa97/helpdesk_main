import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import { Table, Tag } from 'antd';
import { useNavigate } from 'react-router-dom';

const TicketList = () => {
  const token = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');
  const [tickets, setTickets] = useState([]);
  const [userGroup, setUserGroup] = useState([]);
  const navigate = useNavigate();
  const [exportData, setExportData] = useState([]);
  const [ticketAdded, setTicketAdded] = useState(false);
  

  // Запрос к API для получения информации о пользователе
  useEffect(() => {
    axios.get(`http://127.0.0.1:8000/api/user/${user_id}/`)
      .then(response => {
        const groups = response.data.groups;
        setUserGroup(groups);
      })
      .catch(error => {
        console.log(error);
      });
  }, [user_id]);

  useEffect(() => {
    axios
      .get('http://127.0.0.1:8000/api/tickets/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        // Фильтрация заявок в зависимости от группы пользователя
        const filteredTickets = response.data.filter(ticket => {
          // Здесь нужно определить условие фильтрации 
          if (userGroup.includes('СOD') || user_id === ticket.author.id.toString()) {
            return ticket.category.category_id === 2 || ticket.category.category_id === 4 || ticket.category.category_id === 5 || ticket.author.id.toString() === user_id;          
          } else if (userGroup.includes('OIB') || user_id === ticket.author.id.toString()) {
            return ticket.category.category_id === 3 || ticket.author.id.toString() === user_id;
          } else if (userGroup.includes('INFO') || userGroup.includes('PROG') || user_id === ticket.author.id.toString()) {
            return ticket.category.category_id === 1 || ticket.author.id.toString() === user_id;
          } else if (userGroup.includes('simple_user')) {
            return ticket.author.id === user_id;
          } else {
            // Если не выполняется ни одно из условий фильтрации, возвращаем false
            return false;
          }
        });
        setTickets(filteredTickets);
        setExportData(filteredTickets.map(ticket => ({
          ID: ticket.id,
          Название: ticket.title,
          Статус: ticket.status.name,
          Категория: ticket.category.name,
          Автор: ticket.author.username,
          Дата_создания: ticket.created_at,
        })));
        
      })
      .catch(error => {
        console.error('Невозможно показать тикеты:', error);
      });
  }, [userGroup, user_id, ticketAdded]);

  console.log(exportData);

  const handleRowClick = (record) => {
    navigate(`/tickets/${record.id}`);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: 'descend',
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
                  : 'orange'
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

    {
      title: 'Дата создания',
      dataIndex: 'created_at',
      key: 'created_at',
    },
  ];


  // Компонент-обертка для ячейки таблицы с возможностью клика
  const ClickableTableCell = ({ onClick, children }) => (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {children}
    </div>
  );

  const handleTableChange = (pagination, filters, sorter) => {
    if (sorter && sorter.columnKey === 'id') {
      setTickets((prevTickets) => {
        const sortedTickets = [...prevTickets].sort((a, b) => (sorter.order === 'descend' ? b.id - a.id : a.id - b.id));
        return sortedTickets;
      });
    }
  };

  return (
    <>
      <SearchBar setTicketAdded={setTicketAdded} exportData={exportData} />

      <Table
        columns={columns}
        dataSource={tickets}
        rowKey="id"
        onRowClick={handleRowClick}
        onChange={handleTableChange}
      />
    </>
  );
};


export default TicketList;
