import React, { useContext } from "react";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./navbar.css";
import { AppContext } from "../../context/AppContext";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";

function NavbarTop() {
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
  };
  return (
    <Navbar collapseOnSelect fixed="top" expand="lg" bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
          <Link to="/">Pet AhTikva</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
              <Link to="/adopt">Available Pets</Link>
            </Nav.Link>
          </Nav>
          <Nav className="align-items-center">
            {!user && <Nav.Link onClick={handleLoginModal}>Login</Nav.Link>}
            {!user && <Nav.Link onClick={handleSignupModal}>Sign up</Nav.Link>}
            {user && <Nav.Link onClick={handleLogout}>Logout</Nav.Link>}
            {user && (
              <NavDropdown
                title={
                  <img
                    className="profile-image-navbar"
                    src="https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg"
                    alt="user pic"
                  />
                }
              >
                <NavDropdown.Item>
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
