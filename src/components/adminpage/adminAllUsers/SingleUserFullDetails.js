import { Heading, Text } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { getSingleUserFull } from "../../../util/api";
import PetsFeed from "../../petsFeed/PetsFeed";
import "./adminallusers.css";
import "bootstrap/dist/css/bootstrap.min.css";

function SingleUserFullDetails(props) {
  const { id, setIsModalOpen, isModalOpen } = props;
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const unsub = async () => {
      try {
        const data = await getSingleUserFull(id);
        setUserDetails(data);
      } catch (err) {
        console.log(err);
      }
    };
    unsub();
    return () => {
      unsub();
    };
  }, [id]);

  const handleCloseModal = (e) => {
    e.preventDefault();
    setIsModalOpen((pre) => !pre);
  };

  return (
    <Modal
      dialogClassName="modal-80w"
      show={isModalOpen}
      onHide={setIsModalOpen}
    >
      <Modal.Title>
        <Heading className="heading-modal">
          {userDetails.firstName} {userDetails.lastName}'s Personal Information
        </Heading>
      </Modal.Title>
      <Modal.Body>
        <div className="body-container-modal">
          <div className="body-modal-contact">
            <Text as="u">Contact details</Text>
            <div>
              Full name : {userDetails.firstName} {userDetails.lastName}
            </div>
            <div>Email : {userDetails.email}</div>
            <div>Phone : {userDetails.phoneNumber}</div>
          </div>
          <div className="owned-pet-modal">
            <Text as="u">
              This user owns {userDetails.ownedPets?.length} pets
            </Text>
            {userDetails.ownedPets?.length > 0 &&
              userDetails.ownedPets.map((pet) => (
                <PetsFeed key={pet.id} pet={pet} />
              ))}
          </div>
        </div>
        <div className="body-bottom-modal">
          <div>Member Since : {Date(userDetails.dateCreated)}</div>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default SingleUserFullDetails;
