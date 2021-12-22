import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { getUsersAllPets } from "../../util/api";
import OwnedPetCard from "../OwnedPetCard/OwnedPetCard";
import "./userpets.css";

function UserPets() {
  const [userPets, setUserPets] = useState([]);
  const { user } = useContext(AppContext);
  useEffect(() => {
    const unsub = async () => {
      const petsData = await getUsersAllPets(user.id);
      setUserPets(petsData);
    };
    unsub();
    return () => {
      unsub();
    };
  }, []);
  return (
    <div className="page-wrapper">
      {userPets.map((pet) => (
        <OwnedPetCard pet={pet} />
      ))}
    </div>
  );
}

export default UserPets;
