import React, {useState, useEffect} from 'react'
import "./AdmApp.css"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../../userSlice';
import { bringAllUAppointments } from '../../../Services/apiCalls';
import { addChoosenAppointment } from '../../appointmentSlice';
import { Card, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';

export const AdmApp = () => {

    const [allApointments, setAllAppointments] = useState([]);
    const ReduxCredentials = useSelector(userData);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);
    
    

    useEffect(() => {
        if (allApointments.length === 0) {
          bringAllUAppointments(ReduxCredentials.credentials.token.token)
            .then((result) => {
              setLoading(false);
              //After fetching the users from the database, we store them in the hook.
              setAllAppointments(result.data.data);
            })
            .catch((error) => console.log(error));
        }
      }, [allApointments]);

      

      const selected = (AllAppointmet) => {
        dispatch(addChoosenAppointment({ choosenAppointment: AllAppointmet}));

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
  <div className="seePetDesign">
    <div>
      <h2 className='text-center text-white'>Your Appointments</h2>
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
        allApointments.length > 0 ? (
          <div className="petCardContainer">
            {allApointments.map((AllAppointmet) => {
              return (
                <div key={AllAppointmet.id} className="petCard">
                  <Card border="info">
                    <Card.Body>
                      <Card.Title>User Name: &nbsp; {AllAppointmet.user.name} </Card.Title>
                      <Card.Title>Pet Name: &nbsp; {AllAppointmet.pet.name} </Card.Title>
                      <Card.Title>Date:&nbsp;{dayjs(AllAppointmet.dateTime).format("DD-MMM-YYYY hh:mm A")}</Card.Title>
                      <Card.Title>Service: &nbsp; {AllAppointmet.service.name} </Card.Title>
                      <Card.Title>Contact: &nbsp; {AllAppointmet.user.phone} </Card.Title>
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



