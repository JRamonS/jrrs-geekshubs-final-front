import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { useNavigate } from 'react-router-dom';
import { bringAllUsers } from '../../../Services/apiCalls';
import { Card, Container } from 'react-bootstrap';

export const AdmUser = () => {

    const [users, setUsers] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (users.length === 0) {
          bringAllUsers(ReduxCredentials.credentials.token.token)
            .then((result) => {
              //After fetching the users from the database, we store them in the hook.
              setUsers(result.data.data);
            })
            .catch((error) => console.log(error));
        }
      }, [users]);

      
      
      const selected = (user) => {
        
        dispatch(addChoosen({ choosenObject: user }));
        setTimeout(() => {
          navigate("/user/all/detail");
        }, 500);
      }; 

      
      
  return (
    <div>
      {users.length > 0 ? (
        <div>
        {users.map((user) => {
            return (
            <Container key={user.id}>
                <Card onClick={() => selected(user)} border="info">
                    <Card.Body>
                    <Card.Title>Name: &nbsp; {user.name} </Card.Title>
                    <Card.Title>Surname:&nbsp; {user.surname} </Card.Title>
                    <Card.Title>Email:&nbsp; {user.email} </Card.Title>
                    <Card.Title>Phone:&nbsp; {user.phone} </Card.Title>
                    </Card.Body>
                </Card>
            </Container>
            );
        })}
        </div>
        ) : (
        <div>ESTAN VINIENDO</div>
      )}
    </div>
  );
};


