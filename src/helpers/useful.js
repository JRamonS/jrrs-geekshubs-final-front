export const validate = (name, data, required) => {
    //Here, we evaluate all possible ways in which the user can enter data. 
  switch (name) {
    case "name":
    case "surname":
    case "nombre":
    case "apellido":
    case "fullname":
    case "nombrecompleto":
    case "username":
        //Here we assess that the field cannot be empty.
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
        //Here we evaluate that the fields entered are correct.
      } else if (!/[a-z]/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      }

      return { message: "", validated: true };

    case "email":
    case "e-mail":
    case "correo":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (
        !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(data)
      ) {
        return { message: "Invalid e-mail format", validated: false };
      }

      return { message: "", validated: true };

    case "password":
    case "contraseña":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[\d()+-]/g.test(data)) {
        return { message: "Invalid password format", validated: false };
      }

      return { message: "", validated: true };

    case "phone":
    case "tfno":
    case "tlfno":
    case "telefono":
    case "phonenumber":
    case "postcode":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[\d()+-]/g.test(data)) {
        return { message: "Invalid phone format", validated: false };
      }
      return { message: "", validated: true };

    case "address":
    case "direccion":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[a-zA-Z]/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      }

      return { message: "", validated: true };
  }
};
