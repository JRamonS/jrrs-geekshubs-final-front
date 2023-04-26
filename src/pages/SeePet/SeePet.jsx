// import React, { useEffect, useState} from 'react'
// import './SeePet.css'
// import { useDispatch, useSelector } from 'react-redux';
// import { userData } from '../userSlice';
// import { useNavigate } from 'react-router-dom';
// import { bringPets } from '../../Services/apiCalls';
// import { Card, Container } from 'react-bootstrap';

// export const SeePet = () => {

//     const [pets, setPets] = useState([]);
//     const ReduxCredentials = useSelector(userData);
//     const dispatch = useDispatch();
//     const navigate = useNavigate();

//     useEffect(() => {
//         if (pets.length === 0) {
//           bringPets(ReduxCredentials.credentials.token.token)
//             .then((result) => {
//               //Efectivamente, despues de traer los usuarios de la base de datos, los guardamos en el hook
//               setPets(result.data.data);
//             })
//             .catch((error) => console.log(error));
//         }
//       }, [pets]);

//       const selected = (pet) => {
//         dispatch(addChoosen({ choosenObject: pet }));
//         setTimeout(() => {
//           navigate("/appointment");
//         }, 500);
//       };

//   return (
//     <div className="petsDesign">
//       {pets.length > 0 ? (
//         <div>
//           {pets.map((pet) => {
//             return (
//               <>
//                 <Container className="m">
//                   <Card key={pet.id} onClick={() => selected(pet)}
//                      border="info">
//                     <Card.Body
//                     >
//                       <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
//                       <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
//                       <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
//                       <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
//                     </Card.Body>
//                   </Card>
//                 </Container>
//               </>
//             );
//           })}
//         </div>
//       ) : (
//         <div>ESTAN VINIENDO</div>
//       )}
//     </div>
//   )
// }

import React, { useEffect, useState } from "react";
import "./SeePet.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../userSlice";
import { Link, useNavigate } from "react-router-dom";
import { bringPets } from "../../Services/apiCalls";
import { Card, Container } from "react-bootstrap";
import { addChoosenPet } from "../petSlice";

export const SeePet = () => {
  const [pet, setPet] = useState([]);
  const ReduxCredentials = useSelector(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [hasSelectedPetInSeePet, setHasSelectedPetInSeePet] = useState(false);

  const [showLinks, setShowLinks] = useState(false);

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
              <Container className="m" key={pet.id}>
                <Card
                  onClick={() => petSelected(pet)}
                  border="info"
                  onMouseEnter={() => setShowLinks(true)}
                  onMouseLeave={() => setShowLinks(false)}
                >
                  <Card.Body>
                    <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
                    <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
                    <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
                    <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
                    {showLinks &&
                      ReduxCredentials?.credentials?.token?.data?.role_id ===
                        1 && (
                        <>
                          <Link to={`/appointment/${pet.id}`}>Appointment</Link>
                          <Link to={`/seeAppointment/${pet.id}`}>
                            SeeAppointment
                          </Link>
                          <Link to={`/updateApp/${pet.id}`}>
                            UpdateAppointment
                          </Link>
                          <Link to={`/deleteApp/${pet.id}`}>
                            DeleteAppointment
                          </Link>
                        </>
                      )}
                  </Card.Body>
                </Card>
              </Container>
            );
          })}
        </div>
      ) : (
        <div>ESTAN VINIENDO</div>
      )}
      {hasSelectedPetInSeePet &&
        ReduxCredentials?.credentials?.token?.data?.role_id === 1 && (
          <>
            <Link to={`/appointment/${selectedPet.id}`}>Appointment</Link>
            <Link to={`/seeAppointment/${selectedPet.id}`}>SeeAppointment</Link>
            <Nav.Link as={Link} to={`/updateApp/${selectedPet.id}`} className="text-white">Update Appointments</Nav.Link>
            <Nav.Link as={Link} to={`/deleteApp/${selectedPet.id}`} className="text-white">Delete Appointments</Nav.Link>
          </>
        )}
    </div>
  );
};
