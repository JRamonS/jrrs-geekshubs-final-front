import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Footer.css'




export const Footer = () => {
    return (
    <>
<div className="Foot" >
    <Container >
<Row>
        <Col className='margin mt-2 text-center'>  
        <h4>PLACE</h4>
        <p> <i className="bi bi-geo-alt"></i> C/ Calle Isla De Lobeira 433,</p>
        <p> <i className="bi bi-globe-europe-africa"></i> 28400, Madrid</p>
        </Col>
    <Col className='margin mt-2 text-center'>
        <h4>Open Time</h4>
        <p> <i className="bi bi-telephone"></i> Monday to Friday: 08:00 – 17:00</p>
        <p> <i className="bi bi-envelope-open-heart"></i> Saturday and Sunday: </p>
        </Col>
    <Col className='margin mt-2 text-center'>
            <h4>CONTACT</h4>
            <p><i className="bi bi-clock"></i> +34 643 426 671</p>
            <p> info@laelectronica@gmail.com </p>
        </Col>
    <Row>
        <Col className='Copy mt-2'>
            <p>&copy;{new Date().getFullYear()} All Rights Reserved </p>
            </Col>
    </Row>
</Row>
    </Container>
</div>
    </>
    )
}