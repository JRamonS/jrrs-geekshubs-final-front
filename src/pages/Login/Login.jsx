import React, {useEffect, useState} from 'react'
import "./Login.css"
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { login } from '../userSlice';
import { Col, Form, Row, Container } from 'react-bootstrap';
import { InputText } from '../../Components/InputText/InputText';
import { ButtonAct } from '../../Components/ButtonAct/ButtonAct';
import { validate } from "../../helpers/useful";
import { userLogin } from '../../Services/apiCalls';

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  //Hook
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  //Hook Validation
  const [valiCredentials, setValiCredentials] = useState({
    emailVali: false,
    passwordVali: false,
  });

  //Hook CkeckError
  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
  });

  const [loginAct, setLoginAct] = useState(false);


  //Handler
  const inputHandler = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  

  //Call from Api
  const initialize = () => {
    userLogin(credentials)
        .then(
          reply => {
            console.log(reply.data);
            let datosBackend = {
              token:reply.data
            };
            dispatch(login({credentials: datosBackend}));
            setTimeout(() => {
              navigate ('/userProfile')
            }, 500)
          }
        )
        .catch(error => console.log(error))
  };
  
  
  const inputValidate = (e) => {
    switch(e.target.name){
      case "email":
        break;

        case "password":

          if (credentials.password.length < 8){
            setCredentialsError((prevState) => ({
              ...prevState,
              passwordError: "You must enter at least 8 characters",
            }));
          }else {
            setCredentialsError((prevState) =>({
              ...prevState,
              passwordError : "",
            }));
          }

          break;

          default:
            console.log("Please try again")
    }
  };

  //Check if any errors are found, if so, set to false otherwise set to true.
  useEffect(() => {
    for (let error in credentialsError) {
      if (credentialsError[error] !== "") {
        setLoginAct(false);
        return;
      }
    }

    for (let empty in credentials) {
      if (credentials[empty] === "") {
        setLoginAct(false);
        return;
      }
    }

    for (let validated in valiCredentials) {
      if (valiCredentials[validated] === false) {
        setLoginAct(false);
      }
    }

    setLoginAct(true);
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

  //Rendered from the view
  return (
    <div className="loginDesing">
      <Container className="loginContainer"> 
      <Row className='loginRow loginContainer'>
        <Col>
          <Form>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
                <InputText
                  className={"inputLogin"}
                  type={"email"}
                  name={"email"}
                  placeholder={"Email"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credentialsError.emailError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
                <InputText
                  className={"inputLogin"}
                  type={"password"}
                  name={"password"}
                  placeholder={"Password"}
                  required={true}
                  changeFunction={(e) => inputHandler(e)}
                  blurFunction={(e) => checkError(e)}
                  validateFunction={(e) => inputValidate(e)}
                />
                <Form.Text className="text-danger">
                  {credentialsError.passwordError}
                </Form.Text>
            </Form.Group>
            <div className="act mt-4">    
            <ButtonAct 
              className={loginAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
              buttonName="Login"
              onClick={loginAct ? initialize : () => {}}
            />
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
    </div>
  )
}


