import axios from "../utils/axios";

const registerUser = async (data) =>
  axios.post("/auth/register", data).then(
    (response) => response,
    (error) => error?.response?.data
  );

const loginUser = async (data) => {
 console.log(data);
  return axios.post("/auth/sign-in", data).then(
    (response) => response,
    (error) => error?.response?.data
  );
}



const verifyToken = async (data) =>
  axios.post(`/auth/verify-token`, data).then(
    (response) => response,
    (error) => error?.response?.data
  );

const authService = {
  registerUser,
  loginUser,
  verifyToken
};

export default authService;
