import React from "react";
import { Badge, Avatar, Text } from "@chakra-ui/react";
import "./petsfeed.css";
import { Button } from "react-bootstrap";

function PetsFeed(props) {
  const { pet } = props;
  const handleClick = (e) => {
    e.preventDefault();
    window.open(`http://localhost:3000/pet/${pet.id}`);
  };
  return (
    <div onClick={handleClick} className="actual-feed-item mb-1">
      <div className="pet-image-container">
        <Avatar src={pet?.image} />
      </div>
      <div className="pet-name-container">
        <Text className="text-left" fontWeight="bold">
          {pet?.name}
        </Text>
      </div>
      <div className="badge-container">
        <Badge ml="1" colorScheme="green">
          {pet?.type}
        </Badge>
      </div>
      {props.handleReturnPet && (
        <Button onClick={props.handleReturnPet}>Return Pet</Button>
      )}
    </div>
  );
}

export default PetsFeed;
