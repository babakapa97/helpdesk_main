import { Breadcrumb, Modal, Button, Container, Form, Nav, Navbar, Card } from 'react-bootstrap';
import WhoLoggedIn from './WhoLoggedIn'



function Navigation({ user_id }) {

  return (
    
      
        <Navbar bg="white" expand="lg">
          <Container fluid >
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-10 my-lg-2"
                style={{ maxHeight: '100px' }}
                navbarScroll
              >
                <Breadcrumb>
                  <Breadcrumb.Item className='br1' href="/tickets">Домой</Breadcrumb.Item>
                  <Breadcrumb.Item className='br2' active>Заявки</Breadcrumb.Item>
                </Breadcrumb>
              </Nav>
              <WhoLoggedIn user_id={user_id} />
            </Navbar.Collapse>
          </Container>
        </Navbar>
  );
}

export default Navigation;