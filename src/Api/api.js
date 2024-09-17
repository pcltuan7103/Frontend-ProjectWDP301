import axios from "./axios.customize";

const registerUser = (email, password, username) => {
  const URL_API = "/v1/api/register-user";
  const data = { email, password, username };
  return axios.post(URL_API, data);
};

const loginUser = (email, password) => {
  const URL_API = "/v1/api/login";
  const data = { email, password };
  return axios.post(URL_API, data);
};

const registerEmployer = (email, password, username) => {
  const URL_API = "/v1/api/register-employer";
  const data = { email, password, username };
  return axios.post(URL_API, data);
};

const updateUser = (userId, updateData) => {
  const URL_API = `/v1/api/update-user/${userId}`; // Ensure this matches your backend route
  return axios.put(URL_API, updateData);
};

export { registerUser, loginUser, registerEmployer, updateUser };
