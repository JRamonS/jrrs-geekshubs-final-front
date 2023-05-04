import React, {useEffect, useState} from 'react'
import "./SeeAppointment.css"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice'
import { bringAppointments } from '../../../Services/apiCalls';
import { addChoosenAppointment } from '../../appointmentSlice';
import { Card, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { UpdateApp } from '../UpdateApp/UpdateApp';
import { DeleteApp } from '../DeleteApp/DeleteApp';

export const SeeAppointment = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const credentialsRdx = useSelector(userData);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [deleteApp, setDeleteApp] = useState(false);

  const handleClosed = () => setDeleteApp(false);
  const handleDeleteApp = () => setDeleteApp(true);
  


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
    setTimeout(() => {}, 500);

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
    <div className="bga">
      <div className='appointmentDesign'>
        <h2 className='text-center text-white'>Your Appointments</h2>
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
          appointments.length > 0 ? (
            <div className="seeCardContainer">
              {appointments.map((appointmentPet) => {
                return (
                  <div key={appointmentPet.id} className="seeCard">
                    <Card onClick={() => appointmentSelected(appointmentPet)}>
                      <Card.Body>
                        <Card.Title>Pet:&nbsp;{appointmentPet.pet.name} </Card.Title>
                        <Card.Title>Date:&nbsp;{dayjs(appointmentPet.dateTime).format("DD-MMM-YYYY hh:mm A")}</Card.Title>

                        <Card.Title>Service:&nbsp;{appointmentPet.service.name} </Card.Title>
                        <Card.Title>Duration:&nbsp;{appointmentPet.service.duration} </Card.Title>
                        <Card.Title>Price:&nbsp;{appointmentPet.service.price} </Card.Title>
                        <>
                          <div className="button-container">
                            <Button variant="primary" onClick={handleShow}>
                              Update
                            </Button>

                            <Modal show={show} onHide={handleClose} backdrop="static">
                              <Modal.Body><UpdateApp></UpdateApp></Modal.Body>
                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>

                          <div className="button-container">
                            <Button variant="danger" onClick={handleDeleteApp}>
                              Delete
                            </Button>

                            <Modal show={deleteApp} onHide={handleClosed} backdrop="static">
                              <Modal.Body><DeleteApp></DeleteApp></Modal.Body>
                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClosed}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                        </>

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
