// import React, {useEffect, useState} from 'react'
// import "./SeeAppointment.css"
// import { useDispatch, useSelector } from 'react-redux';
// import { userData } from '../../userSlice'
// import { useNavigate } from 'react-router';
// import { bringAppointments } from '../../../Services/apiCalls';
// import { addChoosenAppointment } from '../../appointmentSlice';
// import { Card, Container, Spinner } from 'react-bootstrap';
// import dayjs from 'dayjs';



// export const SeeAppointment = () => {

//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const credentialsRdx = useSelector(userData);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   useEffect(() => {
//     if (appointments.length === 0) {
//       setTimeout(() => {
//         bringAppointments(credentialsRdx.credentials.token.token)
//           .then((result) => {
//             setLoading(false);

//             if (result.data.data.length === 0) {
//               return;
//             }
//             setAppointments(result.data.data);
//           })
//           .catch((error) => console.log(error));
//       }, 1000);
//     }
//   }, [appointments]);

//   const appointmentSelected = (appointmentPet) => {
//     dispatch(addChoosenAppointment({ choosenAppointment: appointmentPet}))
//     setTimeout(() => {
//       navigate('/updateApp/:id');
//     }, 500);

//     if (loading){
//       return (
//         <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
//           <div><Spinner animation="border" variant="primary"/></div>
//           <div>   <h4>Loading...</h4></div>
//         </div>
//       );
//     }
  
//   }

//   return (
//     <div className="appointmentDesign">
//       <div><h2 className='nameDising'>Your Appointments</h2>
//       {appointments.length > 0 ? (
//         <div>
//           {appointments.map((appointmentPet) => {
//             return (
//               <Container className='asClient' key={appointmentPet.id}>
//                 <Card onClick={() => appointmentSelected(appointmentPet)}>
//                   <Card.Body>
//                     <Card.Title>Pet:&nbsp;{appointmentPet.pet.name} </Card.Title>
//                     <Card.Title>Date:&nbsp;{dayjs(appointmentPet.dateTime).format("DD-MMM-hh")}</Card.Title>
//                     <Card.Title>Service:&nbsp;{appointmentPet.service.name} </Card.Title>
//                     <Card.Title>Duration:&nbsp;{appointmentPet.service.duration} </Card.Title>
//                     <Card.Title>Price:&nbsp;{appointmentPet.service.price} </Card.Title>
//                   </Card.Body>
//                 </Card>
//               </Container>
//             );
//           })}
//         </div>)
//         : 
//         ( <Spinner animation="border" variant="primary" />)
//         }
//       </div>
//     </div>
//   )
// }





{/* <div className='b'>
    <div> <h2 className='nameDising'>Your appointments :</h2>

{ appointments.length > 0 ? 
      (<div >
        {
          appointments.map(
            appointment => {
              return (

                
                <>
                <Container className='asClient' >
                    <Card >
                        <Card.Body
                            onClick={()=>appointmentSelected(appointment)}
                            key={appointment.id} >
                              <Card.Title>Date:&nbsp;{dayjs(appointment.date).format('YYYY-MMMM-DD')}</Card.Title>
                            <Card.Title>Treatment:&nbsp;{appointment.Treatment.name} </Card.Title>
                            </Card.Body>
                        </Card>
                </Container>
            </>
              )
            }
          )

        }  
        </div>)
        
        :

        ( <Spinner animation="border" variant="primary" />)
      
      }
    </div>
    </div> */}

import React, {useEffect, useState} from 'react'
import "./SeeAppointment.css"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice'
import { useNavigate } from 'react-router';
import { bringAppointments } from '../../../Services/apiCalls';
import { addChoosenAppointment } from '../../appointmentSlice';
import { Card, Container, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateApp } from '../UpdateApp/UpdateApp';



