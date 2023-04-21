import React, {useEffect, useState} from 'react'
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { getUserData } from '../../Services/apiCalls';
import { Col, Row } from 'react-bootstrap';
import "./UserProfile.css"

export const UserProfile = () => {

  const ReduxCredentials = useSelector(userData);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
  });

  //This useEffect will ALWAYS be executed whenever there are changes to the credentials hook.
  useEffect(() => {
    if (user.name === "") {
      // console.log(ReduxCredentials.credentials.token.token);
      getUserData(ReduxCredentials.credentials.token.token)
        .then((reply) => {
          console.log(reply);
          setUser({
            
            name: reply?.data?.data?.name,
            surname: reply?.data?.data?.surname,
            email: reply?.data?.data?.email,
            address: reply?.data?.data?.address,
            phone: reply?.data?.data?.phone,
          });
        })
        .catch((error) => console.log("Error en getUserData:", error));
    }

    console.log(user);

   
    
    
  }, []);

  return (
    <div className='profileDesign'>
      <div className='infoProfile'>
        <Row>
          <Col className='colDesign'>
            <div className='infoProfile2'>
              <Row>
                <Col>
                  <p className='txtDesign text-center'>Name</p>
                  <div className='cuadroTxtDesign'>
                    {user.name}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className='txtDesign text-center'>Surname</p>
                  <div className='cuadroTxtDesign'>
                    {user.surname}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className='txtDesign text-center'>Phone</p>
                  <div className='cuadroTxtDesign'>
                    {user.phone}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className='txtDesign text-center'>Email</p>
                  <div className='cuadroTxtDesign'>
                    {user.email}
                  </div>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  )
}


