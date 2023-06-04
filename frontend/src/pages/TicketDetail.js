import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Descriptions, Select, Button, Modal, Space, Skeleton, Tooltip, List, Form, Input, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { DeleteTwoTone, setTwoToneColor, UserAddOutlined } from '@ant-design/icons'
import { Comment } from '@ant-design/compatible';
import { saveAs } from 'file-saver';


const { Option } = Select;
const { TextArea } = Input;

setTwoToneColor('#eb2f96');

function TicketDetail() {
  const author = localStorage.getItem('user_id');
  const user = localStorage.getItem('current_user');
  const navigate = useNavigate();
  const [selectedAgent, setSelectedAgent] = useState('');
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
    author: ''
  });

  const [selectedStatus, setSelectedStatus] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState('');
  const [authorNames, setAuthorNames] = useState({});
  const [form] = Form.useForm();
  const [attachment, setAttachment] = useState(null);



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

  //подрузка комментариев из БД
  useEffect(() => {
    fetch(`http://localhost:8000/api/tickets/${id}/comments/`)
      .then(response => response.json())
      .then(data => setComments(data));
  }, []);

  //определение автора комментария
  useEffect(() => {
    // Получить список уникальных идентификаторов авторов комментариев
    const authorIds = [...new Set(comments.map(comment => comment.author_id))];

    // Запросить данные пользователя для каждого автора комментария
    const fetchAuthorNames = async () => {
      const authorNamesMap = {};

      for (const authorId of authorIds) {
        try {
          const response = await axios.get(`http://localhost:8000/api/user/${authorId}/`);
          const authorName = response.data.username;
          authorNamesMap[authorId] = authorName;
        } catch (error) {
          console.log(error);
        }
      }

      setAuthorNames(authorNamesMap);
    };


    fetchAuthorNames();
  }, [comments]);

  //отправка комментария
  const handleCommentSubmit = async () => {
    try {
      const commentText = form.getFieldValue('commentText'); // Получить значение комментария из формы
      const response = await axios.post(`http://localhost:8000/api/tickets/${id}/comments/`, {
        content: commentText,
        author: author
      });

      form.resetFields(); // Сбросить значения формы
      // Обновить список комментариев
      const commentResponse = await fetch(`http://localhost:8000/api/tickets/${id}/comments/`);
      const commentData = await commentResponse.json();
      setComments(commentData);
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8000/api/tickets/${id}/`);
        setTicket(response.data);
        setLoading(false);
        setSelectedStatus(response.data.status.status_id);
        setSelectedCategory(response.data.category.category_id);
        setSelectedAgent(response.data.agent?.username);
        setAttachment(response.data.attach);
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

  const handleChangeAgent = (value) => {
    setSelectedAgent(value);
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

  const handleDelete = () => {
    Modal.confirm({
      title: 'Удаление заявки',
      content: 'Вы уверены, что хотите удалить заявку?',
      okText: 'Удалить',
      cancelText: 'Отмена',
      onOk: async () => {
        try {
          await axios.delete(`http://127.0.0.1:8000/api/tickets/${id}/`);
          navigate('/tickets'); // Перенаправляем пользователя на страницу со списком тикетов после удаления
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  // Обработчик назначения агента
  const handleAssignAgent = () => {
    const assignData = {
      agent_id: author
    };

    axios.put(`http://localhost:8000/api/tickets/${id}/`, assignData)
      .then(response => {
        setTicket(response.data);
        setSelectedAgent('');
        setShowAlert(true);
        window.location.reload();
      })
      .catch(error => {
        console.log(error);
      });
  };

  const CommentList = ({ comments }) => (
    <List
      dataSource={comments}
      itemLayout="horizontal"
      renderItem={comment => (
        <Comment
          author={<a>{authorNames[comment.author_id]}</a>}
          content={<p>{comment.content}</p>}
          datetime={
            <Tooltip title={comment.created_at}>
              <span>{comment.created_at}</span>
            </Tooltip>
          }
        />
      )}
    />
  );


  if (!ticket) {
    return <p><Skeleton active /></p>;
  }

  return (
    <div>
      <Descriptions
        bordered
        labelStyle={{ fontWeight: 'bold' }}
        title={`Заявка # ${ticket.id}`}
        layout="vertical"
        extra={
          <>
            <Space>
              <Button
                type="default"
                danger
                onClick={handleDelete}
                disabled={user !== ticket.author.username && user !== 'admin'} 
              >
                Удалить <DeleteTwoTone />
              </Button>
              <Button type="primary" onClick={handleSave}>Сохранить</Button>
            </Space>
          </>}>
        <Descriptions.Item label="Название" span={1}>{ticket.title}</Descriptions.Item>
        <Descriptions.Item label="Описание" span={1}>{ticket.description}</Descriptions.Item>
        <Descriptions.Item label="Автор">{ticket.author ? ticket.author.username : 'Нет данных'}</Descriptions.Item>
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
        <Descriptions.Item label="Назначено">
          <Space>
            {ticket.agent?.username || 'Нет данных'}
            <Tooltip title="Назначить себе">
              <Button type="primary" size='small' disabled={ticket.author.username === user} onClick={handleAssignAgent}><UserAddOutlined /></Button>
            </Tooltip>
          </Space>
        </Descriptions.Item>
        <Descriptions.Item label="Вложение" span={1}>
          {attachment && (
            <a
              href={`http://localhost:8000${attachment}`}
              onClick={(e) => {
                e.preventDefault();
                saveAs(`http://localhost:8000${attachment}`, 'attachment');
              }}
            >
              Скачать вложение
            </a>
          )}

        </Descriptions.Item>
        <Descriptions.Item style={{ fontStyle: 'italic', textAlign: 'right' }}>Создано: {ticket.created_at}, обновлено {ticket.updated_at} </Descriptions.Item>
      </Descriptions>
      <Divider>Комментарии</Divider >
      <CommentList comments={comments} />
      <Form form={form} onFinish={handleCommentSubmit}>
        <Form.Item
          name="commentText"
          label="Введите комментарий"
          rules={[
            {
              required: true,
              message: 'Введите комментарий',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div >
  );
}

export default TicketDetail;
