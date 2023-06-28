import { Col, Row } from 'antd';
import TicketPie from '../components/TicketPie'



function Home() {
    const username = localStorage.getItem('current_user');
  
    return (
      <div>
        <h3>Здравствуйте, {username}! </h3>
        <p>Добро пожаловать в виртуального ассистента службы технической поддержки. Для начала общения с чат-ботом нажмите кнопку в правом нижнем углу. </p>
        <Row justify="center">
          <Col>
            <TicketPie />
          </Col>
          <Col span={12} offset={12}>
          </Col>
        </Row>
      </div>
    );
  }
  

export default Home;