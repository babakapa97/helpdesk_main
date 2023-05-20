import CreateTicket from '../pages/CreateTicket';
import { useState } from 'react';
import { Button, Input, Space, Modal } from 'antd';

const { Search } = Input;

function SearchBar() {

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
      <Space wrap>
        <Button type="primary" onClick={showModal}>Создать заявку</Button>
      </Space>
      <Modal title="Basic Modal" okButtonProps={{ style: { display: 'none' } }} cancelButtonProps={{ style: { display: 'none' } }} 
      open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <CreateTicket />
      </Modal>
    </>
  );
}

export default SearchBar;