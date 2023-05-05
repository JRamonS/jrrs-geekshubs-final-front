export const validate = (name, data, required) => {
  switch (name) {
    case "name":
    case "surname":
    case "nombre":
    case "apellido":
    case "fullname":
    case "nombrecompleto":
    case "username":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/^[a-z\s]+$/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      } else if (/^(https?:\/\/)/i.test(data)) {
        return { message: "Please fill with a valid format", validated: false };
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
      const lowerCaseLetters = /[a-z]/g;
      const upperCaseLetters = /[A-Z]/g;
      const numbers = /[0-9]/g;
      if (data === "" && required === true) {
        return { message: "Please, fill the field", validated: false };
      } else if (data.length < 8) {
        return {
          message: "The password must have at least eight characters",
          validated: false,
        };
      } else if (!data.match(upperCaseLetters)) {
        return {
          message: "The password must have at least one uppercase letter",
          validated: false,
        };
      } else if (!data.match(lowerCaseLetters)) {
        return {
          message: "The password must have at least one lowercase letter",
          validated: false,
        };
      } else if (!data.match(numbers)) {
        return {
          message: "The password must have at least one number",
          validated: false,
        };
      } else if (/^(https?:\/\/)/i.test(data)) {
        return { message: "Please fill with a valid format", validated: false };
      } else {
        return { message: "", validated: true };
      }

    case "phone":
    case "tfno":
    case "tlfno":
    case "telefono":
    case "phonenumber":
    case "postcode":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/^\+?\d{0,3}\s?\d{6,}$/) {
        return { message: "Invalid phone format", validated: false };
      } else if (/^(https?:\/\/)/i.test(data)) {
        return { message: "Please fill with a valid format", validated: false };
      }
      return { message: "", validated: true };

    case "address":
    case "direccion":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[a-zA-Z]/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      } else if (/^(https?:\/\/)/i.test(data)) {
        return { message: "Please fill with a valid format", validated: false };
      }
      return { message: "", validated: true };

    case "age":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (isNaN(parseInt(data))) {
        return { message: "Please fill with a valid number", validated: false };
      } else if (parseInt(data) < 1 || parseInt(data) > 22) {
        return {
          message: "Please fill with an age between 1 and 22",
          validated: false,
        };
      }
      return { message: "", validated: true };

    case "dateTime":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(data)) {
        return {
          message: "Please fill with a valid date-time",
          validated: false,
        };
      }
      return { message: "", validated: true };

    case "observation":
      if (data === "" && required === true) {
        return { message: "Please fill the field", validated: false };
      } else if (!/[a-zA-Z]/gi.test(data)) {
        return { message: "Please fill with a valid text", validated: false };
      } else if (/^(https?:\/\/)/i.test(data)) {
        return { message: "Please fill with a valid format", validated: false };
      } else if (data.length > 100) {
        return {
          message:
            "This is a very long observation that exceeds the maximum length allowed",
          validated: false,
        };
      }
      return { message: "", validated: true };
  }
};
