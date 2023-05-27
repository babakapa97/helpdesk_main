import CreateTicket from '../pages/CreateTicket';
import { useState } from 'react';
import { Button, Input, Space, Modal } from 'antd';
import { CSVLink } from 'react-csv';
import { ExportOutlined } from '@ant-design/icons';


const { Search } = Input;

const ExportButton = ({ exportData }) => {
  return (
    <>
      <CSVLink data={exportData} filename="tickets.csv">
        <Button icon={<ExportOutlined />}>Экспорт в CSV</Button>
      </CSVLink>
    </>
  );
};


function SearchBar({setTicketAdded}) {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
    <h2>Список заявок</h2>
      <Space wrap>
        <Button type="primary" onClick={showModal}>Создать заявку</Button>
      </Space>
      <Modal title="Новая заявка" okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} 
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CreateTicket setTicketAdded={setTicketAdded}/>
      </Modal>
      {/* <ExportButton /> */}
    </>
  );
}

export default SearchBar;