// import React, { useEffect, useState } from "react";
// import "./SeePet.css";
// import { useDispatch, useSelector } from "react-redux";
// import { userData } from "../../userSlice";
// import { Link } from "react-router-dom";
// import { bringPets } from "../../../Services/apiCalls";
// import { Card, Container } from "react-bootstrap";
// import { addChoosenPet } from "../../petSlice";

// export const SeePet = () => {
//   const [pet, setPet] = useState([]);
//   const ReduxCredentials = useSelector(userData);
//   const dispatch = useDispatch();
//   const [showLinks, setShowLinks] = useState(false);

//   useEffect(() => {
//     if (pet.length === 0) {
//       bringPets(ReduxCredentials.credentials.token.token)
//         .then((result) => {
//           setPet(result.data.data);
//         })
//         .catch((error) => console.log(error));
//     }
//   }, [pet]);

//   const petSelected = (pet) => {
//     dispatch(addChoosenPet({ choosenPet: pet }));
//     setTimeout(() => {}, 500);
//   };

//   return (
//     <div className="petsDesign">
//       {pet.length > 0 ? (
//         <div>
//           {pet.map((pet) => {
//             return (
//               <Container key={pet.id}>
//                 <Card
//                   onClick={() => petSelected(pet)}
//                   border="info"
//                   onMouseEnter={() => setShowLinks(true)}
//                   onMouseLeave={() => setShowLinks(false)}
//                 >
//                   <Card.Body>
//                     <Card.Title>Name: &nbsp; {pet.name} </Card.Title>
//                     <Card.Title>Age:&nbsp; {pet.age} </Card.Title>
//                     <Card.Title>Type:&nbsp; {pet.type} </Card.Title>
//                     <Card.Title>Breed:&nbsp; {pet.breed} </Card.Title>
//                     {showLinks &&
//                       ReduxCredentials?.credentials?.token?.data?.role_id ===
//                         1 && (
//                         <>
//                           <Link to={`/appointment/${pet.id}`}>Appointment</Link>
//                           <Link to={`/seeAppointment/${pet.id}`}>
//                             SeeAppointment
//                           </Link>
//                           <Link to={`/updateApp/${pet.id}`}>
//                             UpdateAppointment
//                           </Link>
//                           <Link to={`/deleteApp/${pet.id}`}>
//                             DeleteAppointment
//                           </Link>
//                         </>
//                       )}
//                   </Card.Body>
//                 </Card>
//               </Container>
//             );
//           })}
//         </div>
//       ) : (
//         <div>ESTAN VINIENDO</div>
//       )}
//     </div>
//   );
// };

import React, { useEffect, useState } from "react";
import "./SeePet.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { Link } from "react-router-dom";
import { bringPets } from "../../../Services/apiCalls";
import { Card, Container } from "react-bootstrap";
import { addChoosenPet } from "../../petSlice";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Appointment } from "../Appointment/Appointment";
import { UpdateApp } from "../UpdateApp/UpdateApp";

export const SeePet = () => {
  const [pet, setPet] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const [showLinks, setShowLinks] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [update, setUpdate] = useState(false);

  const handleRemove = () => setUpdate(false);
  const handleUpdate = () => setUpdate(true);

  


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
                          
   
                        <Button variant="primary" onClick={handleShow}>
                          add
                        </Button>

                        <Modal show={show} onHide={handleClose}>
                          <Modal.Body><Appointment></Appointment></Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>

                        <Button variant="primary" onClick={handleUpdate}>
                          Update
                        </Button>

                        <Modal show={update} onHide={handleRemove}>
                          <Modal.Body><UpdateApp></UpdateApp></Modal.Body>
                          <Modal.Footer>
                            <Button variant="secondary" onClick={handleRemove}>
                              Close
                            </Button>
                          </Modal.Footer>
                        </Modal>
    
                          
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
    </div>
  );
};




