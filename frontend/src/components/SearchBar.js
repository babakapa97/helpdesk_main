import { Button, Container, Form, Nav, Navbar } from 'react-bootstrap';


function SearchBar() {

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