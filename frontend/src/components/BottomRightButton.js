import { Affix, Button, Tooltip } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const BottomRightButton = () => {
  return (
    <Affix style={{ position: 'fixed', bottom: 16, right: 16 }}>
      <Tooltip title="Перейти к чат-боту">
      <Button type="primary" shape="circle" icon={<SendOutlined />} a href='https://t.me/vita03_helpbot' size="large" />
      </Tooltip>
    </Affix>
  );
}

export default BottomRightButton;
