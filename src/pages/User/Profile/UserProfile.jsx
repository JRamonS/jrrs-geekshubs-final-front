import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { useNavigate } from "react-router";
import { getUserData } from "../../../Services/apiCalls";
import { Col, Row } from "react-bootstrap";
import "./UserProfile.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { UpdateUser } from "../UpdateUser/UpdateUser";

export const UserProfile = () => {
  const ReduxCredentials = useSelector(userData);
  const navigate = useNavigate();

  const [user, setUser] = useState({
    name: "",
    surname: "",
    email: "",
    address: "",
    phone: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (user.name === "") {
      getUserData(ReduxCredentials.credentials.token.token)
        .then((reply) => {
          setUser({
            name: reply?.data?.data?.name,
            surname: reply?.data?.data?.surname,
            email: reply?.data?.data?.email,
            address: reply?.data?.data?.address,
            phone: reply?.data?.data?.phone,
          });
        })
        .catch((error) => console.log("Error en getUserData:", error));
    }
  }, []);

  return (
    <div className="profileDesign">
      <div className="infoProfile">
        <Row>
          <Col className="colDesign">
            <div className="infoProfile2">
              <Row>
                <Col>
                  <p className="txtDesign text-center">Name</p>
                  <div className="cuadroTxtDesign">{user.name}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="txtDesign text-center">Surname</p>
                  <div className="cuadroTxtDesign">{user.surname}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="txtDesign text-center">Phone</p>
                  <div className="cuadroTxtDesign">{user.phone}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <p className="txtDesign text-center">Email</p>
                  <div className="cuadroTxtDesign">{user.email}</div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <>
                    <div className="button-container">
                      <Button
                        className="button"
                        variant="primary"
                        onClick={handleShow}
                      >
                        Update Profile
                      </Button>

                      <Modal show={show} onHide={handleClose} backdrop="static">
                        <Modal.Body>
                          <UpdateUser></UpdateUser>
                        </Modal.Body>
                        <Modal.Footer>
                          <Button variant="danger" onClick={handleClose}>
                            Close
                          </Button>
                        </Modal.Footer>
                      </Modal>
                    </div>
                  </>
                </Col>
              </Row>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
};
