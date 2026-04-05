import React from "react";
import Home from "../Home";
import { Route, Routes } from "react-router-dom";
import AuthPage from "../features/auth/pages/AuthPage";
import StudentLayout from "../features/user/student/StudentLayout";
import ForgotPassword from "../features/auth/pages/ForgotPassword";
import useGetCity from "../hooks/useGetCity";
import useGetCurrentUser from "../hooks/useGetCurrentUser";
import ProtectedRoutes from "./ProtectedRoutes";
import OwnerLayout from "../features/user/owner/OwnerLayout";

const AppRouter = () => {
  useGetCurrentUser();
  useGetCity();
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword />} />

      <Route
        path="/student/dashboard"
        element={
          <ProtectedRoutes allowedRole="student">
            <StudentLayout />
          </ProtectedRoutes>
        }
      />

      <Route
        path="/owner/dashboard"
        element={
          <ProtectedRoutes allowedRole="owner">
            <OwnerLayout />
          </ProtectedRoutes>
        }
      />
    </Routes>
  );
};

export default AppRouter;
