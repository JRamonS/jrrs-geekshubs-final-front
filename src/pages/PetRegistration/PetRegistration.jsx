import React, { useState, useEffect } from "react";
import { Form, Button } from "react-bootstrap";
import { registerPet } from "../../Services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";

export const PetRegistration = () => {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [breed, setBreed] = useState("");
  const [type, setType] = useState("");
  const [breedList, setBreedList] = useState([]);

  const credentialsRdx = useSelector(userData);
  const navigate = useNavigate();

  const handleTypeChange = (e) => {
    setType(e.target.value);
    if (e.target.value === "Dog") {
      setBreedList([
        "Labrador Retriever",
        "German Shepherd",
        "Golden Retriever",
      ]);
    } else if (e.target.value === "Cat") {
      setBreedList([
        "Siamese",
        "Persian",
        "Maine Coon",
        "British Shorthair",
        "Bengal",
      ]);
    } else {
      setBreedList([]);
    }
  };

  const newPet = { name, age, breed, type };
  const handleSubmit = (event) => {
    event.preventDefault();
    registerPet(newPet, credentialsRdx.credentials.token.token);;
    setTimeout(() => {
      navigate ('/userProfile')
    }, 500);
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Age</Form.Label>
        <Form.Control
          type="number"
          value={age}
          min={1}
          max={25}
          onChange={(e) => setAge(e.target.value)}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label>Type</Form.Label>
        <Form.Control
          as="select"
          value={type}
          onChange={handleTypeChange}
        >
          <option value="">-- Select a type --</option>
          <option value="Dog">Dog</option>
          <option value="Cat">Cat</option>
        </Form.Control>
      </Form.Group>

      <Form.Group>
        <Form.Label>Breed</Form.Label>
        <Form.Control
          as="select"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        >
          <option value="">-- Select a breed --</option>
          {breedList.map((breed) => (
            <option key={breed} value={breed}>
              {breed}
            </option>
          ))}
        </Form.Control>
      </Form.Group>

      <Button variant="primary" type="submit">
        Register
      </Button>
    </Form>
  );
};



