import React from "react";
import "./Home.css";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import Dog1 from "../../assets/Dog1.png";
import Bath from "../../assets/Bath.png";
import CleanTeeth from "../../assets/CleanTeeth.png";
import NailClipping from "../../assets/NailClipping.png";
import Carousel from "react-bootstrap/Carousel";
import happyCat from "../../assets/happyCat.png";
import happyCat2 from "../../assets/happyCat2.png";
import happyCat3 from "../../assets/happyCat3.png";
import happyDog from "../../assets/happyDog.png";
import happyDog1 from "../../assets/happyDog1.png";
import happyDog2 from "../../assets/happyDog2.png";

export const Home = () => {
  return (
    /* Main image with bootstrap button */
    <div className="bgc">
      <div className="bge">
        <div className="mobile-container">
        <h1>HAPPY PETZ</h1>
        <h2>Professional and affectionate pet care</h2>
        <Button className="bgt" href="http://localhost:5173/services">
          Book Appointment
        </Button>
        </div>
      </div>
      <div>
        <h2 className="Desing">SERVICES</h2>
      </div>
      {/* The different cards with their images,description and bootstrap button  */}
      <div>
        <Container className="justify-content-center">
        <Row >
            <Col className="col-12 col-md-6 col-lg-3">
              <Card>
                <Card.Img variant="top" src={Dog1} />
              </Card>
              <div className="Desing">
                <h3>Full Aesthetics</h3>
              </div>
            </Col>
            <Col className="col-12 col-md-6 col-lg-3">
              <Card>
                <Card.Img variant="top" src={Bath} />
              </Card>
              <div className="Desing">
                <h3>Bathing and air drying </h3>
              </div>
            </Col>
            <Col className="col-12 col-md-6 col-lg-3">
              <Card>
                <Card.Img variant="top" src={CleanTeeth} />
              </Card>
              <div className="Desing">
                <h3>Teeth Cleaning</h3>
              </div>
            </Col>
            <Col className="col-12 col-md-6 col-lg-3">
              <Card>
                <Card.Img variant="top" src={NailClipping} />
              </Card>
              <div className="Desing">
                <h3>Nail Clippings</h3>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="btgDesing ">
        <Button className="bgt" href="http://localhost:5173/services">
          Book Appointment
        </Button>
      </div>
      <div className="Desing">
        <h2>Happy customers</h2>
      </div>
      {/* The carousel with its images  */}
      <div className="homeDesign">
        <Carousel>
          <Carousel.Item interval={1000}>
            <img className="d-block imgDesign" src={happyCat} />
          </Carousel.Item>
          <Carousel.Item interval={500}>
            <img className="d-block imgDesign" src={happyCat2} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block imgDesign" src={happyCat3} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block imgDesign" src={happyDog} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block imgDesign" src={happyDog1} />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block imgDesign" src={happyDog2} />
          </Carousel.Item>
        </Carousel>
      </div>
      {/* Customer feedback   */}
      <div>
        <Container>
          <h2 className="Desing">Reviews</h2>
          <Row>
            <Col>
              <p className="p">
                One of the best groomers I've ever been to, the attention and my
                dog looks happy.
                <span className="span">Owner of Bruno</span>
              </p>
            </Col>
            <Col>
              <p className="p">
                One of the best groomers I've ever been to, the attention and my
                dog looks happy.
                <span className="span">Owner of Rocko</span>
              </p>
            </Col>
            <Col>
              <p className="p">
                One of the best groomers I've ever been to, the attention and my
                dog looks happy.
                <span className="span">Owner of Nana</span>
              </p>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
};
