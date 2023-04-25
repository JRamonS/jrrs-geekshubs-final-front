import React, { useState, useEffect } from "react";
import "./Appointment.css";
import { useNavigate } from "react-router-dom";
import { newAppointment } from "../../Services/apiCalls";
import { Col, Container, Form, Row } from "react-bootstrap";
import { InputText } from "../../Components/InputText/InputText";
import { useSelector } from "react-redux";
import { userData } from "../userSlice";
import { petData } from "../petSlice";

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

  const [valiInfoAppointment, setValiInfoAppointment] = useState();

  const [AppointmentAct, setAppointmentAct] = useState(false);

  useEffect(() => {
    for (let empty in infoAppointment) {
      if (infoAppointment[empty] === "") {
        setAppointmentAct(false);
        return;
      }
    }

    for (let validated in valiInfoAppointment) {
      if (valiInfoAppointment[validated] === false) {
        setAppointmentAct(false);
        return;
      }
    }

    setAppointmentAct(true);
  }, [infoAppointment, valiInfoAppointment]);

  const checkError = (e) => {};

  const bookApp = () => {
    newAppointment(infoAppointment, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      navigate("/seeAppointment");
    }, 500);
  };


  return (
    <div className="h">
      <Container className="mt-5 mb-5">
        <Row className="mb-3 rowDesign">
          <Col id="formGridDate">
            <div className="d-flex flex-column">
              <p className="pe-4 nameFieldDesign text-center">Date:</p>
              <InputText
                className="dateInputDesign"
                type={"datetime-local"}
                name={"dateTime"}
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3 rowDesign">
          <Col id="formGridDate">
            <div className="d-flex flex-column">
              <p className="pe-4 nameFieldDesign text-center">Observation:</p>
              <InputText
                className="dateInputDesign"
                type={"text"}
                name={"observation"}
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
              />
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col id="formGridDate">
            <Form>
              <Form.Group className="mb-3">
                <p className="pe-4 nameFieldDesign text-center">Service:</p>
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
            </Form>
          </Col>
        </Row>
        <Row className="mb-3  d-flex justify-content-center">
          <button
            type="submit"
            className={
              AppointmentAct
                ? "registerSendDeac buttonDesign text-center"
                : "registerSendDeac buttonDesign text-center"
            }
            onClick={bookApp}
          >
            Submit
          </button>
        </Row>
      </Container>
    </div>
  );
};
