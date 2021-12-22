import React, { useState, useEffect, useContext } from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "./searchpage.css";
import {
  RangeSlider,
  RangeSliderTrack,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  useToast,
} from "@chakra-ui/react";
import PetCard from "../petcard/PetCard";
import { getAllPets } from "../../util/api";
import { AppContext } from "../../context/AppContext";

function SearchPage() {
  const [isAdvanced, setIsAdvanced] = useState(false);
  const toast = useToast();
  const [isDog, setIsDog] = useState(false);
  const [isCat, setIsCat] = useState(false);
  const [isRabbit, setIsRabbit] = useState(false);
  const [isParrot, setIsParrot] = useState(false);
  const [heightValues, setHeightValues] = useState([50, 200]);
  const [weightValues, setWeightValues] = useState([5, 80]);
  const [petsData, setPetsData] = useState("");
  const [statusChanged, setStatusChanged] = useState(false);
  const { user } = useContext(AppContext);

  useEffect(() => {
    const unsub = async () => {
      const data = await getAllPets();
      setPetsData(data);
    };
    unsub();
    return () => {
      unsub();
    };
  }, [user]);

  const handlePetTypeChange = (e) => {
    console.log(e.target);
  };
  const handleAdvanceSettings = (e) => {
    setIsAdvanced((pre) => !pre);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    const petsToSearch = {
      type: {
        dogs: isDog,
        cats: isCat,
        parrots: isParrot,
        rabbits: isRabbit,
      },
      minHeight: heightValues[0],
      maxHeight: heightValues[1],
      minWeight: weightValues[0],
      maxWeight: weightValues[1],
    };

    const textGenerator = () => {
      let fullText = "Looking for some awesome ";
      const petsArray = [];
      for (const [key, value] of Object.entries(petsToSearch.type)) {
        if (value) {
          petsArray.push(key);
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

    const text = textGenerator();

    toast({
      title: text,
      status: "info",
      isClosable: true,
      duration: 5000,
    });
    console.log(petsToSearch);
    //add search function
  };

  return (
    <div className="search-page-wrapper">
      <div className="search-form-container">
        <Form className="w-50 actual-form">
          {user && (
            <h3>
              Hello {user.firstName} {user.lastName}!
            </h3>
          )}
          <fieldset>
            <Form.Group as={Row} className="mb-3">
              <Form.Label as="legend" column sm={2}>
                Pet type
              </Form.Label>
              <Col sm={10}>
                <Form.Check
                  onChange={() => setIsDog((pre) => !pre)}
                  inline
                  checked={isDog}
                  type="checkbox"
                  label="Dogs"
                  name="dogs"
                  value="dogs"
                />
                <Form.Check
                  onChange={() => setIsCat((pre) => !pre)}
                  inline
                  checked={isCat}
                  type="checkbox"
                  label="Cats"
                  name="cats"
                  value="cats"
                />
                <Form.Check
                  onChange={() => setIsParrot((pre) => !pre)}
                  inline
                  checked={isParrot}
                  type="checkbox"
                  label="Parrots"
                  name="parrots"
                  value="parrots"
                />
                <Form.Check
                  onChange={() => setIsRabbit((pre) => !pre)}
                  inline
                  checked={isRabbit}
                  type="checkbox"
                  label="Rabbits"
                  name="rabbits"
                  value="rabbits"
                />
              </Col>
            </Form.Group>
          </fieldset>
          {isAdvanced && (
            <div className="advanced-search">
              <div className="height-advanced-container ">
                <span>
                  Height in CM : {heightValues[0]} - {heightValues[1]}
                </span>
                <RangeSlider
                  aria-label={["minHeight", "maxHeight"]}
                  className="w-50"
                  name="pet-height"
                  defaultValue={heightValues}
                  min={50}
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
                  className="w-50"
                  name="pet-weight"
                  defaultValue={weightValues}
                  min={5}
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

          <div className="advanced-container">
            <Form.Check
              onClick={handleAdvanceSettings}
              type="checkbox"
              className="mx-3"
              label="Advanced Options"
            />
          </div>
          <div className="d-flex"></div>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Button onClick={handleOnSubmit} type="submit">
                Search
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
      <div className="pet-result-container">
        {petsData &&
          petsData.map((pet) => (
            <PetCard setStatusChanged={setStatusChanged} pet={pet} />
          ))}
      </div>
    </div>
  );
}

export default SearchPage;
