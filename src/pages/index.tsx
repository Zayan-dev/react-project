import { Route, Routes, Navigate } from "react-router-dom";
import Login from "./public/auth/login";
import ForgotPassword from "./public/auth/forgot-password";
import Layout from "../components/layout-components/Layout";
import Home from "../components/page-components/home/Home";
import ProtectedRoute from "../components/common/ProtectedRoute";
import PublicRoute from "../components/common/PublicRoute";
import ChangePassword from "./public/auth/change-password";
import Documents from "../components/page-components/documents/Documents";
import DocumentById from "../components/page-components/documents/DocumentById";
import ChangeUserPassword from "../components/page-components/settings/ChangeUserPassword";

export default function RouteComponent() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPassword />
            </PublicRoute>
          }
        />
        <Route
          path="/change-password"
          element={
            <PublicRoute>
              <ChangePassword />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Navigate to="/home" replace />} />
          <Route path="/home" element={<Home />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/document/:id" element={<DocumentById />} />
          <Route
            path="/change-user-password"
            element={<ChangeUserPassword />}
          />
        </Route>

        {/* Catch all route */}
        {/* <Route path="*" element={<Navigate to="/home" replace />} /> */}
      </Routes>
    </>
  );
}
