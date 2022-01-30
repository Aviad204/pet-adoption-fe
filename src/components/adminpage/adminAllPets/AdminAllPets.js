import React, { useEffect, useState } from "react";
import { getAllPets } from "../../../util/api";
import SinglePetRow from "./SinglePetRow";
import { Table, Thead, Tbody, Tr, Th, TableCaption } from "@chakra-ui/react";
import "./adminallpets.css";

function AdminAllPets() {
  const [allPetsData, setAllPetsData] = useState([]);

  useEffect(() => {
    const unsub = async () => {
      try {
        const data = await getAllPets();
        setAllPetsData(data);
      } catch (err) {
        console.log(err);
      }
    };
    unsub();
    return unsub();
  }, []);
  return (
    <div className="all-pets-table">
      <Table size="sm" className="actual-pets-table" variant="striped">
        <TableCaption className="responsive-table-caption">
          In order to view all the fields, please make sure you are viewing it
          on your desktop.
        </TableCaption>
        <Thead>
          <Tr>
            <Th>Type</Th>
            <Th>Name</Th>
            <Th className="responsive-table">Color</Th>
            <Th className="responsive-table">Breed</Th>
            <Th className="responsive-table">Bio</Th>
            <Th className="responsive-table">Height</Th>
            <Th className="responsive-table">Weight</Th>
            <Th className="responsive-table">Hypoallergenic</Th>
            <Th className="responsive-table">Dietery</Th>
            <Th className="responsive-table">Image</Th>
            <Th>Owner Email</Th>
            <Th>Status</Th>
            <Th>Edit</Th>
          </Tr>
        </Thead>
        <Tbody>
          {allPetsData.map((pet) => (
            <SinglePetRow key={pet.id} pet={pet} />
          ))}
        </Tbody>
      </Table>
    </div>
  );
}

export default AdminAllPets;
