import React, { useContext, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profilepage.css";
import { Card, Image, Form, Col, Row, FloatingLabel } from "react-bootstrap";
import aviadImg from "./images/aviad.png";
import { AppContext } from "../../context/AppContext";
import { updateUserData } from "../../util/api";

function ProfilePage() {
  const { user, setUser, checkIfUserSignedIn } = useContext(AppContext);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState(user.firstName);
  const [userLastName, setUserLastName] = useState(user.lastName);
  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userBio, setUserBio] = useState(user.bio);

  useEffect(() => {
    const unsub = () => {
      console.log(checkIfUserSignedIn());
    };
    unsub();
    return () => {
      unsub();
    };
  }, [setUser]);

  const handleOnClickUpdate = async (e) => {
    e.preventDefault();
    const updatedProfileInfo = {
      email: userEmail,
      password: userPassword,
      firstName: userFirstName,
      lastName: userLastName,
      phoneNumber: userPhoneNumber,
      bio: userBio,
    };
    const response = await updateUserData(user.id, updatedProfileInfo);
    if (response) {
      setUser(checkIfUserSignedIn());
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="person-info-container">
        <Card className="card-profile-container border-0 mx-5 align-items-center">
          <Image className="profile-image" src={aviadImg} roundedCircle />
          <Card.Body>
            <Card.Title>Aviad Shmuel</Card.Title>
            <Card.Text>vocaviad@gmail.com</Card.Text>
          </Card.Body>
        </Card>
      </div>
      <div className="person-info-editor-container">
        <div className="profile-page-title">
          <h3 className="display-5">Personal Profile</h3>
        </div>
        <div className="form-edit-container">
          <div className="name-container">
            <Form.Floating className="w-50 mb-2 me-2">
              <Form.Control
                id="firstName"
                type="text"
                placeholder="name@example.com"
                value={userFirstName}
                onChange={(e) => setUserFirstName(e.target.value)}
              />
              <label htmlFor="firstName">First name</label>
            </Form.Floating>
            <Form.Floating className="w-50 mb-2 ms-2">
              <Form.Control
                value={userLastName}
                id="lastName"
                type="text"
                placeholder="Password"
                onChange={(e) => setUserLastName(e.target.value)}
              />
              <label htmlFor="lastName">Last name</label>
            </Form.Floating>
          </div>
          <Form.Floating className="w-100 mb-2">
            <Form.Control
              id="userEmail"
              type="email"
              placeholder="name@example.com"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
            />
            <label htmlFor="userEmail">Email address</label>
          </Form.Floating>
          <Form.Floating className="w-100 mb-2">
            <Form.Control
              id="userPassword"
              type="password"
              placeholder="Password"
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
            <label htmlFor="userPassword">Password</label>
          </Form.Floating>
          <Form.Floating className="w-100 mb-2">
            <Form.Control
              id="phoneNumber"
              type="phone"
              placeholder="Phone number"
              value={userPhoneNumber}
              onChange={(e) => setUserPhoneNumber(e.target.value)}
            />
            <label htmlFor="phoneNumber">Phone number</label>
          </Form.Floating>
          <button onClick={(e) => handleOnClickUpdate(e)}>
            Click to update
          </button>
        </div>
      </div>
      <div className="profile-bio-container">
        <div className="bio-text-container h-50">
          <h3 className="bio-title">Profile bio</h3>

          <FloatingLabel
            className="w-100 h-100"
            controlId="floatingTextarea2"
            label="Tell us something about yourself"
          >
            <Form.Control
              className="bio-text h-100"
              as="textarea"
              placeholder="Tell us something about yourself."
              value={userBio}
              onChange={(e) => setUserBio(e.target.value)}
            />
          </FloatingLabel>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
