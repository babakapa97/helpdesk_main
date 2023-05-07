import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Breadcrumb } from 'react-bootstrap';
import Stack from 'react-bootstrap/Stack';

function Navigation() {
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
          <Button className="create_button" variant="success">Создать заявку</Button>{' '}
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