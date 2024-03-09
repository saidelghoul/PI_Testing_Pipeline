import React from "react";
import { Card } from "react-bootstrap";

const Checklist = ({ checkList }) => {
  return (
    <Card border="primary" style={{ width: "18rem" }}>
      <Card.Img variant="top" src="holder.js/100px160" />
      <Card.Header>{checkList.title}</Card.Header>
      <Card.Body>
        <Card.Title>Primary Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Checklist;
