import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";
import { Form, Button } from "react-bootstrap";
import "./adminpage.css";
import { addPet } from "../../util/api";
import DropzoneComp from "./Dropzone";

function AdminPage() {
  const [whichPageToShow, setWhichPageToShow] = useState("addPet");
  const [petType, setPetType] = useState("");
  const [petName, setPetName] = useState("");
  const [petHeight, setPetHeight] = useState("");
  const [petWeight, setPetWeight] = useState("");
  const [petColor, setPetColor] = useState("");
  const [petBio, setPetBio] = useState("");
  const [petDietery, setPetDietery] = useState("");
  const [petBreed, setPetBreed] = useState("");
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [isHypoallergenic, setIsHypoallergenic] = useState();
  const [isUploading, setIsUploading] = useState(false);
  const [petImage, setPetImage] = useState("");


  async function handleOnSubmitAddPet(e) {
    e.preventDefault();
    let petToAdd = new FormData();
    petToAdd.append("status", "Adoption");
    petToAdd.append("type", petType);
    petToAdd.append("name", petName);
    petToAdd.append("breed", petBreed);
    petToAdd.append("color", petColor);
    petToAdd.append("height", petHeight);
    petToAdd.append("weight", petWeight);
    petToAdd.append("dietery", petDietery);
    petToAdd.append("bio", petBio);
    petToAdd.append("hypoallergnic", isHypoallergenic);
    petToAdd.append("image", petImage, petImage.name);
    try {
      const response = await addPet(petToAdd);
    } catch (err) {
      console.log(err);
    }
  }

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
        {whichPageToShow === "addPet" && (
          <div className="dashboards-for-admin">
            <form className="add-pet-form p-5">
              <label htmlFor="floatingInputCustom">Pet Type</label>
              <Form.Floating className="w-50 mb-2 me-2">
                <RadioGroup onChange={setPetType} value={petType}>
                  <Stack direction="row">
                    <Radio value="dog">Dog</Radio>
                    <Radio value="cat">Cat</Radio>
                    <Radio value="parrot">Parrot</Radio>
                    <Radio value="rabbit">Rabbit</Radio>
                  </Stack>
                </RadioGroup>
              </Form.Floating>
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="Pet name"
                  onChange={(e) => setPetName(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Pet Name</label>
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Adoption Status</label>
              <Form.Floating className="w-50 mb-2 me-2">
                <CheckboxGroup colorScheme="green" onChange={setAdoptionStatus}>
                  <HStack>
                    <Checkbox value="Adoption">Adoption</Checkbox>
                    <Checkbox value="Fostering">Fostering</Checkbox>
                  </HStack>
                </CheckboxGroup>
              </Form.Floating>
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="number"
                  placeholder="Pet Height"
                  onChange={(e) => setPetHeight(Number(e.target.value))}
                />
                <label htmlFor="floatingInputCustom">Pet Height</label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="number"
                  placeholder="Pet Weight"
                  onChange={(e) => setPetWeight(Number(e.target.value))}
                />
                <label htmlFor="floatingInputCustom">Pet Weight</label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="Pet color"
                  onChange={(e) => setPetColor(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Pet Color</label>
              </Form.Floating>
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="Pet bio"
                  onChange={(e) => setPetBio(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Pet Bio</label>
              </Form.Floating>
              <label htmlFor="floatingInputCustom">Hypoallergenic?</label>
              <Form.Floating className="w-50 mb-2 me-2">
                <RadioGroup value={isHypoallergenic}>
                  <Stack direction="row">
                    <Radio
                      value={true}
                      onChange={() => setIsHypoallergenic(true)}
                    >
                      Yes
                    </Radio>
                    <Radio
                      value={false}
                      onChange={() => setIsHypoallergenic(false)}
                    >
                      No
                    </Radio>
                  </Stack>
                </RadioGroup>
              </Form.Floating>
              {isHypoallergenic && (
                <Form.Floating className="w-50 mb-2 me-2">
                  <Form.Control
                    id="floatingInputCustom"
                    type="text"
                    placeholder="Pet Dietery"
                    onChange={(e) => setPetDietery(e.target.value)}
                  />
                  <label htmlFor="floatingInputCustom">Pet Dietery</label>
                </Form.Floating>
              )}
              <Form.Floating className="w-50 mb-2 me-2">
                <Form.Control
                  id="floatingInputCustom"
                  type="text"
                  placeholder="Pet Breed"
                  onChange={(e) => setPetBreed(e.target.value)}
                />
                <label htmlFor="floatingInputCustom">Pet Breed</label>
              </Form.Floating>
              <DropzoneComp
                setIsUploading={setIsUploading}
                setPetImage={setPetImage}
              />
              {isUploading && <div>Uploading...</div>}
              <Button disabled={isUploading} onClick={handleOnSubmitAddPet}>
                Submit
              </Button>
            </form>
          </div>
        )}
        {whichPageToShow === "viewPets" && (
          <div className="dashboards-for-admin">
            <form
              method="POST"
              action="http://localhost:5500/upload"
              encType="multipart/form-data"
            >
              <input type="file" name="image" />
              <button type="submit">sdfsdf</button>
            </form>
          </div>
        )}
        {whichPageToShow === "viewUsers" && (
          <div className="dashboards-for-admin">This is view users</div>
        )}
      </div>
    </div>
  );
}

export default AdminPage;
