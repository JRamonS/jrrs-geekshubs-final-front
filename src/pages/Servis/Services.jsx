import React from "react";
import "./Services.css";
import Dog1 from "../../assets/Dog1.png";
import Bath from "../../assets/Bath.png";
import CleanTeeth from "../../assets/CleanTeeth.png";
import NailClipping from "../../assets/NailClipping.png";
import { Button, Card, Container } from "react-bootstrap";

export const Services = () => {
  return (
    /* Main Services with image, descriptions and bootstrap button at the end*/
    <div className="bgcl">
      <div className="bgem">
        <div className="small-container">
        <h1 className="serviceDesing">Services</h1>
        </div>
      </div>
      <Container>
        <div className="services-container">
          <div className="service-item">
            <Card className="service-card">
              <Card.Img className="circle" variant="top" src={Dog1} />
            </Card>
            <div className="Desingi">
              <h5>Full Aesthetics</h5>
              <div className="service-description">
                <p>
                  We have the best haircutting professionals, 
                  internationally
                  recognized.
                </p>
                <p>Duration: 80min</p>
                <p>Price: 120$</p>
              </div>
            </div>
          </div>
          <div className="service-item">
            <Card className="service-card">
              <Card.Img className="circle" variant="top" src={Bath} />
            </Card>
            <div className="Desingi">
              <h5>Bathing and air drying</h5>
              <div className="service-description">
                <p>We bathed your pet with the best products on the market.</p>
                <p>Duration: 40min</p>
                <p>Price: 40$</p>
              </div>
            </div>
          </div>
          <div className="service-item">
            <Card className="service-card">
              <Card.Img className="circle" variant="top" src={CleanTeeth} />
            </Card>
            <div className="Desingi">
              <h5>Teeth Cleaning</h5>
              <div className="service-description">
                <p>
                  We know that the most important thing is your pet's teeth,
                  that's why we take care of their oral hygiene.
                </p>
                <p>Duration: 30min</p>
                <p>Price: 30$</p>
              </div>
            </div>
          </div>
          <div className="service-item">
            <Card className="service-card">
              <Card.Img className="circle" variant="top" src={NailClipping} />
            </Card>
            <div className="Desingi">
              <h5>Nail Clippings</h5>
              <div className="service-description">
                <p>We cut the nails in an efficient and calm way for your pet.</p>
                <p>Duration: 60min</p>
                <p>Price: 80$</p>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <div className="btgDesingi ">
        <Button className="bgte">
          Book Appointment
        </Button>
      </div>
    </div>
  );
};
