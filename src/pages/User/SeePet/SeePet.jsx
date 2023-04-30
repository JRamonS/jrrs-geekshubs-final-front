import React, { useEffect, useState } from "react";
import "./SeePet.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { bringPets } from "../../../Services/apiCalls";
import { Card, Container } from "react-bootstrap";
import { addChoosenPet } from "../../petSlice";


export const SeePet = () => {
  const [pet, setPet] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();

  useEffect(() => {
    if (pet.length === 0) {
      bringPets(ReduxCredentials.credentials.token.token)
        .then((result) => {
          setPet(result.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [pet]);

  const petSelected = (pet) => {
    dispatch(addChoosenPet({ choosenPet: pet }));
    setTimeout(() => {}, 500);
  };

  return (
    <div className="petsDesign">
      {pet.length > 0 ? (
        <div>
          {pet.map((pet) => {
            return (
              <Container key={pet.id}>
                <Card
                  onClick={() => petSelected(pet)}
                  border="info"
                >
                  <Card.Body>
                    <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
                    <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
                    <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
                    <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
                  </Card.Body>
                </Card>
              </Container>
            );
          })}
        </div>
      ) : (
        <div>ESTAN VINIENDO</div>
      )}
    </div>
  );
};




