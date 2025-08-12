import { Route, Routes } from "react-router-dom";
import Login from "./public/auth/login";
import ForgotPassword from "./public/auth/forgot-password";
import Layout from "../components/layout-components/Layout";
import Home from "../components/page-components/home/Home";

export default function RouteComponent() {
  return (
    <>
      <Routes>
        <Route path="/login" Component={Login} />
        <Route path="/forgot-password" Component={ForgotPassword} />

        <Route path="/" element={<Layout />}>
          <Route path="/home" Component={Home} />
        </Route>
      </Routes>
    </>
  );
}
