import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import TicketList from './pages/TicketList'
import HNaviBar from './components/HNaviBar';
import VNaviBar from './components/VNaviBar';
import {Routes, Route, BrowserRouter} from 'react-router-dom';
import Auth from './components/Auth';
import KnowBase from './pages/KnowBase'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import LoginForm from "./pages/LoginForm"
import Navigation from './components/Navigation';
import TicketDetail from './pages/TicketDetail';

function App() {
  return (
  <div>
    <Stack gap={0}>
    <BrowserRouter>
    <Container fluid>
      <Row>
      <Col sm={2}><VNaviBar /></Col>
    <Col><Row><  Navigation /></Row>
    <Routes>
    <Route path="/" element={<Row><LoginForm /></Row>} /> 
    <Route path="/ticket_list" element={<Row><TicketList /></Row>} />
    <Route path="/tickets/:id" element={<Row><TicketDetail /></Row>} />
    <Route path="/knowbase" element={<KnowBase />} />
    </Routes>
    </Col>
    </Row>
    </Container>
    </BrowserRouter>
    </Stack>

  </div>

  );
}
console.log();
export default App;
