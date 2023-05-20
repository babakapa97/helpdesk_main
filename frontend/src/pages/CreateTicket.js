
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, InputNumber } from 'antd';

function CreateTicket() {
  const [categories, setCategories] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const access = localStorage.getItem('accessToken');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: '',
    status_id: '1',
    author: '1'
  });


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

        author: '1'

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


  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };
  
  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: '${label} is required!',
    types: {
      email: '${label} is not a valid email!',
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  };

  /* eslint-enable no-template-curly-in-string */
  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <>
      <Form
    {...layout}
    name="nest-messages"
    onFinish={onFinish}
    style={{
      maxWidth: 600,
    }}
    validateMessages={validateMessages}
  >
    <Form.Item
      name={['user', 'name']}
      label="Name"
      rules={[
        {
          required: true,
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'email']}
      label="Email"
      rules={[
        {
          type: 'email',
        },
      ]}
    >
      <Input />
    </Form.Item>
    <Form.Item
      name={['user', 'age']}
      label="Age"
      rules={[
        {
          type: 'number',
          min: 0,
          max: 99,
        },
      ]}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item name={['user', 'website']} label="Website">
      <Input />
    </Form.Item>
    <Form.Item name={['user', 'introduction']} label="Introduction">
      <Input.TextArea />
    </Form.Item>
    <Form.Item
      wrapperCol={{
        ...layout.wrapperCol,
        offset: 8,
      }}
    >
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
    </>
  );
}

export default CreateTicket;
