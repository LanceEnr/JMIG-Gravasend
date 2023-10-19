import "./App.css";
import React, { useReducer } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import "@fontsource/roboto";
import authReducer from "./store/reducers/authReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import Home from "./pages/Home";

const initialState = {
  isAuthenticated: !!localStorage.getItem("admintoken"),
};

function PrivateRoute({ element, isAuthenticated }) {
  return isAuthenticated ? element : <Navigate to="/adminLogin" />;
}

function AdminApp() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const isAuthenticated = authState.isAuthenticated;
  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <div className="AdminApp">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/adminLogin" exact element={<AdminLogin />} />
          <Route path="/adminRegister" exact element={<AdminRegister />} />
          <Route path="/adminDashboard" exact element={<AdminDashboard />} />
          <Route
            path="/adminForgotPassword"
            exact
            element={<AdminForgotPassword />}
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </div>
  );
}

export default AdminApp;
