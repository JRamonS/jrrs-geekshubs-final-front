import axios from "axios";

const root = "http://localhost:8000/api/"

export const registerUser = async (body) => {
    return await axios.post(`${root}register`, body)
  }

  export const userLogin = async (body) => {
    return await axios.post(`${root}login`, body);
  }

  export const getUserData = async (token) => {
    console.log(token);
    let config = { headers: { 'Authorization': `Bearer ${token}` } };
    return await axios.get(`${root}users`, config);
  }