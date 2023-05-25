import Calendar from '../components/Calendar';
import SimpleBot from '../components/SimpleBot'
import SimpleClock from '../components/SimpleClock';
import { Col, Row, Button, Tooltip, Space } from 'antd';
import { SendOutlined  } from '@ant-design/icons';



function Home() {
    const username = localStorage.getItem('current_user');

    return (
        <div>

            <h3>Здравствуйте, {username}! </h3>
            <p>Добро пожаловать в виртуального ассистента службы технической поддержки. Для начала общения нажмите кнопку ниже. </p>
            <Row>
                <Col>
                <Space>
                <Row><Button className="bot_btn" type="primary" icon={<SendOutlined />} a href='https://t.me/vita03_helpbot' size="large">Перейти к чат-боту</Button></Row></Space>
                
                </Col>
                {/* <Col span={12}><SimpleBot /> </Col> */}
                <Col span={12} offset={18}><Calendar /></Col>
                <Col></Col>
            </Row>
        </div>
    )

}

export default Home;