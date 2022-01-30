import React, { useState, useEffect } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useToast,
  FormControl,
  FormLabel,
  Switch,
  Divider,
  Input,
  Checkbox,
  CheckboxGroup,
  HStack,
} from "@chakra-ui/react";
import PetCard from "../petcard/PetCard";
import { getAllPets } from "../../util/api";
import { GiParrotHead, GiRabbit, GiSittingDog, GiCat } from "react-icons/gi";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchpage.css";

function SearchPage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const toast = useToast();
  const [isDog, setIsDog] = useState(true);
  const [isCat, setIsCat] = useState(true);
  const [isRabbit, setIsRabbit] = useState(true);
  const [isParrot, setIsParrot] = useState(true);
  const [heightValues, setHeightValues] = useState([0, 200]);
  const [weightValues, setWeightValues] = useState([0, 80]);
  const [petsData, setPetsData] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);
  const [petNameToSearch, setPetNameToSearch] = useState("");
  const [isUnavailable, setIsUnavailable] = useState(true);
  const [adoptionStatus, setAdoptionStatus] = useState("");
  const [error, setError] = useState("");

  const checkAdoptionStatus = () => {
    if (adoptionStatus.length === 2) return "%";
    if (adoptionStatus[0] === "Adoption") return "Adoption";
    if (adoptionStatus[0] === "Fostering") return "Fostering";
    else return "%";
  };

  useEffect(() => {
    const unsub = async () => {
      const data = await getAllPets();
      setPetsData(data);
    };
    unsub();
    return unsub();
  }, []);

  const textGenerator = (petsToSearch) => {
    let fullText = "Looking for some awesome ";
    const petsArray = [];
    for (const [key, value] of Object.entries(petsToSearch.type)) {
      if (value) {
        petsArray.push(key + "s");
      }
    }
    if (petsArray.length === 1) {
      return (fullText += petsArray[0] + "!");
    } else {
      for (let i = 0; i < petsArray.length; i++) {
        if (i + 1 === petsArray.length)
          return fullText + "and " + petsArray[i] + "!";

        fullText += petsArray[i] + ", ";
      }
    }
    return fullText;
  };

  const handleAdvanceSettings = (e) => {
    setIsAdvanced((pre) => !pre);
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const petsToSearch = {
      type: {
        dog: isDog,
        cat: isCat,
        parrot: isParrot,
        rabbit: isRabbit,
      },
    };

    const petsArrayForSearch = [];
    for (const [key, value] of Object.entries(petsToSearch.type)) {
      if (value) {
        petsArrayForSearch.push(key);
      }
    }

    let url = `?minHeight=${heightValues[0]}&maxHeight=${
      heightValues[1]
    }&minWeight=${weightValues[0]}&maxWeight=${
      weightValues[1]
    }&petName=${petNameToSearch}&petType=${petsArrayForSearch.join(
      "_"
    )}&petStatus=${checkAdoptionStatus()}`;

    try {
      const data = await getAllPets(url);
      if (data === undefined) {
        setError(
          "Couldn't connect to the server, please try again later or contact the admin."
        );
      } else {
        const text = textGenerator(petsToSearch);
        toast({
          title: text,
          status: "info",
          isClosable: true,
          duration: 5000,
        });
        setPetsData(data);
      }
    } catch (err) {
      setError(err);
    }
  };

  return (
    <div className="search-page-wrapper">
      <div className="search-form-container">
        <Form className="actual-form">
          <div className="font-weight-bold">Search Filter</div>
          <Divider />
          <div>
            <Form.Group className=" d-flex flex-row mb-4 mt-4  ">
              <div className="single-pet-choose">
                <Form.Check
                  onChange={() => setIsDog((pre) => !pre)}
                  inline
                  checked={isDog}
                  type="checkbox"
                  name="dogs"
                  value="dogs"
                  className="p-0 m-0"
                />
                <GiSittingDog className="p-0 m-0 ms-1 pet-image" />
              </div>
              <div className="single-pet-choose">
                <Form.Check
                  onChange={() => setIsCat((pre) => !pre)}
                  inline
                  checked={isCat}
                  type="checkbox"
                  name="cats"
                  value="cats"
                  className="p-0 m-0 "
                />
                <GiCat className="p-0 m-0 ms-1 pet-image" />
              </div>
              <div className="single-pet-choose">
                <Form.Check
                  onChange={() => setIsParrot((pre) => !pre)}
                  inline
                  checked={isParrot}
                  type="checkbox"
                  name="parrots"
                  value="parrots"
                  className="p-0 m-0"
                />
                <GiParrotHead className="p-0 m-0 ms-1 pet-image" />
              </div>
              <div className="single-pet-choose">
                <Form.Check
                  onChange={() => setIsRabbit((pre) => !pre)}
                  inline
                  checked={isRabbit}
                  type="checkbox"
                  className="p-0 m-0"
                  name="rabbits"
                  value="rabbits"
                />
                <GiRabbit className="p-0 m-0 ms-1 pet-image" />
              </div>
            </Form.Group>
          </div>
          <Divider className="mb-2" />
          <div className="d-flex justify-content-center">
            <div className="advanced-container d-flex flex-row justify-content-center align-items-center">
              <Form.Check
                onClick={handleAdvanceSettings}
                type="checkbox"
                className="mx-3"
                label="Advanced Search"
              />
            </div>
          </div>

          {isAdvanced && (
            <div className="advanced-search">
              <div className="input-field-advanced">
                <Form.Floating className="w-50 mb-2 me-2">
                  <CheckboxGroup
                    colorScheme="blue"
                    onChange={setAdoptionStatus}
                  >
                    <HStack>
                      <Checkbox value="Adoption">Adoption</Checkbox>
                      <Checkbox value="Fostering">Fostering</Checkbox>
                    </HStack>
                  </CheckboxGroup>
                </Form.Floating>
                <Form.Floating className="mb-2 me-2">
                  <Input
                    variant="flushed"
                    placeholder="Pet name"
                    value={petNameToSearch}
                    onChange={(e) => setPetNameToSearch(e.target.value)}
                  />
                </Form.Floating>
              </div>
              <div className="height-advanced-container ">
                <span>
                  Height in CM : {heightValues[0]} - {heightValues[1]}
                </span>
                <RangeSlider
                  aria-label={["minHeight", "maxHeight"]}
                  name="pet-height"
                  defaultValue={heightValues}
                  min={0}
                  max={200}
                  step={50}
                  onChange={(value) => setHeightValues(value)}
                >
                  <RangeSliderTrack bg="red.100">
                    <RangeSliderFilledTrack bg="tomato" />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                  <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
              </div>
              <div className="height-advanced-container ">
                <span>
                  Weight in KG : {weightValues[0]} - {weightValues[1]}
                </span>
                <RangeSlider
                  aria-label={["minWeight", "maxWeight"]}
                  name="pet-weight"
                  defaultValue={weightValues}
                  min={0}
                  max={80}
                  step={15}
                  onChange={(value) => setWeightValues(value)}
                >
                  <RangeSliderTrack bg="red.100">
                    <RangeSliderFilledTrack bg="tomato" />
                  </RangeSliderTrack>
                  <RangeSliderThumb boxSize={6} index={0} />
                  <RangeSliderThumb boxSize={6} index={1} />
                </RangeSlider>
              </div>
            </div>
          )}
          <Divider className="mb-2 mt-2" />

          <Form.Group as={Row}>
            <Col>
              <Button onClick={handleOnSubmit} type="submit">
                Search
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>

      <div className="pet-result-container">
        <div className="show-all-wrapper">
          <FormControl
            alignItems="center"
            className="d-flex justify-content-end show-all-container"
          >
            <FormLabel htmlFor="allPetsToggle" mb="0">
              Show Only Available Pets
            </FormLabel>
            <Switch
              isChecked={isUnavailable}
              onChange={(e) => setIsUnavailable((pre) => !pre)}
              id="allPetsToggle"
            />
          </FormControl>
        </div>
        <div className="result-items">
          <div className="result-list">
            {petsData?.length === 0 && (
              <div className="error-container">
                <div className="text-danger">
                  Couldn't find any match, please try to expand your search
                  filter
                </div>
              </div>
            )}
            {error && (
              <div className="error-container">
                <div className="text-danger">{error}</div>
              </div>
            )}
            {petsData &&
              !isUnavailable &&
              petsData.map((pet) => (
                <PetCard
                  key={pet.id}
                  setStatusChanged={setStatusChanged}
                  pet={pet}
                />
              ))}{" "}
            {petsData &&
              isUnavailable &&
              petsData
                .filter((pet) => !pet.ownerID)
                .map((pet) => (
                  <PetCard
                    key={pet.id}
                    setStatusChanged={setStatusChanged}
                    pet={pet}
                  />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
