import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, message, Upload, Divider } from 'antd';
import { InboxOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { Dragger } = Upload;

function CreateTicket({ setTicketAdded }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const access = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');
  const [fileList, setFileList] = useState([]);
  const [searchResults, setSearchResults] = useState([]); // Инициализация searchResults с пустым массивом


  useEffect(() => {
    axios.get('http://127.0.0.1:8000/api/categories/')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.log(error);
      });
  }, []);

  const handleChange = (value, fieldName) => {
    setSelectedCategory(value);
    form.setFieldsValue({ [fieldName]: value });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      const { title, description, category_id, author } = values;
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('category_id', category_id);
      formData.append('author', parseInt(user_id));
      if (fileList.length > 0) {
        formData.append('attach', fileList[0].originFileObj);
      }

      //добавление тикета
      axios.post('http://localhost:8000/api/tickets/create/', formData, {
        headers: {
          // 'Authorization': `Bearer ${access}`,
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((response) => {
          form.resetFields();
          setSelectedCategory('');
          setTicketAdded(true);
          setFileList([]);
          message.success('Тикет успешно добавлен');
        })
        .catch((error) => {
          console.error(error);
          message.error('Ошибка при добавлении тикета');
        });
    });
  };

  // Функция для выполнения запроса к API поиска
  const searchAPI = async (query) => {
    try {
      const response = await axios.get(`http://localhost:8000/api/knowbase/?search_query=${query}`);
      return response.data; // Вернуть результаты поиска
    } catch (error) {
      console.error(error);
      return []; // В случае ошибки вернуть пустой массив
    }
  };

  // Обработчик события при изменении значения в поле описания
  const handleDescriptionChange = async (e) => {
    const query = e.target.value; // Получение значения поля описания

    if (query.trim() === '') {
      setSearchResults([]); // Очистка результатов поиска, если поле описания пустое
      return;
    }
    const results = await searchAPI(query); // Выполнение поиска через API

    setSearchResults(results); // Установка результатов поиска в состояние
  };

  return (
    <div>
      <Form
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        form={form}
        onFinish={handleSubmit}
      >
        <Form.Item
          name="title"
          label="Название заявки"
          onChange={handleDescriptionChange}
          rules={[
            {
              required: true,
              message: 'Введите заголовок заявки!',
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="description"
          label="Описание"
          rules={[
            {
              required: true,
              message: 'Введите описание заявки!',
            },
          ]}
        >
          <Input.TextArea />
        </Form.Item>
        <Form.Item label="Выберите категорию" name="category_id">
          <Select
            value={selectedCategory}
            style={{ width: 315 }}
            onChange={(value) => handleChange(value, 'category_id')}
          >
            {categories.map(category => (
              <Select.Option
                key={category.category_id.toString()}
                value={category.category_id.toString()}
              >
                {category.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        {searchResults.length > 0 && <Divider orientation="left">Возможно, вас заинтересует</Divider>}
        <ul>
          {searchResults.map((result) => (
            <li key={result.id}>
              <Link to={`http://localhost:3000/knowbase/${result.id}`} target="_blank">{result.title}</Link>
            </li>
          ))}
        </ul>
        <Form.Item style={{ width: '710px' }} >
          <Dragger
            fileList={fileList}
            onChange={({ fileList }) => setFileList(fileList)}
            beforeUpload={() => false}
          >
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Нажмите или перетащите файл в эту область</p>
            <p className="ant-upload-hint">
              ВНИМАНИЕ: Поддерживается загрузка только одного файла!
            </p>
          </Dragger>
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 9 }}>
          <Button type="primary" htmlType="submit">
            Отправить
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default CreateTicket;
