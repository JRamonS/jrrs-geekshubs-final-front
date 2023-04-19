import React from 'react'
import { Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import "./NavBar.css"
import Logo from '../../assets/Logo.png'

export const NavBar = () => {
  return (
    <>
    <Navbar expand="lg" className='nav'>
      <Container>
      <Navbar.Brand as= {Link} to = "/">
      <img src={Logo} className='logo'/>
      </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Nav.Link as= {Link} to = "/home" className="text-white">Home</Nav.Link>
            <Nav.Link as= {Link} to = "/service" className="text-white">Service</Nav.Link>
            <Nav.Link as= {Link} to = "/register" className="text-white">Register</Nav.Link>
            <Nav.Link as= {Link} to = "/login" className="text-white">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
    </>
  )
}

