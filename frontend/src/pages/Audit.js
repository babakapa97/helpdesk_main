import React, { useEffect, useState } from 'react';
import { Table, Input } from 'antd';
import { Link } from 'react-router-dom';
import axios from 'axios';

const DeviceList = () => {
    const [devices, setDevices] = useState([]);
    const [updatedDevices, setUpdatedDevices] = useState([]);


    useEffect(() => {
        // Запрос к API для получения списка устройств
        axios.get('http://localhost:8000/api/audit/')
            .then(response => {
                setDevices(response.data);
            })
            .catch(error => {
                console.error('Невозможно получить список устройств:', error);
            });
    }, []);


    useEffect(() => {
        const fetchOwnerNames = async () => {
          const updatedDevices = await Promise.all(devices.map(async device => {
            const ownerID = parseInt(device.owner);
            const ownerResponse = await axios.get(`http://localhost:8000/api/user/${ownerID}/`);
            const ownerName = ownerResponse.data.username;
            return {
              ...device,
              owner_name: ownerName,
            };
          }));
          setUpdatedDevices(updatedDevices); // Обновляем состояние updatedDevices
        };
      
        fetchOwnerNames();
      }, [devices]);
      

    const columns = [
        {
            title: 'Имя устройства',
            dataIndex: 'computer_name',
            key: 'computer_name',
        },
        {
            title: 'Процессор',
            dataIndex: 'processor_info',
            key: 'processor_info',
        },

        {
            title: 'Объем оперативной памяти',
            dataIndex: 'memory_info',
            key: 'memory_info',
        },
        {
            title: 'Информация о мониторах',
            dataIndex: 'monitor_info',
            key: 'monitor_info',
        },
        {
            title: 'Владелец',
            dataIndex: 'owner',
            key: 'owner',
            render: (owner_id, device) => (
                <Link to={`/user/${owner_id}`}>
                  {device.owner_name}
                </Link>
            ),
        },
    ];

    return (
        <div>
            <h2>Список АРМ</h2>
            <Input.Search placeholder="Поиск" />
            <Table dataSource={updatedDevices} columns={columns} />
        </div>
    );
};

export default DeviceList;
