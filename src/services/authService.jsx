import { authAPI, setAuthToken } from "./api";

export const loginUser = async (email, password) => {
  const data = await authAPI.login(email, password);
  setAuthToken(data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
};

export const signupUser = async (name, email, password) => {
  const data = await authAPI.signup(name, email, password);
  setAuthToken(data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data.user;
};

export const logoutUser = () => {
  setAuthToken(null);
  localStorage.removeItem("user");
  localStorage.removeItem("token");
};

export const getCurrentUser = () => {
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");
  if (token) setAuthToken(token);
  return user ? JSON.parse(user) : null;
};
