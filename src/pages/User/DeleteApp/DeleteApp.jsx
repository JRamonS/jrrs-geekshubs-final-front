import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { appointmentData } from '../../appointmentSlice';
import { deleteApp } from '../../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { userData } from '../../userSlice';
import { ButtonAct } from '../../../Components/ButtonAct/ButtonAct';
import "./DeleteApp.css"

export const DeleteApp = () => {
  const navigate = useNavigate();
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
      navigate('/seeAppointment/:id');
    }, 500);
  };


return (
  <div className="updateDesing">
    <Container>
      <Row className='deleteRow'>
        <Col>
          <div className="text-center mt-5">
            <p>Are you sure you want to delete this appointment?</p>
          </div>
          <div className="mt-5">    
            <ButtonAct
              className={deleteAppointmentAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
              buttonName="YES"
              onClick={deleteAppointmentAct ? deleteAppointment : () => {}}
            />
            </div>
            <div className="mt-5">
            <ButtonAct
              className={deleteAppointmentAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
              buttonName="NO"
              onClick={() => navigate('/seeAppointment/:id')}
            />
          </div>
        </Col>
      </Row>
    </Container>
  </div>
);
}