export const SeeAppointment = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const credentialsRdx = useSelector(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const [show, setShow] = useState(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (appointments.length === 0) {
      setTimeout(() => {
        bringAppointments(credentialsRdx.credentials.token.token)
          .then((result) => {
            setLoading(false);

            if (result.data.data.length === 0) {
              return;
            }
            setAppointments(result.data.data);
          })
          .catch((error) => console.log(error));
      }, 1000);
    }
  }, [appointments]);

  const appointmentSelected = (appointmentPet) => {
    dispatch(addChoosenAppointment({ choosenAppointment: appointmentPet}))
    setTimeout(() => {
      navigate(`/updateApp/${appointmentPet.id}`);
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
    <div className="appointmentDesign">
      <div><h2 className='nameDising'>Your Appointments</h2>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointmentPet) => {
            return (
              <Container className='asClient' key={appointmentPet.id}>
                <Card onClick={() => appointmentSelected(appointmentPet)}>
                  <Card.Body>
                    <Card.Title>Pet:&nbsp;{appointmentPet.pet.name} </Card.Title>
                    <Card.Title>Date:&nbsp;{dayjs(appointmentPet.dateTime).format("DD-MMM-hh")}</Card.Title>
                    <Card.Title>Service:&nbsp;{appointmentPet.service.name} </Card.Title>
                    <Card.Title>Duration:&nbsp;{appointmentPet.service.duration} </Card.Title>
                    <Card.Title>Price:&nbsp;{appointmentPet.service.price} </Card.Title>
  
                    <>
                      <Button variant="primary" onClick={handleShow}>
                        Update
                      </Button>

                      <Modal show={show} onHide={handleClose}>
                        <Modal.Body><UpdateApp></UpdateApp></Modal.Body>
                        <Modal.Footer>
                          <Button variant="secondary" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </>
  

                  </Card.Body>
                </Card>
              </Container>
            );
          })}
        </div>)
        : 
        ( <Spinner animation="border" variant="primary" />)
        }
      </div>
    </div>
  )
}


// import React, {useEffect, useState} from 'react'
// import "./SeeAppointment.css"
// import { useDispatch, useSelector } from 'react-redux';
// import { userData } from '../../userSlice'
// import { useNavigate } from 'react-router';
// import { bringAppointments } from '../../../Services/apiCalls';
// import { addChoosenAppointment } from '../../appointmentSlice';
// import { Card, Container, Spinner } from 'react-bootstrap';
// import dayjs from 'dayjs';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { UpdateApp } from '../UpdateApp/UpdateApp';



// export const SeeAppointment = () => {

//   const [appointments, setAppointments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const credentialsRdx = useSelector(userData);

//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [selectedAppointment, setSelectedAppointment] = useState(null);

//   const appointmentSelected = (appointmentPet) => {
//     setSelectedAppointment(appointmentPet);
//     handleShow();
//   }

//   const [show, setShow] = useState(false);

//   const handleClose = () => setShow(false);
//   const handleShow = () => setShow(true);

//   useEffect(() => {
//     if (appointments.length === 0) {
//       setTimeout(() => {
//         bringAppointments(credentialsRdx.credentials.token.token)
//           .then((result) => {
//             setLoading(false);

//             if (result.data.data.length === 0) {
//               return;
//             }
//             setAppointments(result.data.data);
//           })
//           .catch((error) => console.log(error));
//       }, 1000);
//     }
//   }, [appointments]);

//   const handleUpdateAppointment = () => {
//     dispatch(addChoosenAppointment({ choosenAppointment: selectedAppointment }));
//     navigate(`/updateApp/${selectedAppointment.id}`);
//     handleClose();
//   }

//     if (loading){
//       return (
//         <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
//           <div><Spinner animation="border" variant="primary"/></div>
//           <div>   <h4>Loading...</h4></div>
//         </div>
//       );
//     }
  
//   }

//   return (
//     <div className="appointmentDesign">
//       <div><h2 className='nameDising'>Your Appointments</h2>
//       {appointments.length > 0 ? (
//         <div>
//           {appointments.map((appointmentPet) => {
//             return (
//               <Container className='asClient' key={appointmentPet.id}>
//                 <Card onClick={() => handleUpdateAppointment(appointmentPet)}>
//                   <Card.Body>
//                     <Card.Title>Pet:&nbsp;{appointmentPet.pet.name} </Card.Title>
//                     <Card.Title>Date:&nbsp;{dayjs(appointmentPet.dateTime).format("DD-MMM-hh")}</Card.Title>
//                     <Card.Title>Service:&nbsp;{appointmentPet.service.name} </Card.Title>
//                     <Card.Title>Duration:&nbsp;{appointmentPet.service.duration} </Card.Title>
//                     <Card.Title>Price:&nbsp;{appointmentPet.service.price} </Card.Title>
  
//                     <>
//                     <Button variant="primary" onClick={() => {
//   setSelectedAppointmentId(appointmentPet.id);
//   handleShow();
// }}>
//   Update
// </Button>

//                       <Modal show={show} onHide={handleClose}>
//                         <Modal.Body><UpdateApp></UpdateApp></Modal.Body>
//                         <Modal.Footer>
//                           <Button variant="secondary" onClick={handleClose}>
//                             Close
//                           </Button>
//                         </Modal.Footer>
//                       </Modal>
//                     </>
  

//                   </Card.Body>
//                 </Card>
//               </Container>
//             );
//           })}
//         </div>)
//         : 
//         ( <Spinner animation="border" variant="primary" />)
//         }
//       </div>
//     </div>
//   )
// }