import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});
const getUserToken = async (payload, navigate, path = "/") => {
  const response = await api.post("/create-token", payload);
  const token = response.data.token;
  localStorage.setItem("token", token);
  navigate(path);
};
export { getUserToken };
