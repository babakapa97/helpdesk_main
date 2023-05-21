import Calendar from '../components/Calendar';
import SimpleBot from '../components/SimpleBot'
import SimpleClock from '../components/SimpleClock';
import { Col, Row } from 'antd';



function Home() {
    const username = localStorage.getItem('current_user');

    return (
        <div>

            <h4>Здравствуйте, {username}! </h4>
            <p>Вы находитесь на главной странице системы</p>
            <Row>
                <Col span={12}><SimpleClock /></Col>
                <Col span={12} offset={15}><Calendar /></Col>
            </Row>
            {/* <SimpleBot /> */}
        </div>
    )

}

export default Home;