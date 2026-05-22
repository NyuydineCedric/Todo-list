const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
let authToken = localStorage.getItem("token");

export const setAuthToken = (token) => {
  authToken = token;
  if (token) localStorage.setItem("token", token);
  else localStorage.removeItem("token");
};

const request = async (endpoint, options = {}) => {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };
  if (authToken) {
    headers.Authorization = `Bearer ${authToken}`;
  }
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });
  if (!response.ok) {
    let errorMsg = "Request failed";
    try {
      const err = await response.json();
      errorMsg = err.error || err.message;
    } catch (e) {}
    throw new Error(errorMsg);
  }
  if (response.status === 204) return null;
  return response.json();
};

export const authAPI = {
  signup: (name, email, password) =>
    request("/auth/signup", {
      method: "POST",
      body: JSON.stringify({ name, email, password }),
    }),
  login: (email, password) =>
    request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

export const tasksAPI = {
  getAll: () => request("/tasks"),
  create: (task) =>
    request("/tasks", { method: "POST", body: JSON.stringify(task) }),
  update: (id, updates) =>
    request(`/tasks/${id}`, { method: "PUT", body: JSON.stringify(updates) }),
  delete: (id) => request(`/tasks/${id}`, { method: "DELETE" }),
};
