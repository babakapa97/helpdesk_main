import { Container } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import Logo from '../components/img/logo_rmiac.png'


function VNaviBar() {
  return (
    <Container>
    <Navbar.Brand> 
        <img
              src={Logo}
              width="196"
              height="44"
              className="d-inline-block align-top"
              alt="logo"
            />
        </Navbar.Brand>  
    <Nav defaultActiveKey="/ticket_list" className="flex-column">
      <Nav.Link href="/ticket_list">Заявки</Nav.Link>
      <Nav.Link eventKey="/knowbase">База знаний</Nav.Link>
      <Nav.Link eventKey="/manage">Администрирование</Nav.Link>
    </Nav>
    </Container>
  );
}

export default VNaviBar;