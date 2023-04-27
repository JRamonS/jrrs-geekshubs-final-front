import React, { useState } from 'react';
import "./DeleteUser.css"
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { deleteAllClient } from '../../../Services/apiCalls';
import { Col, Container, Row } from 'react-bootstrap';
import { detailData } from '../../detailSlice';


export const DeleteUser = () => {
  const navigate = useNavigate();
  const credentialsRdx = useSelector(userData);
  const detailscredentials = useSelector(detailData);

  const userId = detailscredentials.choosenObject.id;

  const [deleteUserAct, setDeleteUserAct] = useState(false);

  const [deleteClient, setDeleteClient] = useState({
    id: userId,
    
});

  const deleteUser = () => {
    deleteAllClient(deleteClient, credentialsRdx.credentials.token.token);
    setTimeout(() => {
      navigate('/admUser');
    }, 500);
  };

  
  

  return (
    <div className="h">
      <Container className="mt-5 mb-5">
        <Row className="mb-3 rowDesign">
          <Col id="formGridDate">
            <div className="d-flex flex-column">
              <p className="pe-4 nameFieldDesign text-center">
                Are you sure you want to delete this appointment?
              </p>
            </div>
          </Col>
        </Row>

        <Row className="mb-3  d-flex justify-content-center">
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
          <button
            type="submit"
            className={
              deleteUserAct
                ? 'registerSendDeac buttonDesign text-center'
                : 'registerSendDeac buttonDesign text-center'
            }
            onClick={() => navigate('/admUser')}
          >
            No
          </button>
        </Row>
      </Container>
    </div>
  );
};

