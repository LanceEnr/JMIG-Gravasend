import "./App.css";
import React, { useReducer, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Box, Toolbar, Container, Grid, Paper } from "@mui/material";
import authReducer from "./store/reducers/authReducer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminRegister from "./pages/admin/AdminRegister";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminProfileInfo from "./pages/admin/AdminProfileInfo";
import FleetInformation from "./pages/admin/FleetInformation";
import Maintenance from "./pages/admin/Maintenance";
import Inspection from "./pages/admin/Inspection";
import Trips from "./pages/admin/Trips";
import JobOrderSystem from "./pages/admin/JobOrderSystem";
import DeliveryMonitoring from "./pages/admin/DeliveryMonitoring";
import Reports from "./pages/admin/Reports";
import DriverManagement from "./pages/admin/DriverManagement";
import ManageAppointments from "./pages/admin/ManageAppointments";
import ManageOrders from "./pages/admin/ManageOrders";
import Inventory from "./pages/admin/Inventory";
import ManageListings from "./pages/admin/ManageListings";
import Content from "./pages/admin/Content";
import UserManagement from "./pages/admin/UserManagement";
import ManageContactForm from "./pages/admin/ManageContactForm";
import Listings from "./pages/admin/Listings";

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
        <div style={{ display: "flex" }}>
          <AdminDashboard />
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === "light"
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: "100vh",
              overflow: "auto",
            }}
          >
            <Toolbar />
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Suspense fallback={<div>Loading...</div>}>
                  <Routes>
                    <Route
                      path="/adminprofileinfo"
                      exact
                      element={<AdminProfileInfo />}
                    />
                    <Route
                      path="/adminfleetinformation"
                      exact
                      element={<FleetInformation />}
                    />
                    <Route
                      path="/adminmaintenance"
                      exact
                      element={<Maintenance />}
                    />
                    <Route
                      path="/admininspection"
                      exact
                      element={<Inspection />}
                    />
                    <Route path="/admintrips" exact element={<Trips />} />
                    <Route
                      path="/adminjoborders"
                      exact
                      element={<JobOrderSystem />}
                    />
                    <Route
                      path="/admindeliverymonitoring"
                      exact
                      element={<DeliveryMonitoring />}
                    />
                    <Route path="/adminreports" exact element={<Reports />} />
                    <Route
                      path="/admindrivermanagement"
                      exact
                      element={<DriverManagement />}
                    />
                    <Route
                      path="/adminmanageappointments"
                      exact
                      element={<ManageAppointments />}
                    />
                    <Route
                      path="/adminmanageorders"
                      exact
                      element={<ManageOrders />}
                    />
                    <Route
                      path="/admininventory"
                      exact
                      element={<Inventory />}
                    />

                    <Route path="/admincontent" exact element={<Content />} />
                    <Route
                      path="/adminusermanagement"
                      exact
                      element={<UserManagement />}
                    />
                    <Route
                      path="/adminmanagecontactform"
                      exact
                      element={<ManageContactForm />}
                    />
                    <Route path="/adminlistings" exact element={<Listings />} />
                  </Routes>
                </Suspense>
              </Grid>
            </Grid>
          </Box>
        </div>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </div>
  );
}

export default AdminApp;
