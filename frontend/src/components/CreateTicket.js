
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Alert } from 'react-bootstrap';

function CreateTicket({ user_id }) {
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const access = localStorage.getItem('accessToken');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status_id: '1',
    author: user_id
  });

 

  // const handleClose = () => setShowModal(false);

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

  const handleChange = (event) => {
    const name = event.target.name;
    let value = event.target.value;

    if (name === 'category') {
      value = parseInt(value);
    }

    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // отменяем стандартное поведение браузера

    if (!formData.title) {
      alert('Введите заголовок!');
      return;
    }

    if (!formData.description) {
      alert('Введите описание!');
      return;
    }

    console.log(formData);
    // отправляем данные на сервер
    axios.post('http://localhost:8000/api/tickets/create/',
      { 
        headers: {
        'Authorization': `Bearer ${access}`, 
      },

        title: formData.title,

        description: formData.description,

        status: {
          status_id: parseInt(formData.status_id)
        },

        category: {
          category_id: parseInt(formData.category_id)
        },

        author: parseInt(user_id)

      })
      .then((response) => {
        // обрабатываем ответ сервера
        console.log(response);
        setShowAlert(true);
        setShowModal(false); // закрываем модальное окно
        window.location.reload();
      })
      .catch((error) => {
        // обрабатываем ошибки
        console.error(error);
      });
  };

  return (
    <>
      {showAlert && (
        <Alert key="success" variant="success">
          Заявка успешно создана!
        </Alert>
      )}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" >
          <Form.Label>Название</Form.Label>
          <Form.Control type="text" name="title" onChange={handleChange} value={formData.title} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
          <Form.Label>Описание</Form.Label>
          <Form.Control as="textarea" rows={3} name="description" onChange={handleChange} value={formData.description} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Категория</Form.Label>
          <Form.Select name="category_id" onChange={handleChange} value={formData.category_id}>
            <option value="">Выберите категорию</option>
            {categories.map((category) => (
              <option key={category.category_id} value={category.category_id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
        <Button variant="primary" type="submit">
          Отправить
        </Button>
      </Form>
    </>
  );
}

export default CreateTicket;
