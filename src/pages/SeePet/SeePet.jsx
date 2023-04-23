import React, { useEffect, useState} from 'react'
import './SeePet.css'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router-dom';
import { bringPets } from '../../Services/apiCalls';
import { Card, Container } from 'react-bootstrap';

export const SeePet = () => {

    const [pets, setPets] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (pets.length === 0) {
          bringPets(ReduxCredentials.credentials.token.token)
            .then((result) => {
              //Efectivamente, despues de traer los usuarios de la base de datos, los guardamos en el hook
              setPets(result.data.data);
            })
            .catch((error) => console.log(error));
        }
      }, [pets]);

      console.log(pets);

      const selected = (pet) => {
        dispatch(addChoosen({ choosenObject: pet }));
        setTimeout(() => {
          navigate("/user/all/detail");
        }, 500);
      };

  return (
    <div className="petsDesign">
      {pets.length > 0 ? (
        <div>
          {pets.map((pet) => {
            return (
              <>
                <Container className="m">
                  <Card key={pet.id} onClick={() => selected(pet)}
                     border="info">
                    <Card.Body 
                    >
                      <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
                      <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
                      <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
                      <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
                    </Card.Body>
                  </Card>
                </Container>  
              </>
            );
          })}
        </div>
      ) : (
        <div>ESTAN VINIENDO</div>
      )}
    </div>
  )
}



