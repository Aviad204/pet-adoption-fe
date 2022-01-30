import { Heading } from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getUsersAllPets } from "../../util/api";
import OwnedPetCard from "../OwnedPetCard/OwnedPetCard";
import PetCard from "../petcard/PetCard";
import { Link } from "react-router-dom";
import "./userpets.css";

function UserPets() {
  const [userPets, setUserPets] = useState([]);
  const { user } = useContext(AppContext);
  
  useEffect(() => {
    const unsub = async () => {
      const petsData = await getUsersAllPets(user?.id);
      setUserPets(petsData);
    };
    unsub();
    return unsub();
  }, [user]);

  return (
    <>
      {user && (
        <div className="page-wrapper">
          {userPets.length > 0 && (
            <div className="left-container">
              <Heading>Owned Pets</Heading>
              <div className="owned-pet-container">
                {userPets.map((pet) => (
                  <OwnedPetCard key={pet.id} pet={pet} />
                ))}
              </div>
            </div>
          )}
          {userPets.length === 0 && (
            <div className="left-container">
              <Heading>Owned Pets</Heading>
              <div className="owned-pet-container mb-3 mt-5">
                <div className="text-danger">
                  {user.firstName}, seems like you don't own any pets yet
                </div>
                <Link to="/adopt">Click here to adopt a friend!</Link>
              </div>
            </div>
          )}
          {user?.savedPets.length > 0 && (
            <div className="right-container">
              <div className="saved-pets-header d-flex justify-content-center w-100">
                <Heading>Saved Pets</Heading>
              </div>
              <div className="saved-pet-container ">
                {user.savedPets.map((pet) => (
                  <PetCard key={pet.id} className="single-pet-card" pet={pet} />
                ))}
              </div>
            </div>
          )}
          {user?.savedPets.length === 0 && (
            <div className="right-container">
              <div className="saved-pets-header d-flex justify-content-center w-100">
                <Heading>Saved Pets</Heading>
              </div>
              <div className="saved-pet-container ">
                <Link className="mt-5 mb-3" to="/adopt">
                  Click here to like your first pet!
                </Link>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default UserPets;
