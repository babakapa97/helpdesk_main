import { Button, Container, Form, Nav, Navbar, Modal, Card } from 'react-bootstrap';
import CreateTicket from './CreateTicket';
import { useState } from 'react';

function SearchBar({ user_id, forceUpdate }) {
    const [showModal, setShowModal] = useState(false);
  
    const handleClose = () => setShowModal(false);
    const handleShow = () => setShowModal(true);
  
  
    return (
      <Navbar bg="white" expand="lg" className='search-bar'>
        <Container fluid>
          <Button className="create_button" variant="primary" onClick={handleShow}>
            Создать заявку
          </Button>
          <Modal show={showModal} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Создать заявку</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <CreateTicket user_id={user_id} forceUpdate={forceUpdate} />
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Закрыть
              </Button>
            </Modal.Footer>
          </Modal>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-10 my-lg-2"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                    </Nav>
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

export default SearchBar;