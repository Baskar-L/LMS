import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { getProfile } from "../api/authApi";

const AuthContext =
  createContext();

export const AuthProvider = ({
  children,
}) => {
  const [user, setUser] =
    useState(null);

  const [loading, setLoading] =
    useState(true);

  const token =
    localStorage.getItem("token");

const fetchUser = async () => {
  try {
    const response = await getProfile();

    const merchant =
      response.data.data;

    setUser(merchant);

    localStorage.setItem(
      "user",
      JSON.stringify(merchant)
    );
  } catch (error) {
    console.error(error);
    logout();
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    if (token) {
      fetchUser();
    } else {
      setLoading(false);
    }
  }, []);

  const login = (
    token,
    userData
  ) => {
    localStorage.setItem(
      "token",
      token
    );

    localStorage.setItem(
      "user",
      JSON.stringify(userData)
    );

    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    localStorage.removeItem(
      "user"
    );

    setUser(null);

    window.location.href =
      "/login";
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        fetchUser,
        isAuthenticated:
          !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;