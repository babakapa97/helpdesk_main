import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions } from 'antd';



function TicketDetail() {
  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [status, setStatus] = useState([])
  const [showAlert, setShowAlert] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status_id: '',
    author: '1'
  });

  let { id } = useParams();

  //подгрузка категорий из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // подгрузка статусов из БД
  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/status/')
      .then(response => {
        setStatus(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  // const handleChange = (event) => {
  //   const name = event.target.name;
  //   let value = event.target.value;

  //   if (name === 'category_id' || name === 'status_id') {
  //     value = parseInt(value);
  //   }

  //   if (name === 'title' || name === 'description') {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value
  //     }));
  //   } else {
  //     setFormData((prevFormData) => ({
  //       ...prevFormData,
  //       [name]: value
  //     }));
  //   }
  // };

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/` + id + `/`);
        setTicket(response.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchTicket();
  }, [id]);

  // if (loading) {
  //   return <Spinner animation="border" />;
  // }

  if (!ticket) {
    return <p>Заявка недоступна.</p>;
  }

  const updateData = {};
  Object.entries(formData).forEach(([key, value]) => {
    if (value) {
      updateData[key] = value;
    }
  });

  const updateTicket = async () => {
    try {
      const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/`, updateData);
      console.log(response.data);
      setShowAlert(true);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  const handleSave = (event) => {
    event.preventDefault();

    updateTicket();
  };

  const handleAssign = async (event) => {
    event.preventDefault();
    try {
        const response = await axios.put(`http://127.0.0.1:8000/api/tickets/${id}/`, {
            agent_id: '1'
        });
        console.log(response.data);
        setShowAlert(true);
        window.location.reload();
    } catch (error) {
        console.log(error);
    }
};


return (
  <div>
 <Descriptions title="Ticket Info" layout="vertical">
    <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
    <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
    <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
    <Descriptions.Item label="Address" span={2}>
      No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
    </Descriptions.Item>
    <Descriptions.Item label="Remark">empty</Descriptions.Item>
  </Descriptions>
           
  </div>
);
}

export default TicketDetail;
