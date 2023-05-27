import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import axios from 'axios';

const DeviceList = () => {
    const [devices, setDevices] = useState([]);

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

    const columns = [
        {
            title: 'Имя устройства',
            dataIndex: 'computer_name',
            key: 'computer_name',
        },
        {
            title: 'Объем оперативной памяти',
            dataIndex: 'memory_info',
            key: 'memory_info',
        },
        {
            title: 'Информация о мониторе',
            dataIndex: 'monitor_info',
            key: 'monitor_info',
        },
        {
            title: 'Владелец',
            dataIndex: 'owner_id',
            key: 'owner_id',
        },
    ];

    return (
        <div>
            <h2>Список АРМ</h2>
            <Table dataSource={devices} columns={columns} />
        </div>
    );
};

export default DeviceList;
