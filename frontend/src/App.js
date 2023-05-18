import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Login from './components/Login';
import TicketList from './pages/TicketList';
import TicketDetail from './pages/TicketDetail';
import KnowBase from './pages/KnowBase'
import RequireAuth from './components/RequireAuth';
import { useState, useReducer } from 'react';
import jwtDecode from 'jwt-decode';



function App() {

  const [user_id, setUserId] = useState(null);

  return (
    <div>

      <BrowserRouter>
        <Container fluid>
          <Routes>
            <Route path="/" element={<Row><Login setUserId={setUserId} /></Row>} />
            <Route path="tickets/*" element={
              <Row>
                <RequireAuth setUserId={setUserId} >
                  <TicketList user_id={user_id} />
                </RequireAuth>
              </Row>} />
            <Route path="tickets/:id" element={
              <Row>
                <RequireAuth setUserId={setUserId}>
                  <TicketDetail user_id={user_id} />
                </RequireAuth>
              </Row>} />
          </Routes>
        </Container>
      </BrowserRouter>

    </div>

  );
}
console.log();
export default App;
