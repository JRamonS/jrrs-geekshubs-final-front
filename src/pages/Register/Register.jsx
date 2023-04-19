import React, {useEffect, useState} from 'react'
import "./Register.css"
import { Form, useNavigate } from 'react-router-dom'
import { registerUser } from '../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { InputText } from '../../Components/InputText/InputText';

export const Register = () => {
  
  const navigate = useNavigate();
  //Hook for storing credential data
  const [credentials, setCredentials] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    phone: "",
    address: "",
  });
  //Hook for storing the validation status of the credentials 
  const [valiCredentials, setValiCredentials] = useState({
    name: false,
    surname: false,
    email: false,
    password: false,
    phone: false,
    address: false,
  });
  //Hook to store error messages from the credentials 
  const [credentialsError, setCredentialsError] = useState({
    nameError: "",
    surnameError: "",
    emailError: "",
    passwordError: "",
    phoneError: "",
    addressError: "",
  });

  const [registerAct, setRegisterAct] = useState(false);

  //updates the status of the credentials with the value of the input field.
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  //Welcome  after user registration
  const [welcome, setWelcome] = useState("");

  //Check if any errors are found, if so, set to false otherwise set to true.
  useEffect(() =>{
    for (let error in credentialsError) {
      if (credentialsError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let empty in credentials) {
      if (credentials[empty] === "") {
        setRegisterAct(false);
        return;
      }
    }

    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
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

    setValiCredentials((prevState) => ({
      ...prevState,
      [e.target.name + "Vali"]: checked.validated,
    }));

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  const userRegister = () => {
    registerUser(credentials)

  setWelcome(`Hi. Thank you for trusting in us!`);
  setTimeout(() => {
    navigate("/login");
  }, 3000);
    }

    // const Register = () => {
    //   RegisterMe(dataUser)
    //     .then(
    //       result => {
    //       setTimeout(() => {
    //         navigate("/login");
    //       }, 500)}
    //     ).catch(error => console.log(error))
    // }


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
                    />
              </Form.Group>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
}


