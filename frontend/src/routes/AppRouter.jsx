import React from "react";
import Home from "../Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthPage from "../features/auth/pages/AuthPage";
import OwnerDashboard from "../features/user/owner/OwnerDashboard";
import StudentLayout from "../features/user/student/StudentLayout";
import ForgotPassword from "../features/auth/pages/ForgotPassword";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/auth" element={<AuthPage />} />
      <Route path="/student/dashboard" element={<StudentLayout />} />
      <Route path="/owner/dashboard" element={<OwnerDashboard />} />
      <Route path="/auth/forgot-password" element={<ForgotPassword/>} />
    </Routes>
  );
};

export default AppRouter;
