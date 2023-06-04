import Calendar from '../components/Calendar';
import SimpleBot from '../components/SimpleBot'
import SimpleClock from '../components/SimpleClock';
import { Col, Row, Button, Tooltip, Space } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import TicketPie from '../components/TicketPie'



function Home() {
    const username = localStorage.getItem('current_user');
  
    return (
      <div>
        <h3>Здравствуйте, {username}! </h3>
        <p>Добро пожаловать в виртуального ассистента службы технической поддержки. Для начала общения с чат-ботом нажмите кнопку в правом нижнем углу. </p>
        <Row>
          <Col>
            <TicketPie />
          </Col>
          <Col span={12} offset={12}>
            {/* <Calendar /> */}
          </Col>
        </Row>
      </div>
    );
  }
  

export default Home;