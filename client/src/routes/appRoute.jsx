import { BrowserRouter, Routes, Route } from "react-router-dom";
import OtpForm from "../features/auth/component/otpForm";
import MfaSetup from "../features/auth/page/mfaSetup";
import MfaLogin from "../features/auth/page/mfaLogin";
import ForgotPassword from "../features/auth/page/forgetPassword";
import VerifyResetOtp from "../features/auth/page/verifyResetOtp";
import ResetPassword from "../features/auth/page/resetPassword";
import DashboardLayout from "../components/layouts/dashboardLayout";
import ProtectedRoute from "./protectedRoutes";
import Login from "../features/auth/page/login";
import Register from "../features/auth/page/register";
import OrganizationDashboard from "../features/organization/page/organizationDashboard";
import TeachersPage from "../features/organization/page/teacherPage";
import ClassesPage from "../features/organization/page/classesPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/verify-otp" element={<OtpForm />} />
      <Route path="/mfa-login" element={<MfaLogin />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      <Route path="/verify-reset-otp" element={<VerifyResetOtp />} />

      <Route path="/reset-password" element={<ResetPassword />} />
      <Route elemen={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/organization" element={<OrganizationDashboard />} />

          <Route path="/organization/teachers" element={<TeachersPage />} />

          <Route path="/organization/classes" element={<ClassesPage />} />
          <Route path="/mfa-setup" element={<MfaSetup />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default AppRoutes;
