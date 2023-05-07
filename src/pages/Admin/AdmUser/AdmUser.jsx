import React, { useState, useEffect } from "react";
import "./AdmUser.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { bringAllUsers } from "../../../Services/apiCalls";
import { Card, Spinner } from "react-bootstrap";
import { addChoosen } from "../../detailSlice";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { DeleteUser } from "../DeleteUser/DeleteUser";
import { UpdateProfile } from "../UpdateProfile/UpdateProfile";


export const AdmUser = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [UpUsers, setUpUsers] = useState(false);

  const handleClosed = () => setUpUsers(false);
  const handleUpUsers = () => setUpUsers(true);

  useEffect(() => {
    if (users.length === 0) {
      bringAllUsers(ReduxCredentials.credentials.token.token)
        .then((result) => {
          setLoading(false);
          setUsers(result.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [users]);

  const selected = (user) => {
    dispatch(addChoosen({ choosenObject: user }));
  };

  const filteredUsers = users.filter((user) => {
    return user.name.toLowerCase().includes(searchTerm.toLowerCase());
  });

  return (
    <div className="adminUserDesign">
      <div>
        <h2 className="text-center text-white">Your Users</h2>
        {loading ? (
          <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
            <div >
              <Spinner animation="border" variant="primary" />
            </div>
            <div className="spinner">
              <h4>Loading...</h4>
            </div>
          </div>
        ) : (
          <>
            <div className="search">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
              />
            </div>
            {filteredUsers.length > 0 ? (
              <div className="userCardContainer">
                {filteredUsers.map((user) => {
                  return (
                    <div key={user.id} className="userCard">
                      <Card onClick={() => selected(user)}>
                        <Card.Body>
                          <Card.Title>Name: &nbsp; {user.name} </Card.Title>
                          <Card.Title>
                            Surname:&nbsp; {user.surname}{" "}
                          </Card.Title>
                          <Card.Title>Email:&nbsp; {user.email}</Card.Title>
                          <Card.Title>Phone: {user.phone} </Card.Title>
                          <Card.Title>Address: {user.address} </Card.Title>
                          <>
                            <div className="buttons">
                            <Button variant="danger" onClick={handleShow}>
                              DeleUser
                            </Button>
                            <Modal show={show} onHide={handleClose}>
                              <Modal.Header closeButton>
                                <Modal.Title>Delete User</Modal.Title>
                              </Modal.Header>
                              <Modal.Body>
                                <DeleteUser />
                              </Modal.Body>
                              <Modal.Footer>
                                <Button
                                  variant="secondary"
                                  onClick={handleClose}
                                >
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                            </div>
                            <div className="buttons">
                            <Button variant="primary" onClick={handleUpUsers}>
                              UpdUser
                            </Button>

                            <Modal show={UpUsers} onHide={handleClosed} backdrop="static">
                              <Modal.Body><UpdateProfile></UpdateProfile></Modal.Body>
                              <Modal.Footer>
                                <Button variant="primary" onClick={handleClosed}>
                                  Close
                                </Button>
                              </Modal.Footer>
                            </Modal>
                          </div>
                          </>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="noUsersDesign text-center">
                <h5>No Users Found</h5>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};
