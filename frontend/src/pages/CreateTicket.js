import { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Form, Input, Select, message, Upload } from 'antd';
import { InboxOutlined } from '@ant-design/icons';

const { Dragger } = Upload;

function CreateTicket({ setTicketAdded }) {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [form] = Form.useForm();
  const [categories, setCategories] = useState([]);
  const access = localStorage.getItem('accessToken');
  const user_id = localStorage.getItem('user_id');
  const [fileList, setFileList] = useState([]);

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
      const { title, description, category_id } = values;

      axios.post('http://localhost:8000/api/tickets/create/', {
        headers: {
          'Authorization': `Bearer ${access}`,
        },
        title,
        description,
        category: {
          category_id: parseInt(category_id)
        },
        status: {
          status_id: '1'
        },
        author: parseInt(user_id)
      })
        .then((response) => {
          form.resetFields();
          setSelectedCategory('');
          setTicketAdded(true);
          message.success('Тикет успешно добавлен');
        })
        .catch((error) => {
          console.error(error);
          message.error('Ошибка при добавлении тикета');
        });
    });
  };
  
  

  return (
    <Form
      labelCol={{ span: 8 }}
      wrapperCol={{ span: 16 }}
      form={form}
      onFinish={handleSubmit}
    >
      <Form.Item
        name="title"
        label="Название заявки"
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
      <Form.Item>
        <Dragger
          fileList={fileList}
          onChange={({ fileList }) => setFileList(fileList)}
          beforeUpload={() => false}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other banned files.
          </p>
        </Dragger>
      </Form.Item>
      <Form.Item wrapperCol={{ offset: 8 }}>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form.Item>
    </Form>
  );
}

export default CreateTicket;
