import React from "react";
import { Card } from "react-bootstrap";
import "./homepage.css";

function InfoCard(props) {
  const { title, header, text, stepNumber } = props;
  return (
    <Card className="actual-card-container">
      <Card.Header className="card-header">
        STEP #{stepNumber} {header}
      </Card.Header>
      <Card.Body className="card-body-container">
        <Card.Title>{title}</Card.Title>
        <Card.Text>{text} </Card.Text>
      </Card.Body>
    </Card>
  );
}

export default InfoCard;
