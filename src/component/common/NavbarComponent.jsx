import { useContext } from "react";
import {
  Badge,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Spinner,
} from "react-bootstrap";

import AuthContext from "../../context/AuthContext";

export default function NavbarComponent() {
  const { onLogout, loading } = useContext(AuthContext);

  return (
    <Navbar bg="primary" data-bs-theme="dark" className="fixed-top">
      <Container>
        <Navbar.Brand href="#home">
          {loading && (
            <>
              <Spinner animation="border" size="sm" />{" "}
            </>
          )}
          Optika
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#/">Product</Nav.Link>
            <Nav.Link href="#customers">Customer</Nav.Link>
            <Nav.Link href="#order">Order</Nav.Link>
            <Nav.Link href="#link">Incoming Goods</Nav.Link>
            <Nav.Link href="#link">Stock Movement</Nav.Link>

            <NavDropdown title="Settings">
              <NavDropdown.Item>About Software</NavDropdown.Item>
              <NavDropdown.Item>License</NavDropdown.Item>
              <NavDropdown.Item>Contact Developer</NavDropdown.Item>
              <NavDropdown.Item>Alasware Foundation</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item>
                Companion App <Badge bg="success">soon</Badge>
              </NavDropdown.Item>
              <NavDropdown.Item onClick={onLogout}>Log out</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
