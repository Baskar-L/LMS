import {
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./ProtectedRoute";

import Login from "../pages/Auth/Login";
import AuthSuccess from "../pages/Auth/AuthSuccess";

import Dashboard from "../pages/Dashboard/Dashboard";

import Courses from "../pages/Courses/Courses";

import AddCourse from "../pages/Courses/AddCourse";

import EditCourse from "../pages/Courses/EditCourse";
import CourseView from "../pages/Courses/CourseView";

import Students from "../pages/Students/Students";
import AddStudent from "../pages/Students/AddStudent";
import EditStudent from "../pages/Students/EditStudent";
import StudentView from "../pages/Students/StudentView";

import Enrollments from "../pages/Enrollments/Enrollments";
import AddEnrollment from "../pages/Enrollments/AddEnrollment";
import EnrollmentView from "../pages/Enrollments/EnrollmentView";

import ShopDetails from "../pages/Shopify/ShopDetails";

const AppRoutes = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={<Login />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses"
        element={
          <ProtectedRoute>
            <Courses />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/add"
        element={
          <ProtectedRoute>
            <AddCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/edit/:id"
        element={
          <ProtectedRoute>
            <EditCourse />
          </ProtectedRoute>
        }
      />

      <Route
        path="/courses/:id"
        element={
          <ProtectedRoute>
            <CourseView />
          </ProtectedRoute>
        }
      />
      <Route
        path="/students"
        element={
          <ProtectedRoute>
            <Students />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/add"
        element={
          <ProtectedRoute>
            <AddStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/edit/:id"
        element={
          <ProtectedRoute>
            <EditStudent />
          </ProtectedRoute>
        }
      />

      <Route
        path="/students/:id"
        element={
          <ProtectedRoute>
            <StudentView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/enrollments"
        element={
          <ProtectedRoute>
            <Enrollments />
          </ProtectedRoute>
        }
      />

      <Route
        path="/enrollments/add"
        element={
          <ProtectedRoute>
            <AddEnrollment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/enrollments/:id"
        element={
          <ProtectedRoute>
            <EnrollmentView />
          </ProtectedRoute>
        }
      />

      <Route
        path="/shop"
        element={
          <ProtectedRoute>
            <ShopDetails />
          </ProtectedRoute>
        }
      />

      <Route
  path="/auth/success"
  element={<AuthSuccess />}
/>
    </Routes>
  );
};

export default AppRoutes;