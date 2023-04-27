import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { Link, useNavigate } from 'react-router-dom';
import { bringAllUsers } from '../../../Services/apiCalls';
import { Card, Container } from 'react-bootstrap';
import { addChoosen } from '../../detailSlice';

export const AdmUser = () => {

    const [users, setUsers] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [hasSelectedDeleteUser, setHasSelectedDeleteUser] = useState(false);
    const [showLinks, setShowLinks] = useState(false);

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
          navigate(`/deleteUser/${user.id}`);
        }, 500);
      }; 

      
      
  return (
    <div>
      {users.length > 0 ? (
        <div>
        {users.map((user) => {
            return (
            <Container key={user.id}>
                <Card
                border="info"
                onMouseEnter={() => setShowLinks(true)}
                onMouseLeave={() => setShowLinks(false)}>
                    <Card.Body>
                    <Card.Title>Name: &nbsp; {user.name} </Card.Title>
                    <Card.Title>Surname:&nbsp; {user.surname} </Card.Title>
                    <Card.Title>Email:&nbsp; {user.email} </Card.Title>
                    <Card.Title>Phone:&nbsp; {user.phone} </Card.Title>
                    {showLinks &&
                    ReduxCredentials?.credentials?.token?.data?.role_id === 2 && (
                    <>
                    <Link to={`/deleteUser/${user.id}`}onClick={() => selected(user)}>Delete User</Link>
                    </>
                    )}
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


