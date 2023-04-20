import axios from "axios";

const root = "http://localhost:8000/api/"

export const registerUser = async (body) => {
    return await axios.post(`${root}register`, body)
  }