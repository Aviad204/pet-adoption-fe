import React, { useEffect, useState } from "react";
import { Radio, RadioGroup, Stack } from "@chakra-ui/react";
import { Form, Button, Modal } from "react-bootstrap";
import DropzoneComp from "../Dropzone";
import { editPet, getSinglePet } from "../../../util/api";
import "../adminpage.css";

function EditPetAdmin(props) {
  const { petID, isModalOpen, setIsModalOpen } = props;
  const [petData, setPetData] = useState();
  const [petNameEdit, setPetNameEdit] = useState("");
  const [petHeightEdit, setPetHeightEdit] = useState("");
  const [petWeightEdit, setPetWeightEdit] = useState("");
  const [petColorEdit, setPetColorEdit] = useState("");
  const [petBioEdit, setPetBioEdit] = useState("");
  const [petDieteryEdit, setPetDieteryEdit] = useState("");
  const [petBreedEdit, setPetBreedEdit] = useState("");
  const [isHypoallergenicEdit, setIsHypoallergenicEdit] = useState();
  const [isUploadingEdit, setIsUploadingEdit] = useState(false);
  const [petImageEdit, setPetImageEdit] = useState("");
  const [notification, setNotification] = useState("");
  const imagePlaceHolder =
    "https://cdn-icons-png.flaticon.com/512/1642/1642989.png";

  useEffect(() => {
    const unsub = async () => {
      try {
        const data = await getSinglePet(petID);
        setPetData(data);
        populatingStates(data);
      } catch (err) {
        console.log(err);
      }
    };
    unsub();
    return unsub();
  }, [petID]);

  const populatingStates = (data) => {
    setPetNameEdit(data.name);
    setPetHeightEdit(data.height);
    setPetWeightEdit(data.weight);
    setPetColorEdit(data.color);
    setPetBioEdit(data.bio);
    setPetDieteryEdit(data.dietery);
    setPetBreedEdit(data.breed);
    setIsHypoallergenicEdit(data.hypoallergenic ? true : false);
    setPetImageEdit(data.image);
  };

  const handleOnSubmitEditPet = async (e) => {
    e.preventDefault();
    let editedPetData = new FormData();
    editedPetData.append("name", petNameEdit || "No name");
    editedPetData.append("breed", petBreedEdit || "Unknown breed");
    editedPetData.append("color", petColorEdit || "Unknown");
    editedPetData.append("height", petHeightEdit || 1);
    editedPetData.append("weight", petWeightEdit || 1);
    editedPetData.append("dietery", petDieteryEdit || "Nothing specific");
    editedPetData.append("bio", petBioEdit || "Unknown background");
    editedPetData.append("hypoallergenic", isHypoallergenicEdit);
    if (petImageEdit) {
      editedPetData.append("image", petImageEdit, petImageEdit.name);
    }
    editedPetData.append("petID", petID);
    try {
      const response = await editPet(editedPetData, petID);
      if (response.status === 200) {
        setNotification("Changes were made");
      }
    } catch (err) {
      setNotification(err);
    }
  };

  return (
    <Modal
      backdrop="static"
      keyboard={false}
      show={isModalOpen}
      onHide={setIsModalOpen}
    >
      <Modal.Header closeButton>
        <Modal.Title>Edit {petData?.name} Information </Modal.Title>
      </Modal.Header>
      <Modal.Body className="d-flex flex-column align-items-center justify-content-center w-100">
        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet name"
            value={petNameEdit}
            onChange={(e) => setPetNameEdit(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Name</label>
        </Form.Floating>

        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Pet Height"
            value={petHeightEdit}
            onChange={(e) => setPetHeightEdit(Number(e.target.value))}
          />
          <label htmlFor="floatingInputCustom">Pet Height</label>
        </Form.Floating>
        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="number"
            placeholder="Pet Weight"
            value={petWeightEdit}
            onChange={(e) => setPetWeightEdit(Number(e.target.value))}
          />
          <label htmlFor="floatingInputCustom">Pet Weight</label>
        </Form.Floating>
        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet color"
            value={petColorEdit}
            onChange={(e) => setPetColorEdit(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Color</label>
        </Form.Floating>
        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet bio"
            value={petBioEdit}
            onChange={(e) => setPetBioEdit(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Bio</label>
        </Form.Floating>
        <label htmlFor="floatingInputCustom">Hypoallergenic?</label>
        <Form.Floating className="mb-2 me-2">
          <RadioGroup value={isHypoallergenicEdit}>
            <Stack direction="row">
              <Radio
                value={true}
                onChange={() => setIsHypoallergenicEdit(true)}
              >
                Yes
              </Radio>
              <Radio
                value={false}
                onChange={() => setIsHypoallergenicEdit(false)}
              >
                No
              </Radio>
            </Stack>
          </RadioGroup>
        </Form.Floating>
        {!!isHypoallergenicEdit && (
          <Form.Floating className="w-100 mb-2 me-2">
            <Form.Control
              id="floatingInputCustom"
              type="text"
              placeholder="Pet Dietery"
              value={petDieteryEdit}
              onChange={(e) => setPetDieteryEdit(e.target.value)}
            />
            <label htmlFor="floatingInputCustom">Pet Dietery</label>
          </Form.Floating>
        )}
        <Form.Floating className="w-100 mb-2 me-2">
          <Form.Control
            id="floatingInputCustom"
            type="text"
            placeholder="Pet Breed"
            value={petBreedEdit}
            onChange={(e) => setPetBreedEdit(e.target.value)}
          />
          <label htmlFor="floatingInputCustom">Pet Breed</label>
        </Form.Floating>
        <div className="dropzone-container">
          <DropzoneComp
            setIsUploading={setIsUploadingEdit}
            setPetImage={setPetImageEdit}
          />
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button disabled={isUploadingEdit} onClick={handleOnSubmitEditPet}>
          Submit
        </Button>
        {notification && <div>{notification}</div>}
        {isUploadingEdit && <div>Uploading...</div>}
      </Modal.Footer>
    </Modal>
  );
}

export default EditPetAdmin;
