import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Descriptions, Spin } from 'antd';
import { useParams } from 'react-router-dom';

const UserDetail = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [equipment, setEquipment] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const [userResponse, equipmentResponse] = await Promise.all([
            axios.get(`http://localhost:8000/api/user/${id}/`),
            axios.get(`http://localhost:8000/api/audit/?owner=${id}`),
          ]);
          setUser(userResponse.data);
          setEquipment(equipmentResponse.data);
        }
      } catch (error) {
        console.error('Невозможно получить информацию о пользователе и оборудовании:', error);
      }
    };

    fetchData();
  }, [id]);

  if (!user) {
    return <div><Spin /></div>;
  }

  const { first_name, last_name, username, groups, email } = user;

  const handleEmailClick = () => {
    window.location.href = `mailto:${email}`;
  };

  return (
    <div>
      <h2>Информация о пользователе</h2>
      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Логин">{username}</Descriptions.Item>
        <Descriptions.Item label="Имя">{`${first_name} ${last_name}`}</Descriptions.Item>
        <Descriptions.Item label="Группа">{groups[0]}</Descriptions.Item>
        <Descriptions.Item label="Электронная почта">
          <a href={`mailto:${email}`} onClick={handleEmailClick}>
            {email}
          </a>
        </Descriptions.Item>
        <Descriptions.Item label="Оборудование" span={2}>
          {equipment.map((item) => (
            <div key={item.id}>
              <strong>Имя ПК: </strong> {item.computer_name}
              <br />
              <strong>Процессор: </strong> {item.processor_info}
              <br />
              <strong>Количество памяти: </strong> {item.memory_info}
              <br />
              <strong>Мониторы: </strong> {item.monitor_info}
              <br />
              <br />
            </div>
          ))}
        </Descriptions.Item>
      </Descriptions>
    </div>
  );
};

export default UserDetail;
