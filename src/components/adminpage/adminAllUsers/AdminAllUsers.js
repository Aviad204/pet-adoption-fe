import React, { useEffect, useState } from "react";
import { getAllUsers } from "../../../util/api";
import { Table, Thead, Tbody, Tr, Th, TableCaption } from "@chakra-ui/react";
import "./adminallusers.css";
import SingleUserRow from "./SingleUserRow";

function AdminAllPets() {
  const [allUsersData, setAllUsersData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const unsub = async () => {
      try {
        const data = await getAllUsers();
        if (data) setAllUsersData(data);
        else setError("Couldn't fetch the data, please try again later");
      } catch (err) {
        setError(err);
      }
    };
    unsub();
    return unsub();
  }, []);

  return (
    <>
      {error && <div className="text-danger">{error}</div>}
      <Table size="sm" variant="striped">
        <TableCaption className="responsive-table-caption">
          In order to view all the fields, please make sure you are viewing it
          on your desktop.
        </TableCaption>

        <Thead>
          <Tr>
            <Th>Full Name</Th>
            <Th>Email</Th>
            <Th className="responsive-table">Member Since</Th>
            <Th className="responsive-table">Bio</Th>
            <Th>Phone</Th>
            <Th>User Type</Th>
            <Th>View More</Th>
          </Tr>
        </Thead>

        <Tbody>
          {allUsersData.map((user) => (
            <SingleUserRow key={user.id} user={user} />
          ))}
        </Tbody>
      </Table>
    </>
  );
}

export default AdminAllPets;
