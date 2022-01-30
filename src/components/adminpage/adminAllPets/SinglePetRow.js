import React, { useEffect, useState } from "react";
import { Tr, Td, Image } from "@chakra-ui/react";
import { getSingleUser } from "../../../util/api";
import "./adminallpets.css";
import EditPetAdmin from "./EditPetAdmin";

function SinglePetRow(props) {
  const [ownerEmail, setOwnerEmail] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { pet } = props;

  useEffect(() => {
    const unsub = async () => {
      try {
        const ownerData = await getSingleUser(pet.ownerID);
        if (ownerData) setOwnerEmail(ownerData.email);
        else setOwnerEmail("No owner");
      } catch (err) {
        console.log(err);
      }
    };
    unsub();
    return unsub();
  }, [pet]);

  return (
    <>
      <Tr>
        <Td>{pet.type}</Td>
        <Td>{pet.name}</Td>
        <Td className="responsive-table">{pet.color}</Td>
        <Td className="responsive-table">{pet.breed}</Td>
        <Td className="responsive-table">{pet.bio}</Td>
        <Td className="responsive-table">{pet.height}</Td>
        <Td className="responsive-table">{pet.weight}</Td>
        <Td className="responsive-table">{pet.hypoallergenic}</Td>
        <Td className="responsive-table">{pet.dietery}</Td>
        <Td className="responsive-table">
          <Image className="row-pet-image" src={pet.image} alt="pet's image" />
        </Td>
        {ownerEmail && <Td>{ownerEmail}</Td>}
        <Td>{pet.adoptionStatus}</Td>
        <Td>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            Edit
          </button>
        </Td>
      </Tr>
      {isModalOpen && (
        <EditPetAdmin
          petID={pet.id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default SinglePetRow;
