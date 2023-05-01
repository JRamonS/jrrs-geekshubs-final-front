import React, { useState, useEffect } from "react";
import "./PetRegistration.css"
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { registerPet } from "../../../Services/apiCalls";
import { useSelector } from "react-redux";
import { userData } from "../../userSlice";
import { useNavigate } from "react-router-dom";
import { InputText } from "../../../Components/InputText/InputText";
import { ButtonAct } from "../../../Components/ButtonAct/ButtonAct";
import { validate } from "../../../helpers/useful";

export const PetRegistration = () => {

  const credentialsRdx = useSelector(userData);
  const navigate = useNavigate();

  const[pet, setPet] = useState({
    name: "",
    age: "",
    breed: "",
    type: ""
  });

  const [valiPet, setValiPet] = useState({
    name: false,
    age: false
  });

  const [petError, setPetError] = useState ({
    nameError: "",
    ageError: "",
  });

  const [petRegisterAct, setPetRegisterAct] = useState(false);

  const [breedList, setBreedList] = useState([]);

  const handleTypeChange = (e) => {
    const type = e.target.value;
    setPet(prevPet => ({
      ...prevPet,
      type: type,
      breed: ""
    }));
    if (type === "Dog") {
      setBreedList([
        "Labrador Retriever",
        "German Shepherd",
        "Golden Retriever",
      ]);
    } else if (type === "Cat") {
      setBreedList([
        "Siamese",
        "Persian",
        "Maine Coon",
        "British Shorthair",
        "Bengal",
      ]);
    } else {
      setBreedList([]);
    }
  };

  const inputHandler = (e) => {
    setPet((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  
  useEffect(() => {
    for (let empty in pet) {
      if (pet[empty] === "") {
        setPetRegisterAct(false);
        return;
      }
    }
    setPetRegisterAct(true);
  }, [pet]);

  useEffect(() => {
    for (let validated in valiPet) {
      if (valiPet[validated] === false) {
        setPetRegisterAct(false);
        return;
      }
    }
    setPetRegisterAct(true);
  }, [valiPet]);


const checkError = (e) => {
  let error = "";

  let checked = validate(e.target.name, e.target.value, e.target.required);

  error = checked.message;

  setValiPet((prevState) => ({
    ...prevState,
    [e.target.name + "Vali"]: checked.validated,
  }));

  setPetError((prevState) => ({
    ...prevState,
    [e.target.name + "Error"]: error,
  }));
};

  const petRegister = () => {
    registerPet(pet, credentialsRdx.credentials.token.token);;
    setTimeout(() => {
      navigate ('/userProfile')
    }, 500);
  };
  

  return (
  <div className="petDesign">
    <Container className="petContainer">
      <Row className='petRow petContainer'>
        <Col>
          <Form>
            <Form.Group controlId="formBasicName">
              <Form.Label>Name</Form.Label>
                <InputText
                className={"inputName"}
                type={"text"}
                name={"name"}
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
                maxLength={20}
                />
                <Form.Text className="text-danger">
                    {petError.nameError}
                </Form.Text>
            </Form.Group>

            <Form.Group controlId="formBasicAge">
              <Form.Label>Age</Form.Label>
                <InputText
                className={"inputAge"}
                type={"number"}
                name={"age"}
                required={true}
                changeFunction={(e) => inputHandler(e)}
                blurFunction={(e) => checkError(e)}
                />
                <Form.Text className="text-danger">
                    {petError.ageError}
                </Form.Text>
            </Form.Group>

            <Form.Group>
              <Form.Label>Type</Form.Label>
                <Form.Control
                  as="select"
                  value={pet.type}
                  onChange={handleTypeChange}
                >
                  <option value="">-- Select a type --</option>
                  <option value="Dog">Dog</option>
                  <option value="Cat">Cat</option>
                </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Breed</Form.Label>
                <Form.Control
                  as="select"
                  value={pet.breed}
                  onChange={(e) => setPet({ ...pet, breed: e.target.value })}
                >
                <option value="">-- Select a breed --</option>
                {breedList.map((breed) => (
                  <option key={breed} value={breed}>
                    {breed}
                </option>
                ))}
                </Form.Control>
            </Form.Group>
            <div className=" mt-4">    
              <ButtonAct 
                className={petRegisterAct ? "registerSendDeac loginSendAct" : "registerSendDeac"}
                buttonName="Submit"
                onClick={petRegisterAct? petRegister : () => {}}
              />
              </div>
          </Form>
        </Col>
      </Row>
    </Container>
  </div>
  );
};



