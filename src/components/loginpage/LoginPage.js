import React, { useContext, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../context/AppContext";
import "./loginpage.css";
import { loginToServer } from "../../util/api";

function LoginPage() {
  const {
    setUser,
    setIsLoginModal,
    isLoginModal,
    setIsSignupModal,
    checkIfUserSignedIn,
  } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const onClickSignup = (e) => {
    e.preventDefault();
    setIsLoginModal((pre) => !pre);
    setIsSignupModal((pre) => !pre);
  };

  const handleOnSubmitLogin = async (e) => {
    e.preventDefault();
    const userDetails = {
      email: userEmail,
      password: userPassword,
    };
    
    try {
      const response = await loginToServer(userDetails);
      if (response) {
        setIsLoginModal((pre) => !pre);
        setUser(checkIfUserSignedIn());
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Modal show={isLoginModal} onHide={setIsLoginModal}>
      <Modal.Header closeButton>
        <Modal.Title>Log in</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Welcome Back Pet-Lover!</h2>
            <Form onSubmit={(e) => handleOnSubmitLogin(e)}>
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setUserEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setUserPassword(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                disabled={() => console.log("placeholder for function")}
                className="w-100"
                type="submit"
              >
                Log in
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="w-100 text-center mt-2">
          Don't have an account?{" "}
          <span className="text-primary pe-auto" onClick={onClickSignup}>
            <u id="signUpButton">Sign up</u>
          </span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default LoginPage;
