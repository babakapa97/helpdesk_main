import { Container, Card, ListGroup } from 'react-bootstrap';
import Nav from 'react-bootstrap/Nav';
import { Navbar } from 'react-bootstrap';
import Logo from '../components/img/logo_rmiac.png'
import { FcViewDetails, FcQuestions, FcAutomatic } from "react-icons/fc";


function VNaviBar() {
  return (
    <Container>
      
      <Navbar.Brand>
        <img
          src={Logo}
          width="196"
          height="44"
          className="brandlogo"
          alt="logo"
        />
      </Navbar.Brand>   
      <Nav defaultActiveKey="/tickets" className="flex-column"> 
      <Nav.Link href="/tickets" className='l1'><FcViewDetails/> Заявки</Nav.Link> 
      <Nav.Link eventKey="/knowbase" className='l2'><FcQuestions/> База знаний</Nav.Link>
      <Nav.Link eventKey="/manage" className='l3'><FcAutomatic/> Менеджмент</Nav.Link>
      </Nav> 
    </Container>
  );
}

export default VNaviBar;