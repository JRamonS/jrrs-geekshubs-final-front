import React, { useEffect, useState } from "react";
import "./SeePet.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { bringPets } from "../../../Services/apiCalls";
import { Card, Spinner } from "react-bootstrap";
import { addChoosenPet } from "../../petSlice";
import { useNavigate } from "react-router";


export const SeePet = () => {
  const [pet, setPet] = useState([]);
  const navigate = useNavigate();
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pet.length === 0) {
      bringPets(ReduxCredentials.credentials.token.token)
        .then((result) => {
          setPet(result.data.data);
          setLoading(false);
        })
        .catch((error) => console.log(error))
    }
  }, [pet]);


  const petSelected = (pet) => {
    dispatch(addChoosenPet({ choosenPet: pet}))
    setTimeout(() => {
      navigate("/appointment");
    }, 500);

    if (loading){
      return (
        <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
          <div><Spinner animation="border" variant="primary"/></div>
          <div>   <h4>Loading...</h4></div>
        </div>
      );
    }
  
  }


return (
  
  <div className="bgn">
    <div className="seePetDesign">
      <h2 className='text-center text-white'>Your Pets</h2>
      {loading ? (
        <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
          <div>
            <Spinner animation="border" variant="primary"/>
          </div>
          <div>
            <h4>Loading...</h4>
          </div>
        </div>
      ) : (
        pet.length > 0 ?  (
          <div className="petCardContainer">
            {pet.map((pet) => {
              return (
                <div key={pet.id} className="petCard">
                  <Card onClick={() => petSelected(pet)} border="info">
                    <Card.Body>
                      <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
                      <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
                      <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
                      <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No appointments found.</div>
        )
      )}
    </div>
  </div>
);
};





