import React, { useState, useEffect } from "react";
import "./AdmApp.css";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { bringAllUAppointments } from "../../../Services/apiCalls";
import { addChoosenAppointment } from "../../appointmentSlice";
import { Card, Spinner } from "react-bootstrap";
import dayjs from "dayjs";

export const AdmApp = () => {
  const [allApointments, setAllAppointments] = useState([]);
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (allApointments.length === 0) {
      bringAllUAppointments(ReduxCredentials.credentials.token.token)
        .then((result) => {
          setLoading(false);
          setAllAppointments(result.data.data);
        })
        .catch((error) => console.log(error));
    }
  }, [allApointments]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const selected = (AllAppointmet) => {
    dispatch(addChoosenAppointment({ choosenAppointment: AllAppointmet }));
  };

  const filteredAppointments = allApointments.filter((appointment) => {
    return appointment.user.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
  });

  return (
    <div className="seeAppDesign">
      <div>
        <h2 className="text-center text-white">Your Appointments</h2>
        {loading ? (
          <div className="spinnerDesign d-flex justify-content-center align-items-center flex-column">
            <div>
              <Spinner animation="border" variant="primary" />
            </div>
            <div className="loading">
              <h4>Loading...</h4>
            </div>
          </div>
        ) : (
          <div>
            <div className="searchContainer">
              <input
                type="text"
                placeholder="Search by user name"
                onChange={handleSearch}
              />
            </div>
            {filteredAppointments.length > 0 ? (
              <div className="appCardContainer">
                {filteredAppointments.map((appointment) => {
                  return (
                    <div key={appointment.id} className="appCard">
                      <Card border="info">
                        <Card.Body>
                          <Card.Title>
                            User Name: {appointment.user.name}{" "}
                          </Card.Title>
                          <Card.Title>
                            Pet Name: {appointment.pet.name}{" "}
                          </Card.Title>
                          <Card.Title>
                            Date:{" "}
                            {dayjs(appointment.dateTime).format(
                              "DD-MMM-YYYY hh:mm A"
                            )}
                          </Card.Title>
                          <Card.Title>
                            Observation: {appointment.observation}{" "}
                          </Card.Title>
                          <Card.Title>
                            Service: {appointment.service.name}{" "}
                          </Card.Title>
                          <Card.Title>
                            Contact: {appointment.user.phone}{" "}
                          </Card.Title>
                        </Card.Body>
                      </Card>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="noApp text-center">No Appointmets Found.</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
