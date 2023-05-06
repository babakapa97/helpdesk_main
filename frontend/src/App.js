import 'bootstrap/dist/css/bootstrap.min.css';
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

function App() {
  return (
  <div>
    
    <Container fluid>
    <Row><HNaviBar /></Row>
    <Stack gap={3}>
    <BrowserRouter>
    <Row>
     <Col sm={2}><VNaviBar /></Col>
    <Routes>
    <Route path="/" element={<Col><LoginForm /></Col>} /> 
    <Route path="/ticket_list" element={<Col><TicketList /></Col>} />
    <Route path="/knowbase" element={<KnowBase />} />
    </Routes>
    </Row>
    </BrowserRouter>
    </Stack>
    </Container>
  </div>

  );
}
console.log();
export default App;
