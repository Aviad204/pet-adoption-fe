import React, { useState } from "react";
import {
  Radio,
  RadioGroup,
  Stack,
  Checkbox,
  CheckboxGroup,
  HStack,
  Heading,
  Text,
} from "@chakra-ui/react";
import { Form, Button } from "react-bootstrap";
import "../adminpage.css";
import { addPet } from "../../../util/api";
import DropzoneComp from "../Dropzone";

function AddPetAdmin() {
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
  

  const checkAdoptionStatus = () => {
    if (adoptionStatus.length === 2) return "Both";
    if (adoptionStatus[0] === "Adoption") return "Adoption";
    if (adoptionStatus[0] === "Fostering") return "Fostering";
  };

  async function handleOnSubmitAddPet(e) {
    e.preventDefault();
    let petToAdd = new FormData();
    petToAdd.append("adoptionStatus", checkAdoptionStatus());
    petToAdd.append("type", petType);
    petToAdd.append("name", petName);
    petToAdd.append("breed", petBreed);
    petToAdd.append("color", petColor);
    petToAdd.append("height", petHeight);
    petToAdd.append("weight", petWeight);
    petToAdd.append("dietery", petDietery);
    petToAdd.append("bio", petBio);
    petToAdd.append("hypoallergenic", isHypoallergenic);
    petToAdd.append("image", petImage, petImage.name);
    try {
      const response = await addPet(petToAdd);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <div className="dashboards-for-add-pet">
      <form className="add-pet-form p-5 w-75 d-flex flex-column justify-content-center align-items-center">
        <Heading className="mb-3">Add Pet Form</Heading>

        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet name"
            onChange={(e) => setPetName(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Name</label>
        </Form.Floating>
        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Pet Height"
            onChange={(e) => setPetHeight(Number(e.target.value))}
          />
          <label htmlFor="floatingInputCustom">Pet Height</label>
        </Form.Floating>
        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Pet Weight"
            onChange={(e) => setPetWeight(Number(e.target.value))}
          />
          <label htmlFor="floatingInputCustom">Pet Weight</label>
        </Form.Floating>
        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet color"
            onChange={(e) => setPetColor(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Color</label>
        </Form.Floating>
        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet bio"
            onChange={(e) => setPetBio(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Bio</label>
        </Form.Floating>
        <Form.Floating className="w-75 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet Breed"
            onChange={(e) => setPetBreed(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Breed</label>
        </Form.Floating>
        <div className="d-flex  flex-column mt-3 justify-content-center align-items-center">
          <label htmlFor="floatingInputCustom">Hypoallergenic?</label>
          <Form.Floating className="w-100 mb-2 ">
            <RadioGroup value={isHypoallergenic}>
              <Stack direction="row">
                <Radio value={true} onChange={() => setIsHypoallergenic(true)}>
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
        </div>
        {isHypoallergenic && (
          <Form.Floating className="w-75 mb-2 me-2">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="Pet Dietery"
              onChange={(e) => setPetDietery(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Pet Dietery</label>
          </Form.Floating>
        )}

        <div className="d-flex  flex-column mt-3 justify-content-center align-items-center">
          <Text as="u">Pet Type</Text>
          <Form.Floating className="w-100 mb-2 ">
            <RadioGroup onChange={setPetType} value={petType}>
              <Stack direction="row">
                <Radio value="dog">Dog</Radio>
                <Radio value="cat">Cat</Radio>
                <Radio value="parrot">Parrot</Radio>
                <Radio value="rabbit">Rabbit</Radio>
              </Stack>
            </RadioGroup>
          </Form.Floating>
        </div>

        <div className="d-flex  flex-column mb-4 mt-3 justify-content-center align-items-center">
          <Text as="u">Adoption Status</Text>
          <Form.Floating className="w-100 mb-2 ">
            <CheckboxGroup colorScheme="green" onChange={setAdoptionStatus}>
              <HStack>
                <Checkbox value="Adoption">Adoption</Checkbox>
                <Checkbox value="Fostering">Fostering</Checkbox>
              </HStack>
            </CheckboxGroup>
          </Form.Floating>
        </div>

        <div className="dropzone-container w-75">
          <DropzoneComp
            setIsUploading={setIsUploading}
            setPetImage={setPetImage}
          />
        </div>
        {isUploading && <div>Uploading...</div>}
        <Button disabled={isUploading} onClick={handleOnSubmitAddPet}>
          Submit
        </Button>
      </form>
    </div>
  );
}

export default AddPetAdmin;
