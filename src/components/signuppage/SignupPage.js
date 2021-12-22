import React, { useContext, useState } from "react";
import { Modal, Button, Card, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { AppContext } from "../../context/AppContext";
import "./signuppage.css";
import { signUpToServer } from "../../util/api";

function SignupPage() {
  const {
    setUser,
    user,
    checkIfUserSignedIn,
    setIsSignupModal,
    isSignupModal,
    setIsLoginModal,
  } = useContext(AppContext);

  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordRepeat, setUserPasswordRepeat] = useState("");
  const [userFirstName, setUserFirstName] = useState("");
  const [userLastName, setUserLastName] = useState("");
  const [userPhoneNumber, setUserPhoneNumber] = useState("");
  const [isLoadingSignup, setIsLoadingSignup] = useState(false);
  const [isPasswordDoesntMatch, setIsPasswordDoesntMatch] = useState(false);

  const onClickLogin = (e) => {
    e.preventDefault();
    setIsLoginModal((pre) => !pre);
    setIsSignupModal((pre) => !pre);
  };

  const HandleOnSubmit = async (e) => {
    e.preventDefault();
    if (userPassword !== userPasswordRepeat) {
      setIsPasswordDoesntMatch(true);
      return;
    }
    setIsPasswordDoesntMatch(false);
    const newUser = {
      email: userEmail,
      password: userPassword,
      firstName: userFirstName,
      lastName: userLastName,
      phoneNumber: userPhoneNumber,
    };
    const response = await signUpToServer(newUser);
    setUser(checkIfUserSignedIn());
    setIsSignupModal((pre) => !pre);
  };

  return (
    <Modal show={isSignupModal} onHide={setIsSignupModal}>
      <Modal.Header closeButton>
        <Modal.Title>Sign up</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {" "}
        <Card className="w-100">
          <Card.Body>
            <h2 className="text-center mb-4">Ready To Join Our Family??</h2>
            <Form onSubmit={(e) => HandleOnSubmit(e)}>
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
              <Form.Group id="passwordRepeat">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control
                  type="password"
                  onChange={(e) => setUserPasswordRepeat(e.target.value)}
                  required
                />
              </Form.Group>
              {isPasswordDoesntMatch && (
                <h3 className="text-danger">
                  Please make sure the passwords match
                </h3>
              )}
              <Form.Group id="password">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserFirstName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Last Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setUserLastName(e.target.value)}
                  required
                />
              </Form.Group>
              <Form.Group id="password">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  type="phone"
                  onChange={(e) => setUserPhoneNumber(e.target.value)}
                  required
                />
              </Form.Group>

              <Button
                disabled={isLoadingSignup}
                className="w-100"
                type="submit"
              >
                Sign up
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <div className="w-100 text-center mt-2">
          Already have an account?{" "}
          <span className="text-primary pe-auto" onClick={onClickLogin}>
            <u id="loginButton">Sign up</u>
          </span>
        </div>
      </Modal.Footer>
    </Modal>
  );
}

export default SignupPage;
