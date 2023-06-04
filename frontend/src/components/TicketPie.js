import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie } from '@ant-design/plots';

const TicketPie = () => {
  const [tickets, setTickets] = useState([]);
  const [userGroup, setUserGroup] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    const user_id = localStorage.getItem('user_id');

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
      })
      .catch(error => {
        console.error('Невозможно показать тикеты:', error);
      });
  }, [userGroup]);

  const ticketStats = {
    'new': 0,
    'work': 0,
    'wait': 0,
    'solved': 0,
  };

  tickets.forEach(ticket => {
    if (ticket.status.status_id === 1) {
      ticketStats.new += 1;
    } else if (ticket.status.status_id === 2) {
      ticketStats.work += 1;
    } else if (ticket.status.status_id === 3) {
      ticketStats.wait += 1;
    } else if (ticket.status.status_id === 4) {
      ticketStats.solved += 1;
    }
  });

  const data = [
    {
      type: 'Новая',
      value: ticketStats.new,
    },
    {
      type: 'В работе',
      value: ticketStats.work,
    },
    {
      type: 'Ожидающие',
      value: ticketStats.wait,
    },
    {
      type: 'Решена',
      value: ticketStats.solved,
    },
  ];

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 1,
    innerRadius: 0.6,
    label: {
      type: 'inner',
      offset: '-50%',
      content: '{value}',
      style: {
        textAlign: 'center',
        fontSize: 14,
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
    statistic: {
      title: false,
      content: {
        style: {
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        },
        content: 'Заявки',
      },
    },
  };

  return <Pie {...config} />;
};

export default TicketPie;
