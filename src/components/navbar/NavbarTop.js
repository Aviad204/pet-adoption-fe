import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { Link, useNavigate } from "react-router-dom";

function NavbarTop() {
  const navigate = useNavigate();

  const {
    user,
    setUser,
    setIsLoginModal,
    setIsSignupModal,
    checkIfUserSignedIn,
  } = useContext(AppContext);

  const handleLoginModal = (e) => {
    e.preventDefault();
    setIsLoginModal((pre) => !pre);
  };

  const handleSignupModal = (e) => {
    e.preventDefault();
    setIsSignupModal((pre) => !pre);
  };

  const handleLogout = (e) => {
    e.preventDefault();
    Cookies.remove("token");
    setUser(checkIfUserSignedIn());
    navigate("/");
  };

  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" className="main-navbar">
      <Container fluid className="navbar-container">
        <Navbar.Brand>
          <Link to="/">
            <span className="nav-text">Pet AhTikva</span>
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/adopt">
                <span className="nav-text">Available Pets</span>
              </Link>
            </Nav.Link>
          </Nav>
          <Nav className="nav-links align-items-center">
            {!user && (
              <Nav.Link onClick={handleLoginModal}>
                <span className="nav-text">Login</span>
              </Nav.Link>
            )}
            {!user && (
              <Nav.Link onClick={handleSignupModal}>
                <span className="nav-text">Sign up</span>
              </Nav.Link>
            )}
            {user && (
              <Nav.Link onClick={handleLogout}>
                <span className="nav-text">Logout</span>
              </Nav.Link>
            )}
            {user && (
              <NavDropdown
                title={<span className="nav-text">{user.firstName}</span>}
              >
                <NavDropdown.Item className="dropdown-nav">
                  <Link to="/mypets">My pets</Link>
                </NavDropdown.Item>
                {!!user.isAdmin && (
                  <NavDropdown.Item>
                    <Link to="/admin">Admin panel</Link>
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item>
                  <Link to="/profile">Profile</Link>
                </NavDropdown.Item>
              </NavDropdown>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarTop;
