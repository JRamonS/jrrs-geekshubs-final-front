import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { appointmentData } from '../../appointmentSlice';
import { deleteApp } from '../../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { userData } from '../../userSlice';

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
    <div className="h">
      <Container className="mt-5 mb-5">
        <Row className="mb-3 rowDesign">
          <Col id="formGridDate">
            <div className="d-flex flex-column">
              <p className="pe-4 nameFieldDesign text-center">
                Are you sure you want to delete this appointment?
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-3  d-flex justify-content-center">
          <button
            type="submit"
            className={
              deleteAppointmentAct
                ? 'deleteAppointmentSendDeac'
                : 'deleteAppointmentAct'
            }
            onClick={deleteAppointment}
          >
            Yes
          </button>
          <button
            type="submit"
            className={
              deleteAppointmentAct
              ? 'deleteAppointmentSendDeac'
              : 'deleteAppointmentAct'
            }
            onClick={() => navigate('/seeAppointment/:id')}
          >
            No
          </button>
        </Row>
      </Container>
    </div>
  );
};


