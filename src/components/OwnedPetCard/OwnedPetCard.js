import React from "react";
import { returnPet } from "../../util/api";
import PetsFeed from "../petsFeed/PetsFeed";

function OwnedPetCard(pet) {
  const handleReturnPet = async (e) => {
    e.stopPropagation();
    e.preventDefault();
    try {
      const response = await returnPet(pet.pet.id);
      if (response)
        alert(
          "We are sad that things didn't work out.. an admin will contact you soon"
        );
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
      <PetsFeed key={pet.id} pet={pet.pet} handleReturnPet={handleReturnPet} />
    </>
  );
}

export default OwnedPetCard;
