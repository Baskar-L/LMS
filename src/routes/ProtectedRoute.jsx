import {
  Navigate,
} from "react-router-dom";

import Loader from "../components/Layout/Loader";

import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({
  children,
}) => {
  const {
    loading,
    isAuthenticated,
    user,
  } = useAuth();

  console.log(
    "loading:",
    loading
  );

  console.log(
    "user:",
    user
  );

  console.log(
    "isAuthenticated:",
    isAuthenticated
  );
  console.log("User:", user);

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;