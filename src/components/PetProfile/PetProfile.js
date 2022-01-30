import React, { useContext, useEffect, useState, useCallback } from "react";
import { Card, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./petprofile.css";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import {
  adoptOrFosterPet,
  addPetToSavedPets,
  removePetFromSavedPets,
  getSinglePet,
  returnPet,
} from "../../util/api";
import { AppContext } from "../../context/AppContext";
import { useParams } from "react-router-dom";
import { Heading, Image, Text, Divider, Tag } from "@chakra-ui/react";

function PetProfile() {
  const { petID } = useParams();
  const { user, setIsLoginModal } = useContext(AppContext);
  const [petData, setPetData] = useState();
  const [savedPet, setSavedPet] = useState(false);
  const [isChangingPetStatus, setIsChangingPetStatus] = useState(false);
  const [error, setError] = useState("");

  const checkIfSaved = useCallback(() => {
    if (user?.savedPets.map((pet) => pet.id).includes(petID)) return true;
    return false;
  }, [user, petData]);

  useEffect(() => {
    const unsub = async () => {
      try {
        const data = await getSinglePet(petID);
        setPetData(data);
      } catch (err) {
        console.log(err);
      }
    };
    unsub();
    return unsub();
  }, [isChangingPetStatus, petID]);

  const handleAddToSaved = async () => {
    if (user) {
      try {
        const response = await addPetToSavedPets({
          petID: petData.id,
          userWhoSavedID: user?.id,
        });
        if (response.status === 200) {
          setSavedPet((pre) => !pre);
        }
      } catch (err) {
        setError(err);
      }
    } else setIsLoginModal((pre) => !pre);
  };

  const handleRemoveSaved = async () => {
    if (user) {
      try {
        const response = await removePetFromSavedPets({
          petID: petData.id,
          userWhoSavedID: user?.id,
        });
        if (response.status === 200) {
          setSavedPet((pre) => !pre);
        }
      } catch (err) {
        setError(err);
      }
    } else setIsLoginModal((pre) => !pre);
  };

  useEffect(() => {
    const unsub = () => {
      if (user) {
        setSavedPet(checkIfSaved());
      }
    };
    unsub();
    return unsub();
  }, [user, checkIfSaved]);

  const handleAdoptPet = async (e) => {
    e.preventDefault();
    setIsChangingPetStatus((pre) => !pre);

    const data = {
      ownerID: user.id,
      adoptionStatus: "Adopted",
      petID: petData.id,
    };
    try {
      const response = await adoptOrFosterPet(data);
      setIsChangingPetStatus((pre) => !pre);
    } catch (err) {
      setError(err);
    }
  };

  const handleReturnPet = async (e) => {
    e.preventDefault();
    setIsChangingPetStatus((pre) => !pre);
    try {
      const response = await returnPet(petData.id);
      setIsChangingPetStatus((pre) => !pre);
    } catch (err) {
      setError(err);
    }
  };

  const handleFosterPet = async (e) => {
    e.preventDefault();
    setIsChangingPetStatus((pre) => !pre);

    const data = {
      ownerID: user.id,
      adoptionStatus: "Fostered",
      petID: petData.id,
    };
    try {
      const response = await adoptOrFosterPet(data);
      setIsChangingPetStatus((pre) => !pre);
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="page-wrapper">
      {petData && (
        <>
          <div className="left-container">
            <Card className="pet-card">
              <Card.Body className="d-flex flex-column">
                <div className="d-flex flex-column mb-2 justify-content-center align-items-start p-3 heading-container">
                  <Heading className="mb-2" size="2xl" isTruncated>
                    {petData.name}
                  </Heading>
                </div>
                <div className="card-body-text-container">
                  <div className="d-flex ">
                    <Text fontSize="2xl">
                      {petData.type.charAt(0).toUpperCase() +
                        petData.type.slice(1)}
                    </Text>
                    <Text fontSize="2xl" className="mx-3">
                      |
                    </Text>
                    <Text fontSize="2xl">{petData.breed}</Text>
                  </div>
                  <Divider className="mb-3 mt-1" />
                  <Tag className="p-2 me-2" fontSize="2xl">
                    Weight: {petData.weight}KG
                  </Tag>
                  <Tag className="p-2 me-2" fontSize="2xl">
                    Height: {petData.height}CM
                  </Tag>
                  <Tag className="p-2 me-2" fontSize="2xl">
                    Color: {petData.color}
                  </Tag>
                  <Tag className="p-2 me-2" fontSize="2xl">
                    Breed: {petData.breed}
                  </Tag>
                  <Tag className="p-2 me-2" fontSize="2xl">
                    Hypoallergenic:{" "}
                    {petData.hypoallergenic
                      ? `Yes, please check ${petData.name} special dietery`
                      : "No"}
                  </Tag>
                  {!!petData.hypoallergenic && (
                    <Text className="mt-2" fontSize="2xl">
                      Dietery: {petData.dietry}
                    </Text>
                  )}
                  <Text className="mt-2" fontSize="2xl">
                    Bio: {petData.bio}
                  </Text>
                </div>

                <div className="bottom-part-container">
                  {(petData.adoptionStatus === "Adoption" ||
                    petData.adoptionStatus === "Both") && (
                    <Button
                      className="button-pet"
                      variant="primary"
                      onClick={handleAdoptPet}
                    >
                      Adopt
                    </Button>
                  )}
                  <span className="heart-container-profile">
                    {savedPet && (
                      <AiFillHeart
                        className="heart-like-profile"
                        onClick={handleRemoveSaved}
                      />
                    )}
                    {!savedPet && (
                      <AiOutlineHeart
                        className="heart-like-profile"
                        onClick={handleAddToSaved}
                      />
                    )}
                  </span>
                  {(petData.adoptionStatus === "Fostering" ||
                    petData.adoptionStatus === "Both") && (
                    <Button
                      className="button-pet"
                      variant="primary"
                      onClick={handleFosterPet}
                    >
                      Foster
                    </Button>
                  )}
                  {(petData.adoptionStatus === "Adopted" ||
                    petData.adoptionStatus === "Fostered") &&
                    petData.ownerID === user?.id && (
                      <Button
                        className="button-pet"
                        variant="primary"
                        onClick={handleReturnPet}
                      >
                        Return Pet
                      </Button>
                    )}
                </div>
                {error && <div className="text-danger">{error}</div>}
              </Card.Body>
            </Card>
          </div>
          <div className="right-container">
            <Image className="image-pet-card-profile" src={petData.image} />
          </div>
        </>
      )}
    </div>
  );
}

export default PetProfile;
