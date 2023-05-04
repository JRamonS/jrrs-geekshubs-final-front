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
import { validate } from "../../../helpers/useful";
import dayjs from "dayjs";


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
  });

  const [appointmentAct, setAppointmentAct] = useState(false);

  const today = dayjs().format("YYYY-MM-DDTHH:mm");

  

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

    for (let validated in valiAppointment) {
      if (valiAppointment[validated] === false) {
        setAppointmentAct(false);
      }
    }

    setAppointmentAct(true);
  }, [infoAppointment, valiAppointment ]);

  const checkError = (e) => {
    let error = "";
  
    let checked = validate(e.target.name, e.target.value, e.target.required);
  
    error = checked.message;
  
    setValiAppointment((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));
  
    setAppointmentError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
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
                    min={today}
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
                    maxLength={100}
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
              <div className="act">    
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

