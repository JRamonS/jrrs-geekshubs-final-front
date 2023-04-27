import React, {useState, useEffect} from 'react'
import "./AdmApp.css"
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../userSlice';
import { bringAllUAppointments } from '../../Services/apiCalls';
import { addChoosenAppointment } from '../appointmentSlice';
import { Card, Container } from 'react-bootstrap';

export const AdmApp = () => {

    const [allApointments, setAllAppointments] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    

    useEffect(() => {
        if (allApointments.length === 0) {
          bringAllUAppointments(ReduxCredentials.credentials.token.token)
            .then((result) => {
                console.log(result.data.data);
              //After fetching the users from the database, we store them in the hook.
              setAllAppointments(result.data.data);
            })
            .catch((error) => console.log(error));
        }
      }, [allApointments]);

      const selected = (AllAppointmet) => {
        
        dispatch(addChoosenAppointment({ choosenAppointment: AllAppointmet }));
        setTimeout(() => {
          navigate("");
        }, 500);
      }; 


  return (
    <div>
      {allApointments.length > 0 ? (
        <div>
        {allApointments.map((AllAppointmet) => {
            return (
            <Container key={AllAppointmet.id}>
                <Card onClick={() => selected(AllAppointmet)} border="info">
                    <Card.Body>
                    <Card.Title>User Name: &nbsp; {AllAppointmet.user.name} </Card.Title>
                    <Card.Title>Pet Name: &nbsp; {AllAppointmet.pet.name} </Card.Title>
                    <Card.Title>Appointment: &nbsp; {AllAppointmet.dateTime} </Card.Title>
                    <Card.Title>Service: &nbsp; {AllAppointmet.service.name} </Card.Title>
                    <Card.Title>Contact: &nbsp; {AllAppointmet.user.phone} </Card.Title>
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
  )
}


