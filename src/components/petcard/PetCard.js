import React, { useContext, useEffect, useState, useCallback } from "react";
import { Card } from "react-bootstrap";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { addPetToSavedPets, removePetFromSavedPets } from "../../util/api";
import { AppContext } from "../../context/AppContext";
import { useNavigate } from "react-router-dom";
import { Text, Badge, Tag } from "@chakra-ui/react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./petcard.css";

function PetCard(props) {
  const pet = props.pet;
  const navigate = useNavigate();
  const { user, setIsLoginModal } = useContext(AppContext);
  const [isAvailable, setIsAvailable] = useState(!pet.ownerID);
  const [savedPet, setSavedPet] = useState(false);
  const [error, setError] = useState("");

  const checkIfSaved = useCallback(() => {
    if (user.savedPets?.map((pet) => pet.id).includes(pet.id)) return true;
    return false;
  }, [user, pet]);

  useEffect(() => {
    const unsub = () => {
      if (user) {
        setSavedPet(checkIfSaved());
      }
    };
    unsub();
    return unsub();
  }, [user, checkIfSaved]);

  const handleAddToSaved = async (e) => {
    e.stopPropagation();
    if (user) {
      try {
        const response = await addPetToSavedPets({
          petID: pet.id,
          userWhoSavedID: user.id,
        });
        setSavedPet((pre) => !pre);
      } catch (err) {
        setError(err);
      }
    } else setIsLoginModal((pre) => !pre);
  };

  const handleRemoveSaved = async (e) => {
    e.stopPropagation();
    if (user) {
      try {
        const response = await removePetFromSavedPets({
          petID: pet.id,
          userWhoSavedID: user.id,
        });
        setSavedPet((pre) => !pre);
      } catch (err) {
        setError(err);
      }
    } else setIsLoginModal((pre) => !pre);
  };

  const handleViewMore = (e) => {
    e.preventDefault();
    navigate(`/pet/${pet.id}`);
  };

  return (
    <div className="actual-pet-card-container">
      <Card className="actual-card" onClick={handleViewMore}>
        <div className="image-container embed-responsive embed-responsive-16by9">
          <Card.Img className="image-pet-card" variant="top" src={pet.image} />
          {!isAvailable && (
            <div className="heart-container  bg-danger">
              {savedPet && (
                <AiFillHeart
                  className="icons-card"
                  onClick={handleRemoveSaved}
                />
              )}
              {!savedPet && (
                <AiOutlineHeart
                  className="icons-card"
                  onClick={handleAddToSaved}
                />
              )}
            </div>
          )}
          {isAvailable && (
            <div className="heart-container bg-success">
              {savedPet && (
                <AiFillHeart
                  className="icons-card"
                  onClick={handleRemoveSaved}
                />
              )}
              {!savedPet && (
                <AiOutlineHeart
                  className="icons-card"
                  onClick={handleAddToSaved}
                />
              )}
            </div>
          )}
        </div>
        {!isAvailable && (
          <div className="text-white bg-danger h6 d-inline-block">x</div>
        )}
        {isAvailable && (
          <div className="text-white bg-success h6 d-inline-block">x</div>
        )}
        <Card.Body className="card-content">
          <div className="bottom-card-container">
            <Text as="b" className="d-flex justify-content-center" isTruncated>
              {pet.name}
            </Text>
            <div className="d-flex justify-content-around w-75 mt-2">
              <Tag>{pet.height}CM</Tag>
              <Tag>{pet.weight}KG</Tag>
            </div>
            <Badge colorScheme="purple" className="badge-card">
              {pet.type.charAt(0).toUpperCase() + pet.type.slice(1)}
            </Badge>
          </div>
          {error && <div className="text-danger">{error}</div>}
        </Card.Body>
      </Card>
    </div>
  );
}

export default PetCard;
