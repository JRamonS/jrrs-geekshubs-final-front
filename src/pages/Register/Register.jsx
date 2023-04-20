// import React, {useEffect, useState} from 'react'
// import "./Register.css"
// import { useNavigate } from 'react-router-dom'
// import { Form } from "react-bootstrap";
// import { registerUser } from '../../Services/apiCalls';
// import { Col, Container, Row } from 'react-bootstrap';
// import { validate } from "../../helpers/useful";
// import { InputText } from '../../Components/InputText/InputText';

// export const Register = () => {
  
//   const navigate = useNavigate();
//   //Hook for storing credential data
//   const [credentials, setCredentials] = useState({
//     name: "",
//     surname: "",
//     email: "",
//     password: "",
//     phone: "",
//     address: "",
//   });
//   //Hook for storing the validation status of the credentials 
//   const [valiCredentials, setValiCredentials] = useState({
//     name: false,
//     surname: false,
//     email: false,
//     password: false,
//     phone: false,
//     address: false,
//   });
//   //Hook to store error messages from the credentials 
//   const [credentialsError, setCredentialsError] = useState({
//     nameError: "",
//     surnameError: "",
//     emailError: "",
//     passwordError: "",
//     phoneError: "",
//     addressError: "",
//   });

//   const [registerAct, setRegisterAct] = useState(false);

//   //updates the status of the credentials with the value of the input field.
//   const inputHandler = (e) => {
//     setCredentials((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };
//   //Welcome  after user registration
//   const [welcome, setWelcome] = useState("");

//   //Check if any errors are found, if so, set to false otherwise set to true.
//   useEffect(() =>{
//     for (let error in credentialsError) {
//       if (credentialsError[error] !== "") {
//         setRegisterAct(false);
//         return;
//       }
//     }

//     for (let empty in credentials) {
//       if (credentials[empty] === "") {
//         setRegisterAct(false);
//         return;
//       }
//     }

//     for (let validated in valiCredentials) {
//       if (valiCredentials[validated] === false) {
//         setRegisterAct(false);
//       }
//     }

//     setRegisterAct(true);
//   });

//   //This function is executed when the user clicks outside the input or presses the "Tab" key, and validate the data entered by the user.
//   const checkError = (e) => {
//     let error = "";

//     let checked = validate(e.target.name, e.target.value, e.target.required);

//     error = checked.message;

//     setValiCredentials((prevState) => ({
//       ...prevState,
//       [e.target.name + "Vali"]: checked.validated,
//     }));

//     setCredentialsError((prevState) => ({
//       ...prevState,
//       [e.target.name + "Error"]: error,
//     }));
//   };

//   const userRegister = () => {
//     registerUser(credentials)

//   setWelcome(`Hi. Thank you for trusting in us!`);
//   setTimeout(() => {
//     navigate("/login");
//   }, 3000);
//     }

//     // const Register = () => {
//     //   RegisterMe(dataUser)
//     //     .then(
//     //       result => {
//     //       setTimeout(() => {
//     //         navigate("/login");
//     //       }, 500)}
//     //     ).catch(error => console.log(error))
//     // }


//   return (
//     <div>
//       <Container>
//         <Row>
//           <Col>
//             <Form>
//               <Form.Group controlId="formBasicName">
//                 <Form.Label>Name</Form.Label>
//                   <InputText
//                     className={"inputRegister"}
//                     type={"text"}
//                     name={"name"}
//                     placeholder={"Name"}
//                     required={true}
//                     changeFunction={(e) => inputHandler(e)}
//                     blurFunction={(e) => checkError(e)}
//                     validateFunction={(e) => inputValidate(e)}
//                     />
//               </Form.Group>
//             </Form>
//           </Col>
//         </Row>
//       </Container>
//     </div>
//   )
// }



import React, { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ButtonAct } from "../../Components/ButtonAct/ButtonAct";
import { InputText } from "../../Components/InputText/InputText";
import { validate } from "../../helpers/useful";
import {registerUser} from "../../Services/apiCalls"
import "./Register.css"

export const Register = () => {
  
  const navigate = useNavigate();

  //Hook for storing credential data
  const [credenciales, setCredenciales] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });



  //Hook Validations 
  const [valiCredenciales, setValiCredenciales] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    phone: false,
    address: false,
  });

  //Hook error messages
  const [credencialesError, setCredencialesError] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });

  const [registerAct, setRegisterAct] = useState(false);

  //updates the status of the credentials with the value of the input field.
  const inputHandler = (e) => {
    setCredenciales((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  //Welcome  after user registration
  const [welcome, setWelcome] = useState("");

  //Check if any errors are found, if so, set to false otherwise set to true.
  useEffect(() => {
    for (let error in credencialesError) {
      if (credencialesError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let empty in credenciales) {
      if (credenciales[empty] === "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let validated in valiCredenciales) {
      if (valiCredenciales[validated] === false) {
        setRegisterAct(false);
      }
    }

    setRegisterAct(true);
  });

  //This function is executed when the user clicks outside the input or presses the "Tab" key, and validate the data entered by the user.
  const checkError = (e) => {
    let error = "";

    let checked = validate(e.target.name, e.target.value, e.target.required);

    error = checked.message;

    setValiCredenciales((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));

    setCredencialesError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  
  const userRegister = () => {
    registerUser(credenciales)
      .then(
        result => {
          setTimeout(() => {
          navigate("/login");
        }, 500)}
        ).catch(error => console.log(error))
  }

  return (
    <div>
    <Container>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"text"}
                  name={"name"}
                  placeholder={"Name"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.nameError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicSurName">
              <Form.Label>Surname</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"text"}
                  name={"surname"}
                  placeholder={"Surname"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.surnameError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Email"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.nameError}
                </Form.Text>
            </Form.Group>
          </Form>
        </Col>

        <Col>
          <Form>
            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Password"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.passwordError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicSurPhone">
              <Form.Label>Phone</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"number"}
                  name={"phone"}
                  placeholder={"Phone"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.phoneError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicAddress">
              <Form.Label>Address</Form.Label>
                <InputText
                  className={"inputRegister"}
                  type={"text"}
                  name={"address"}
                  placeholder={"Address"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credencialesError.addressError}
                </Form.Text>
            </Form.Group>

            <div className="act mt-4">    
            <ButtonAct 
              className={registerAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
              buttonName="Register"
              onClick={registerAct ? userRegister : () => {}}
              
            />
            </div>

          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  );
};


