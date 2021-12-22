import React, { useContext, useState } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./petcard.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { adoptOrFosterPet } from "../../util/api";
import { AppContext } from "../../context/AppContext";

function PetCard(pet) {
  const [isFavorite, setIsisFavorite] = useState(false);
  const [isAvailable, setIsAvailable] = useState(!pet.pet.ownerID);
  const { user } = useContext(AppContext);

  const handleAdoptPet = async (e) => {
    e.preventDefault();
    const data = {
      ownerID: user.id,
      adoptionStatus: "Adopted",
      petID: pet.pet.id,
    };
    const response = await adoptOrFosterPet(data);
  };

  const handleFosterPet = async (e) => {
    e.preventDefault();
    const data = {
      ownerID: user.id,
      adoptionStatus: "Fostered",
      petID: pet.pet.id,
    };
    const response = await adoptOrFosterPet(data);
  };

  return (
    <div className="actual-pet-card-container">
      <Card>
        <Card.Img variant="top" src={pet.pet.image} />
        <Card.Body>
          <Card.Title>{pet.pet.name}</Card.Title>
          <Card.Text>{pet.pet.type}</Card.Text>
          <Card.Text>Weight: {pet.pet.weight}KG</Card.Text>
          <Card.Text>Height: {pet.pet.height}CM</Card.Text>
          {!isAvailable && <span>NOT AVAILABLE</span>}
          {isAvailable && (
            <>
              <Button variant="primary" onClick={handleAdoptPet}>
                Adopt
              </Button>
              <div className="heart-container">
                {isFavorite ? (
                  <AiFillHeart onClick={() => setIsisFavorite((pre) => !pre)} />
                ) : (
                  <AiOutlineHeart
                    onClick={() => setIsisFavorite((pre) => !pre)}
                  />
                )}
              </div>
              <Button variant="primary" onClick={handleFosterPet}>
                Foster
              </Button>{" "}
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
