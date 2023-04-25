import React, {useEffect, useState} from 'react'
import "./SeeAppointment.css"
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { useNavigate } from 'react-router';
import { bringAppointments } from '../../Services/apiCalls';
import { addChoosenAppointment } from '../appointmentSlice';
import { Card, Container, Spinner } from 'react-bootstrap';
import dayjs from 'dayjs';

export const SeeAppointment = () => {

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const credentialsRdx = useSelector(userData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (appointments.length === 0) {
      setTimeout(() => {
        bringAppointments(credentialsRdx.credentials.token.token)
          .then((result) => {
              console.log(result.data.data);
            setLoading(false);

            if (result.data.data.length === 0) {
              return;
            }
            setAppointments(result.data.data);
          })
          .catch((error) => console.log(error));
      }, 1000);
    }
  }, [appointments]);

  const appointmentSelected = (appointmentPet) => {
    dispatch(addChoosenAppointment({ choosenAppointment: appointmentPet}))
    setTimeout(() => {
      navigate('/modify/appointment');
    }, 500);

    if (loading){
      return (
        <div className='spinnerDesign d-flex justify-content-center align-items-center flex-column'>
          <div><Spinner animation="border" variant="primary"/></div>
          <div>   <h4>Loading...</h4></div>
        </div>
      );
    }
  
  }

  return (
    <div className="appointmentDesign">
      <div><h2 className='nameDising'>Your Appointments</h2>
      {appointments.length > 0 ? (
        <div>
          {appointments.map((appointment) => {
            return (
              <Container className='asClient' key={appointment.id}>
                <Card>
                  <Card.Body>
                    <Card.Title>Pet:&nbsp;{appointment.pet.name} </Card.Title>
                    <Card.Title>Date:&nbsp;{dayjs(appointment.dateTime).format("DD-MMM-hh")}</Card.Title>
                    <Card.Title>Service:&nbsp;{appointment.service.name} </Card.Title>
                    <Card.Title>Duration:&nbsp;{appointment.service.duration} </Card.Title>
                    <Card.Title>Price:&nbsp;{appointment.service.price} </Card.Title>
                  </Card.Body>
                </Card>
              </Container>
            );
          })}
        </div>)
        : 
        ( <Spinner animation="border" variant="primary" />)
        }
      </div>
    </div>
  )
}





{/* <div className='b'>
    <div> <h2 className='nameDising'>Your appointments :</h2>

{ appointments.length > 0 ? 
      (<div >
        {
          appointments.map(
            appointment => {
              return (

                
                <>
                <Container className='asClient' >
                    <Card >
                        <Card.Body
                            onClick={()=>appointmentSelected(appointment)}
                            key={appointment.id} >
                              <Card.Title>Date:&nbsp;{dayjs(appointment.date).format('YYYY-MMMM-DD')}</Card.Title>
                            <Card.Title>Treatment:&nbsp;{appointment.Treatment.name} </Card.Title>
                            </Card.Body>
                        </Card>
                </Container>
            </>
              )
            }
          )

        }  
        </div>)
        
        :

        ( <Spinner animation="border" variant="primary" />)
      
      }
    </div>
    </div> */}


