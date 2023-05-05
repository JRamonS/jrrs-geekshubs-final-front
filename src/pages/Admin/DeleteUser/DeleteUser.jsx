import React, { useState } from 'react';
import "./DeleteUser.css"
import { useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { deleteAllClient } from '../../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { detailData } from '../../detailSlice';


export const DeleteUser = () => {
  const credentialsRdx = useSelector(userData);
  const detailscredentials = useSelector(detailData);

  const userId = detailscredentials.choosenObject.id;

  console.log(detailscredentials);

  const [deleteUserAct, setDeleteUserAct] = useState(false);

  const [deleteClient, setDeleteClient] = useState({
    id: userId,
    
});

  const deleteUser = () => {
    deleteAllClient(deleteClient, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      window.location.reload(true);
    }, 1500);
  };



return (
  <div className="updateDesing">
    <Container>
      <Row className='deleteRow'>
        <Col>
          <div className="text-center mt-5">
            <p>
              Are you sure you want to delete this User?
            </p>
          </div>
          <div className="mt-5">
        <button
          type="submit"
          className={
            deleteUserAct
              ? 'registerSendDeac buttonDesign text-center'
              : 'registerSendDeac buttonDesign text-center'
          }
          onClick={deleteUser}
        >
          Yes
        </button>
        </div>
        <div className="mt-5">
        <button
          type="submit"
          className={
            deleteUserAct
              ? 'registerSendDeac buttonDesign text-center'
              : 'registerSendDeac buttonDesign text-center'
          }
          onClick={() => window.location.reload(true)}
        >
          No
        </button>
        </div>
        </Col>
      </Row>
    </Container>
  </div>
);
};

