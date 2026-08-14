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
  } = useAuth();

  if (loading) {
    return <Loader />;
  }

  if (!isAuthenticated) {
    return (
      <Navigate
        to="/login"
        replace
      />
    );
  }

  return children;
};

export default ProtectedRoute;