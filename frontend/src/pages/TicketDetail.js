import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Select, Button } from 'antd';

const { Option } = Select;

function TicketDetail() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status_id: '',
    author: '1'
  });

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  let { id } = useParams();

  // Подгрузка категорий из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // Подгрузка статусов из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/status/')
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/` + id + `/`);
        setTicket(response.data);
        setLoading(false);
        setSelectedStatus(response.data.status.status_id);
        setSelectedCategory(response.data.category.category_id);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  const handleChangeStatus = (value) => {
    setSelectedStatus(value);
  };

  const handleChangeCategory = (value) => {
    setSelectedCategory(value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/`, {
        status_id: selectedStatus,
        category_id: selectedCategory
      });
      console.log(response.data);
      setShowAlert(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (!ticket) {
    return <p>Заявка недоступна.</p>;
  }

  return (
    <div>
      <Descriptions title="Ticket Info" layout="vertical">
        <Descriptions.Item label="ID">{ticket.id}</Descriptions.Item>
        <Descriptions.Item label="Название">{ticket.title}</Descriptions.Item>
        <Descriptions.Item label="Описание">{ticket.description}</Descriptions.Item>
        <Descriptions.Item label="Статус">
          <Select value={selectedStatus} onChange={handleChangeStatus}>
            {status.map(s => (
              <Option key={s.status_id} value={s.status_id}>{s.name}</Option>
            ))}
          </Select>
        </Descriptions.Item>
        <Descriptions.Item label="Категория">
          <Select value={selectedCategory} onChange={handleChangeCategory}>
            {categories.map(c => (
              <Option key={c.category_id} value={c.category_id}>{c.name}</Option>
            ))}
          </Select>
        </Descriptions.Item>
      </Descriptions>

      <Button type="primary" onClick={handleSave}>Сохранить</Button>
    </div>
  );
}

export default TicketDetail;
