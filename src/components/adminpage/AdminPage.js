import React, { useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import AdminAllPets from "./adminAllPets/AdminAllPets";
import AdminAllUsers from "./adminAllUsers/AdminAllUsers";
import AddPetAdmin from "./adminAddPet/AddPetAdmin";
import "./adminpage.css";

function AdminPage() {
  const [whichPageToShow, setWhichPageToShow] = useState("addPet");

  return (
    <div className="admin-page-wrapper">
      <div className="radio-group">
        <RadioGroup onChange={setWhichPageToShow} value={whichPageToShow}>
          <Stack direction="row">
            <Radio value="addPet">Add Pet</Radio>
            <Radio value="viewPets">View All Pets</Radio>
            <Radio value="viewUsers">View All Users</Radio>
          </Stack>
        </RadioGroup>
      </div>
      <div className="admin-pages-container">
        {whichPageToShow === "addPet" && <AddPetAdmin />}
        {whichPageToShow === "viewPets" && (
          <div className="dashboards-for-admin w-100">
            <AdminAllPets />
          </div>
        )}
        {whichPageToShow === "viewUsers" && (
          <div className="dashboards-for-admin">
            <AdminAllUsers />
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
