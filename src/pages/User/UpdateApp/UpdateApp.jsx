import React, {useState, useEffect} from 'react'
import "./UpdateApp.css"
import { useSelector } from 'react-redux';
import { appointmentData } from '../../appointmentSlice';
import { modifyApp } from '../../../Services/apiCalls';
import { Col, Container, Row, Form } from 'react-bootstrap';
import { InputText } from '../../../Components/InputText/InputText';
import { userData } from '../../userSlice';
import { ButtonAct } from '../../../Components/ButtonAct/ButtonAct';
import { validate } from '../../../helpers/useful';



export const UpdateApp = () => {

    const credentialsRdx = useSelector(userData);
    const appCredntials = useSelector(appointmentData);

    const appointmentId = appCredntials.choosenAppointment.id;
    
    const [updateApp, setUpdateApp] = useState({
        observation: "",
        dateTime: "",
        appointment_id: appointmentId,
        
    });

    const [valiUpdateApp, setValiUpdateApp] = useState({
      observation: false,
      dateTime: false,
    });
  
    const [updateError, setUpdateError] = useState({
      observationError: "",
      dateTimeError: "",
    });
  
    const [updateAppointmentAct, setupdateAppointmentAct] = useState(false);

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
      setupdateAppointmentAct(true);
    }, [updateApp]);
  
    useEffect(() => {
      for (let validated in valiUpdateApp) {
        if (valiUpdateApp[validated] === false) {
          setupdateAppointmentAct(false);
          return;
        }
      }
      setupdateAppointmentAct(true);
    }, [valiUpdateApp]);


    const checkError = (e) => {
      let error = "";
    
      let checked = validate(e.target.name, e.target.value, e.target.required);
    
      error = checked.message;
    
      setValiUpdateApp((prevState) => ({
        ...prevState,
        [e.target.name + "Vali"]: checked.validated,
      }));
    
      setUpdateError((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: error,
      }));
    }; 

    const updatApp = () => {
      modifyApp(updateApp, credentialsRdx.credentials.token.token);
      setTimeout(() => {
        window.location.reload(true);
      }, 1500);;
    };


  return (
    <div className="updateDesing">
      <Container className="updateContainer"> 
        <Row className='updateRow updateContainer'>
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
                    {updateError.dateTimeError}
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
                    {updateError.observationError}
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
                className={updateAppointmentAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
                buttonName="Submit"
                onClick={updateAppointmentAct ? updatApp : () => {}}
              />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};


