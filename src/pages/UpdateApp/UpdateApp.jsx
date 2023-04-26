import React, {useState, useEffect} from 'react'
import "./UpdateApp.css"
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux';
import { appointmentData } from '../appointmentSlice';
import { modifyApp } from '../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { InputText } from '../../Components/InputText/InputText';
import { userData } from '../userSlice';


export const UpdateApp = () => {

    const navigate = useNavigate();

    const credentialsRdx = useSelector(userData);
    const appCredntials = useSelector(appointmentData);

    

    const appointmentId = appCredntials.choosenAppointment.id;
    

    const [updateApp, setUpdateApp] = useState({
        observation: "",
        dateTime: "",
        appointment_id: appointmentId,
        
    });

    const [valiUpdateApp, setValiUpdateApp] = useState();

    const [updateAppointmentAct, setupdateAppointmentAct] = useState(false);

    const inputHandler = (e) => {
      setUpdateApp((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    useEffect(() => {
      for (let empty in updateApp) {
        if (updateApp[empty] === "") {
          setupdateAppointmentAct(false);
          return;
        }
      }
  
      for (let validated in valiUpdateApp) {
        if (valiUpdateApp[validated] === false) {
          setupdateAppointmentAct(false);
          return;
        }
      }
  
      setupdateAppointmentAct(true);
    }, [updateApp, valiUpdateApp]);

    const checkError = (e) => {}; 

    const updatApp = () => {
      modifyApp(updateApp, credentialsRdx.credentials.token.token);
      setTimeout(() => {
        navigate("/seeAppointment/:id");
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
        <Row className="mb-3  d-flex justify-content-center">
          <button
            type="submit"
            className={
              updateAppointmentAct
                ? "registerSendDeac buttonDesign text-center"
                : "registerSendDeac buttonDesign text-center"
            }
            onClick={updatApp}
          >
            Submit
          </button>
        </Row>
      </Container>
    </div>
  )
}


