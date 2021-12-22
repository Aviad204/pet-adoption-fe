import React from "react";
import { returnPet } from "../../util/api";

function OwnedPetCard(pet) {
  const handleReturnPet = async (e) => {
    e.preventDefault();
    try {
      const response = await returnPet(pet.pet.id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>{pet.pet.name}</div>
      <button onClick={handleReturnPet}>return pet</button>
    </div>
  );
}

export default OwnedPetCard;
