import React, { useState } from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "./NavBar.css";
import Logo from '../../assets/Logo.png';
import { useDispatch, useSelector } from 'react-redux';
import { userData, userout } from '../../pages/userSlice';

export const NavBar = () => {
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();

  const logout = () => {
    dispatch(userout({ credentials: {}, token: '' }));
    return navigate("/login");
  };

  const [selectedPet, setSelectedPet] = useState(null);
  const [deleteUser, setDeleteUser] = useState(null);


  const isLoggedIn = ReduxCredentials?.credentials?.token?.data !== undefined;
  const isAdmin = ReduxCredentials?.credentials?.token?.data?.role_id === 2;

  return (
    <>
      <Navbar sticky='top' expand="lg" className='nav'>
        <Container>
          <Navbar.Brand as={Link} to="/home">
            <img src={Logo} className='logo'/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mx-auto">
              <Nav.Link as={Link} to="/home" className="text-white navDesing">Home</Nav.Link>
              <Nav.Link as={Link} to="/service" className="text-white navDesing">Service</Nav.Link>
              {isLoggedIn && !isAdmin &&(
                <>
                  <Nav.Link as={Link} to="/userProfile" className="text-white navDesing">
                  <div>{ReduxCredentials?.credentials?.token?.data?.name}</div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/petRegistration" className="text-white">Pet Registration</Nav.Link>
                  <Nav.Link as={Link} to="/seePet" className="text-white">See Pets</Nav.Link>
                </>
              )}
              {isAdmin && (
                <>
                <Nav.Link as={Link} to="/userProfile" className="text-white">
                  <div>{ReduxCredentials?.credentials?.token?.data?.name}</div>
                  </Nav.Link>
                  <Nav.Link as={Link} to="/admUser" className="text-white navDesing">Admin User</Nav.Link>
                  <Nav.Link as={Link} to="/admApp" className="text-white navDesing">Admin App</Nav.Link>
                </> 
              )}

              {deleteUser && isAdmin  && (
                <>
                  <Nav.Link as={Link} to={`/deleteUser/${deleteUser.id}`} className="text-white">Delete User</Nav.Link>
                </>
                )}
              
              {selectedPet && isLoggedIn && (
                <>
                  <Nav.Link as={Link} to={`/appointment/${selectedPet.id}`} className="text-white">Appointment</Nav.Link>
                  <Nav.Link as={Link} to={`/seeAppointment/${selectedPet.id}`} className="text-white">See Appointments</Nav.Link>
                  <Nav.Link as={Link} to={`/updateApp/${selectedPet.id}`} className="text-white">Update Appointments</Nav.Link>
                  <Nav.Link as={Link} to={`/deleteApp/${selectedPet.id}`} className="text-white">Delete Appointments</Nav.Link>
                </>
              )}
              {isLoggedIn ? (
                <Nav.Link as={Link} to="/logout" className="text-white navDesing" onClick={() => logout()}>Logout</Nav.Link>
              ) : (
                <>
                  <Nav.Link as={Link} to="/login" className="text-white navDesing">Login</Nav.Link>
                  <Nav.Link as={Link} to="/register" className="text-white navDesing">Register</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};


