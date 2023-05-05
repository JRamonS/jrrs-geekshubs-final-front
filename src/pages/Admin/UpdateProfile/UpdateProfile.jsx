import React, {useEffect, useState} from 'react'
import './UpdateProfile.css'
import { useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { validate } from '../../../helpers/useful';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { InputText } from '../../../Components/InputText/InputText';
import { ButtonAct } from '../../../Components/ButtonAct/ButtonAct';
import { modifyProfile } from '../../../Services/apiCalls';
import { detailData } from '../../detailSlice';





export const UpdateProfile = () => {

    const credentialsRdx = useSelector(userData);
    const detailscredentials = useSelector(detailData);

    const userId = detailscredentials.choosenObject.id;
    
    const [upProfile, setUpProfile] = useState({
        phone: "",
        address: "",
        id: userId,
        
        
    });

    const [valiUpProfile, setValiUpProfile] = useState({
      phone: false,
      address: false,
    });
  
    const [upProfileError, setUpPfrofileError] = useState({
        phoneError: "",
        addressError: "",
    });
  
    const [updateProfileAct, setupdateProfileAct] = useState(false);

    const inputHandler = (e) => {
        setUpProfile((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    };

    useEffect(() => {
      for (let empty in upProfile) {
        if (upProfile[empty] === "") {
            setupdateProfileAct(false);
          return;
        }
      }
  
      for (let validated in valiUpProfile) {
        if (valiUpProfile[validated] === false) {
            setupdateProfileAct(false);
        }
      }
  
      setupdateProfileAct(true);
    }, [upProfile, valiUpProfile ]);

    const checkError = (e) => {
      let error = "";
    
      let checked = validate(e.target.name, e.target.value, e.target.required);
    
      error = checked.message;
    
      setValiUpProfile((prevState) => ({
        ...prevState,
        [e.target.name + "Vali"]: checked.validated,
      }));
    
      setUpPfrofileError((prevState) => ({
        ...prevState,
        [e.target.name + "Error"]: error,
      }));
    }; 

    const updProfile = () => {
        modifyProfile(upProfile, credentialsRdx.credentials.token.token);
        setTimeout(() => {
        window.location.reload(true);
      }, 1500);
    };

    console.log((upProfile));

  return (
    <div className="updateUsersDesing">
      <Container className="updateUsersContainer"> 
        <Row className='updateUsersRow updateUsersContainer'>
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
                    {upProfileError.phoneError}
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
                    {upProfileError.addressError}
                  </Form.Text>
              </Form.Group>
              <div className="act mt-4">    
              <ButtonAct 
                className={updateProfileAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
                buttonName="Submit"
                onClick={updateProfileAct ? updProfile : () => {}}
              />
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  )
};
