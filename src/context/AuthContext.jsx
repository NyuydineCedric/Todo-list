// src/context/AuthContext.jsx
import React, { createContext, useState, useEffect } from "react";
import {
  loginUser,
  signupUser,
  logoutUser,
  getCurrentUser,
} from "../services/authService";

export const AuthContext = createContext(); // ✅ named export

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const currentUser = getCurrentUser();
    setUser(currentUser);
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const userData = await loginUser(email, password);
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async (name, email, password) => {
    setLoading(true);
    try {
      const userData = await signupUser(name, email, password);
      setUser(userData);
      setError(null);
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{ user, loading, error, login, signup, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
