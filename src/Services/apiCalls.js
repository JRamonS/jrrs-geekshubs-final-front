import axios from "axios";

const root = "http://localhost:8000/api/"

export const registerUser = async (body) => {
    return await axios.post(`${root}register`, body)
  }

  export const userLogin = async (body) => {
    return await axios.post(`${root}login`, body);
  }

  export const getUserData = async (token) => {
    let config = { headers: { 'Authorization': `Bearer ${token}` } };
    return await axios.get(`${root}users`, config);
  }

  export const registerPet = async (body, token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };
  
    return await axios.post(`${root}pets`, body, config)
  
  }

  export const bringPets = async (token) => {
    let config = {
      headers: { 
        'Authorization': 'Bearer '+ token,  
      }
    };

    return await axios.get(`${root}pets`, config);
}

export const newAppointment = async (body, token) => {

  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.post(`${root}appointment`, body, config)

}

export const bringAppointments = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`${root}appointment`, config);
}


export const modifyApp = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.put(`${root}appointment`, body, config)

}


export const deleteApp = async (body, token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    },
    data: body
  };

  return await axios.delete(`${root}appointment`, config)
}

export const bringAllUsers = async (token) => {
  let config = {
    headers: { 
      'Authorization': 'Bearer '+ token,  
    }
  };

  return await axios.get(`${root}users/admin`, config);
}
