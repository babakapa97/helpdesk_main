import { Breadcrumb, Modal, Button, Container, Form, Nav, Navbar } from 'react-bootstrap';
import CreateTicket from '../components/CreateTicket'
import { useState } from 'react';
import WhoLoggedIn from './WhoLoggedIn'

  
function Navigation({user_id}) {

  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <Navbar bg="light" expand="lg">
      <Container fluid >
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-10 my-lg-2"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
          <Breadcrumb>
      <Breadcrumb.Item href="#">Домой</Breadcrumb.Item>
      <Breadcrumb.Item active>Заявки</Breadcrumb.Item>
    </Breadcrumb>
          </Nav>
          <Button className="create_button" variant="success" onClick={handleShow}>Создать заявку</Button>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Создать заявку</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CreateTicket />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Закрыть
          </Button>
        </Modal.Footer>
      </Modal>
      <WhoLoggedIn user_id={user_id} />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;