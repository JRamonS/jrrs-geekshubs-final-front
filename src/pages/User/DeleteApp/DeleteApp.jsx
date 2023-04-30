import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { appointmentData } from '../../appointmentSlice';
import { deleteApp } from '../../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { userData } from '../../userSlice';
import "./DeleteApp.css"

export const DeleteApp = () => {
  const appCredentials = useSelector(appointmentData);
  const appointmentId = appCredentials.choosenAppointment.id;
  const credentialsRdx = useSelector(userData);

  const [deleteAppointmentAct, setDeleteAppointmentAct] = useState(false);

  const [deleteAppo, setDeleteAppo] = useState({
    appointment_id: appointmentId,
    
});

  const deleteAppointment = () => {
    deleteApp(deleteAppo, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  };

  return (
    <div className="updateDesing">
      <Container>
        <Row className='deleteRow'>
          <Col>
            <div className="text-center mt-5">
              <p>
                Are you sure you want to delete this appointment?
              </p>
            </div>
            <div className="mt-5">
          <button
            type="submit"
            className={
              deleteAppointmentAct
                ? 'registerSendDeac buttonDesign text-center'
                : 'registerSendDeac buttonDesign text-center'
            }
            onClick={deleteAppointment}
          >
            Yes
          </button>
          </div>
          <div className="mt-5">
          <button
            type="submit"
            className={
              deleteAppointmentAct
                ? 'registerSendDeac buttonDesign text-center'
                : 'registerSendDeac buttonDesign text-center'
            }
            onClick={() => window.location.reload(true)}
          >
            No
          </button>
          </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
