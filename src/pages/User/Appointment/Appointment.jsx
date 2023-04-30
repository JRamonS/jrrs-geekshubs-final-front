import React, { useState, useEffect } from "react";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { newAppointment } from "../../../Services/apiCalls";
import { Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../../Components/InputText/InputText";
import { useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { petData } from "../../petSlice";
import { ButtonAct } from "../../../Components/ButtonAct/ButtonAct";


export const Appointment = () => {
  const navigate = useNavigate();

  const credentialsRdx = useSelector(userData);
  const petCredential = useSelector(petData);
  
  const petId = petCredential.choosenPet.id;

  const [infoAppointment, setInfoAppointment] = useState({
    observation: "",
    dateTime: "",
    service_id: "",
    pet_id: petId,
  });

  const [valiAppointment, setValiAppointment] = useState({
    observation: false,
  });

  const [appointmentError, setAppointmentError] = useState({
    observationError: "",
    dateTimeError: "",
  });

  const [appointmentAct, setAppointmentAct] = useState(false);

  const [service, setService] = useState([
    {
      id: 1,
      name: "Bath",
    },
    {
      id: 2,
      name: "Nails Cutting",
    },
    {
      id: 3,
      name: "Haircut",
    },
    {
      id: 4,
      name: "Toothbrushing",
    },
  ]);

  const inputHandler = (e) => {
    setInfoAppointment((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };



  useEffect(() => {
    for (let empty in infoAppointment) {
      if (infoAppointment[empty] === "") {
        setAppointmentAct(false);
        return;
      }
    }
    setAppointmentAct(true);
  }, [infoAppointment]);

  useEffect(() => {
    for (let validated in valiAppointment) {
      if (valiAppointment[validated] === false) {
        setAppointmentAct(false);
        return;
      }
    }
    setAppointmentAct(true);
  }, [valiAppointment]);

  const checkError = (e) => {
    const { name, value } = e.target;
    const errorName = `${name}Error`;
  
    if (value.trim() === "") {
      setAppointmentError((prevState) => ({
        ...prevState,
        [errorName]: `${name} is required`,
      }));
    } else {
      setAppointmentError((prevState) => ({
        ...prevState,
        [errorName]: "",
      }));
    }
  };

  const bookApp = () => {
    newAppointment(infoAppointment, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      navigate("/seeAppointment");
    }, 500);
  };

  return (
    <div className="appointmentDesing">
      <Container className="appointmetContainer"> 
        <Row className='appointmentRow appointmetContainer'>
          <Col>
            <Form>
              <Form.Group controlId="formBasicDate">
                <Form.Label>Date</Form.Label>
                  <InputText
                    className={"inputDate"}
                    type={"datetime-local"}
                    name={"dateTime"}
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <Form.Text className="text-danger">
                    {appointmentError.dateTimeError}
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicObservation">
                <Form.Label>Observation</Form.Label>
                  <InputText
                    className={"inputObsrvation"}
                    type={"text"}
                    name={"observation"}
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <Form.Text className="text-danger">
                    {appointmentError.observationError}
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicEmail">
                <Form.Label>Service</Form.Label>
                <Form.Select
                    name={"service_id"}
                    onChange={(e) => inputHandler(e)}
                    aria-label="Default select example"
                  >
                    <option>Choose your Service:</option>

                    {service.map((service) => {
                      return (
                        <option key={service.id} value={service.id}>
                          {service.name}
                        </option>
                      );
                    })}
                  </Form.Select>
              </Form.Group>
              <div className="act mt-4">    
              <ButtonAct 
                className={appointmentAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
                buttonName="Submit"
                onClick={appointmentAct ? bookApp : () => {}}
              />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
};
