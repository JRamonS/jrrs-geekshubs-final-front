import axios from "axios";

const root = "http://localhost:3000/"

export const registerUser = async (body) => {
    return await axios.post(`${root}users`, body)
  }