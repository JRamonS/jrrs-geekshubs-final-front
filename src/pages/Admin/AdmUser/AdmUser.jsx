import React, {useState, useEffect} from 'react'
import './AdmUser.css'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { useNavigate } from 'react-router-dom';
import { bringAllUsers } from '../../../Services/apiCalls';
import { Card, Spinner } from 'react-bootstrap';
import { addChoosen } from '../../detailSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { DeleteUser } from '../DeleteUser/DeleteUser';

export const AdmUser = () => {

    const [users, setUsers] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (users.length === 0) {
          bringAllUsers(ReduxCredentials.credentials.token.token)
            .then((result) => {
              setLoading(false);
              //After fetching the users from the database, we store them in the hook.
              setUsers(result.data.data);
            })
            .catch((error) => console.log(error));
        }
      }, [users]);

      
      const selected= (user) => {
        dispatch(addChoosen({ choosenObject: user}))
        setTimeout(() => {
        
        }, 500);
    
        if (loading){
          return (
            <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
              <div><Spinner animation="border" variant="primary"/></div>
              <div>   <h4>Loading...</h4></div>
            </div>
          );
        }
      
      };

return (
  <div className="adminUserDesign">
    <div>
      <h2 className='text-center text-white'>Your Users</h2>
      {loading ? (
        <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
          <div>
            <Spinner animation="border" variant="primary"/>
          </div>
          <div>
            <h4>Loading...</h4>
          </div>
        </div>
      ) : (
        users.length > 0 ? (
          <div className="userCardContainer">
            {users.map((user) => {
              return (
                <div key={user.id} className="userCard">
                  <Card onClick={() => selected(user)}>
                    <Card.Body>
                    <Card.Title>Name: &nbsp; {user.name} </Card.Title>
                    <Card.Title>Surname:&nbsp; {user.surname} </Card.Title>
                    <Card.Title>Email:&nbsp; {user.email} </Card.Title>
                    <Card.Title>Phone:&nbsp; {user.phone} </Card.Title>
                      <>
                          <div>
                            <Button variant="danger" onClick={handleShow}>
                              Delete
                            </Button>

                            <Modal show={show} onHide={handleClose} backdrop="static">
                              <Modal.Body><DeleteUser></DeleteUser></Modal.Body>
                              <Modal.Footer>
                                <Button variant="danger" onClick={handleClose}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                      </>
                    </Card.Body>
                  </Card>
                </div>
              );
            })}
          </div>
        ) : (
          <div>No appointments found.</div>
        )
      )}
    </div>
  </div>
);
};


