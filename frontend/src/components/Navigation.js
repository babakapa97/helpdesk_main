import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Breadcrumb } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';
import CreateTicket from '../components/CreateTicket'
import { useState } from 'react';
import { Modal } from 'react-bootstrap';


  
function Navigation() {

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
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Поиск"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-success">Поиск</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;