import React, { useState } from "react";
import { Tr, Td } from "@chakra-ui/react";
import SingleUserFullDetails from "./SingleUserFullDetails";
import "./adminallusers.css";

function SingleUserRow(props) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user } = props;

  return (
    <>
      <Tr className="col-12">
        <Td>
          {user.firstName} {user.lastName}
        </Td>
        <Td>{user.email}</Td>
        <Td className="responsive-table">{user.dateCreated.split("T")[0]}</Td>
        <Td className="responsive-table">{user.bio}</Td>
        <Td>{user.phoneNumber}</Td>
        <Td>{user.isAdmin ? "Admin" : "User"}</Td>
        <Td>
          <button
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(true);
            }}
          >
            View more
          </button>
        </Td>
      </Tr>
      {isModalOpen && (
        <SingleUserFullDetails
          key={user.id}
          id={user.id}
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
        />
      )}
    </>
  );
}

export default SingleUserRow;
