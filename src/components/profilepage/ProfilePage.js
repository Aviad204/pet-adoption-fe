import React, { useContext, useState, useEffect } from "react";
import { Form, FloatingLabel, Button } from "react-bootstrap";
import { AppContext } from "../../context/AppContext";
import { getUsersAllPets, updateUserData } from "../../util/api";
import PetsFeed from "../petsFeed/PetsFeed";
import { Heading } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./profilepage.css";

function ProfilePage() {
  const { user, setUser, checkIfUserSignedIn } = useContext(AppContext);
  const [userEmail, setUserEmail] = useState(user.email);
  const [userPassword, setUserPassword] = useState("");
  const [userFirstName, setUserFirstName] = useState(user.firstName);
  const [userLastName, setUserLastName] = useState(user.lastName);
  const [userPhoneNumber, setUserPhoneNumber] = useState(user.phoneNumber);
  const [userBio, setUserBio] = useState(user.bio);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState(" ");

  const [userPets, setUserPets] = useState([]);
  useEffect(() => {
    const unsub = async () => {
      const petsData = await getUsersAllPets(user?.id);
      setUserPets(petsData);
    };
    unsub();
    return () => {
      unsub();
    };
  }, [user]);

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
    try {
      const response = await updateUserData(user.id, updatedProfileInfo);
      if (response.status === 200) {
        setUser(checkIfUserSignedIn());
        setIsSuccess((pre) => !pre);
        setTimeout(() => setIsSuccess((pre) => !pre), 5000);
      } else if (response.status === 422) {
        setErrorMessage("Email is already in use");
        setIsError((pre) => !pre);
        setTimeout(() => setIsError((pre) => !pre), 5000);
      } else {
        setErrorMessage(
          "Unhandled request, please check your input and try again."
        );
        setIsError((pre) => !pre);
        setTimeout(() => setIsError((pre) => !pre), 5000);
      }
    } catch (err) {
      setErrorMessage(err);
      setIsError((pre) => !pre);
      setTimeout(() => setIsError((pre) => !pre), 5000);
    }
  };

  return (
    <div className="profile-page-wrapper">
      <div className="person-pet-container">
        <Heading>My pets</Heading>
        {userPets.length > 0 &&
          userPets.map((pet) => <PetsFeed key={pet.id} pet={pet} />)}
        {userPets.length === 0 && (
          <div>You don't own any pet, would you like to adopt one?</div>
        )}
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
          <Button onClick={(e) => handleOnClickUpdate(e)}>
            Click to update
          </Button>
          {isSuccess && <div className="text-success">Profile Updated!</div>}
          {isError && <div className="text-danger">{errorMessage}</div>}
        </div>
      </div>
      <div className="profile-bio-container">
        <div className="bio-text-container h-50">
          <h3 className="bio-title">Profile bio</h3>

          <FloatingLabel
            className="w-100 h-100"
            controlId="floatingTextarea2"
            label="Describe yourself"
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
