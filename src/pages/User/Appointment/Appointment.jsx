// import React, { useState, useEffect } from "react";
// import "./Appointment.css";
// import { useNavigate } from "react-router-dom";
// import { newAppointment } from "../../../Services/apiCalls";
// import { Col, Container, Form, Row } from "react-bootstrap";
// import { InputText } from "../../../Components/InputText/InputText";
// import { useSelector } from "react-redux";
// import { userData } from "../../userSlice";
// import { petData } from "../../petSlice";

// export const Appointment = () => {
//   const navigate = useNavigate();

//   const credentialsRdx = useSelector(userData);
//   const petCredential = useSelector(petData);

  
//   const petId = petCredential.choosenPet.id;

//   const [infoAppointment, setInfoAppointment] = useState({
//     observation: "",
//     dateTime: "",
//     service_id: "",
//     pet_id: petId,
//   });

//   const [service, setService] = useState([
//     {
//       id: 1,
//       name: "Bath",
//     },
//     {
//       id: 2,
//       name: "Nails Cutting",
//     },
//     {
//       id: 3,
//       name: "Haircut",
//     },
//     {
//       id: 4,
//       name: "Toothbrushing",
//     },
//   ]);

//   const inputHandler = (e) => {
//     setInfoAppointment((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   const [valiInfoAppointment, setValiInfoAppointment] = useState();

//   const [AppointmentAct, setAppointmentAct] = useState(false);

//   useEffect(() => {
//     for (let empty in infoAppointment) {
//       if (infoAppointment[empty] === "") {
//         setAppointmentAct(false);
//         return;
//       }
//     }

//     for (let validated in valiInfoAppointment) {
//       if (valiInfoAppointment[validated] === false) {
//         setAppointmentAct(false);
//         return;
//       }
//     }

//     setAppointmentAct(true);
//   }, [infoAppointment, valiInfoAppointment]);

//   const checkError = (e) => {};

//   const bookApp = () => {
//     newAppointment(infoAppointment, credentialsRdx.credentials.token.token);
//     setTimeout(() => {
//       navigate("/seeAppointment/:id");
//     }, 500);
//   };


//   return (
//     <div>
//       <Container >
//         <Row>
//           <Col>
//             <div>
//               <p>Date:</p>
//               <InputText
//                 className="dateInputDesign"
//                 type={"datetime-local"}
//                 name={"dateTime"}
//                 required={true}
//                 changeFunction={(e) => inputHandler(e)}
//                 blurFunction={(e) => checkError(e)}
//               />
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col>
//             <div>
//               <p>Observation:</p>
//               <InputText
//                 className="dateInputDesign"
//                 type={"text"}
//                 name={"observation"}
//                 required={true}
//                 changeFunction={(e) => inputHandler(e)}
//                 blurFunction={(e) => checkError(e)}
//               />
//             </div>
//           </Col>
//         </Row>

//         <Row>
//           <Col>
//             <Form>
//               <Form.Group>
//                 <p>Service:</p>
//                 <Form.Select
//                   name={"service_id"}
//                   onChange={(e) => inputHandler(e)}
//                   aria-label="Default select example"
//                 >
//                   <option>Choose your Service:</option>

//                   {service.map((service) => {
//                     return (
//                       <option key={service.id} value={service.id}>
//                         {service.name}
//                       </option>
//                     );
//                   })}
//                 </Form.Select>
//               </Form.Group>
//             </Form>
//           </Col>
//         </Row>
//         <Row>
//           <button
//             type="submit"
//             className={
//               AppointmentAct
//                 ? "registerSendDeac buttonDesign text-center"
//                 : "registerSendDeac buttonDesign text-center"
//             }
//             onClick={bookApp}
//           >
//             Submit
//           </button>
//         </Row>
//       </Container>
//     </div>
//   );
// };

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
    dateTime: false,
    service_id: false,
  });

  const [AppointmentError, setAppointmentError] = useState({
    observationError: "",
    dateTimeError: "",
    service_idError: "",
  });

  const [AppointmentAct, setAppointmentAct] = useState(false);

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
  }));};

  const bookApp = () => {
    newAppointment(infoAppointment, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      navigate("/seeAppointment/:id");
    }, 500);
  };


  return (
    <div className="loginDesing">
<Container className="loginContainer"> 
      <Row className='loginRow loginContainer'>
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
                  {AppointmentError.dateTimeError}
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
                  {AppointmentError.observationError}
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
              className={AppointmentAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
              buttonName="Submit"
              onClick={AppointmentAct ? bookApp : () => {}}
            />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};

