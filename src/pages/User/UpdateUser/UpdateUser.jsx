import React, {useEffect, useState} from 'react'
import './UpdateUser.css'
import { useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { validate } from '../../../helpers/useful';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { InputText } from '../../../Components/InputText/InputText';
import { ButtonAct } from '../../../Components/ButtonAct/ButtonAct';
import { modifyUser } from '../../../Services/apiCalls';





export const UpdateUser = () => {

    const credentialsRdx = useSelector(userData);
    
    const [upUser, setUpUser] = useState({
        phone: "",
        address: "",
        
        
    });

    const [valiUpUser, setValiUpUser] = useState({
      phone: false,
      address: false,
    });
  
    const [upUserError, setUpUserError] = useState({
        phoneError: "",
        addressError: "",
    });
  
    const [updateUsereAct, setupdateUserAct] = useState(false);

    const inputHandler = (e) => {
        setUpUser((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    useEffect(() => {
      for (let empty in upUser) {
        if (upUser[empty] === "") {
            setupdateUserAct(false);
          return;
        }
      }
  
      for (let validated in valiUpUser) {
        if (valiUpUser[validated] === false) {
            setupdateUserAct(false);
        }
      }
  
      setupdateUserAct(true);
    }, [upUser, valiUpUser ]);

    const checkError = (e) => {
      let error = "";
    
      let checked = validate(e.target.name, e.target.value, e.target.required);
    
      error = checked.message;
    
      setValiUpUser((prevState) => ({
        ...prevState,
        [e.target.name + "Vali"]: checked.validated,
      }));
    
      setUpUserError((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: error,
      }));
    }; 

    const updProfile = () => {
        modifyUser(upUser, credentialsRdx.credentials.token.token);
        setTimeout(() => {
        window.location.reload(true);
      }, 1500);;
    };

  return (
    <div className="updateUserDesing">
      <Container className="updateUserContainer"> 
        <Row className='updateUserRow updateContainer'>
          <Col>
            <Form>
              <Form.Group controlId="formBasicPhone">
                <Form.Label>Phone</Form.Label>
                  <InputText
                    className={"inputPhone"}
                    type={"number"}
                    name={"phone"}
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <Form.Text className="text-danger">
                    {upUserError.phoneError}
                  </Form.Text>
              </Form.Group>

              <Form.Group controlId="formBasicAddress">
                <Form.Label>Address</Form.Label>
                  <InputText
                    className={"inputAddress"}
                    type={"text"}
                    name={"address"}
                    required={true}
                    changeFunction={(e) => inputHandler(e)}
                    blurFunction={(e) => checkError(e)}
                  />
                  <Form.Text className="text-danger">
                    {upUserError.addressError}
                  </Form.Text>
              </Form.Group>
              <div className="act mt-4">    
              <ButtonAct 
                className={updateUsereAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
                buttonName="Submit"
                onClick={ updateUsereAct ? updProfile : () => {}}
              />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};

