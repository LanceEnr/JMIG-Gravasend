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
import NewFleetInformation from "./pages/admin/NewFleetInformation";
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
import AddFleet from "./pages/admin/components/AddFleet";
import EditFleet from "./pages/admin/components/EditFleet";
import AddMaintenanceScheduling from "./pages/admin/components/AddMaintenanceScheduling";
import EditMaintenanceScheduling from "./pages/admin/components/EditMaintenanceScheduling";
import EditMaintenanceRecord from "./pages/admin/components/EditMaintenanceRecord";
import ResponsiveAppBar from "./components/ResponsiveAppBar";

const initialState = {
  isAuthenticated: !!localStorage.getItem("admintoken"),
};

function AdminApp() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  const isAuthenticated = authState.isAuthenticated;

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    authDispatch({ type: "LOGOUT" });
  };

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="/adminlogin"
            element={
              <React.Fragment>
                <AdminLogin />
              </React.Fragment>
            }
          />
          <Route
            path="/adminregister"
            element={
              <React.Fragment>
                <AdminRegister />
              </React.Fragment>
            }
          />
          <Route
            path="/adminForgotPassword"
            element={
              <React.Fragment>
                <AdminForgotPassword />
              </React.Fragment>
            }
          />
          <Route
            path="/*"
            element={
              <React.Fragment>
                {window.location.pathname !== "/adminlogin" &&
                  window.location.pathname !== "/adminregister" &&
                  window.location.pathname !== "/adminForgotPassword" && (
                    <Box
                      style={{
                        display: "flex",
                      }}
                    >
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
                            <Routes>
                              <Route
                                path="/adminlogin"
                                exact
                                element={<AdminLogin />}
                              />
                              <Route
                                path="/adminregister"
                                exact
                                element={<AdminRegister />}
                              />
                              <Route
                                path="/adminForgotPassword"
                                exact
                                element={<AdminForgotPassword />}
                              />
                              <Route
                                path="/admineditfleet"
                                exact
                                element={<EditFleet />}
                              />

                              <Route
                                path="/adminprofileinfo"
                                exact
                                element={<AdminProfileInfo />}
                              />
                              <Route
                                path="/adminfleetinformation"
                                exact
                                element={<NewFleetInformation />}
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
                              <Route
                                path="/admintrips"
                                exact
                                element={<Trips />}
                              />
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
                              <Route
                                path="/adminreports"
                                exact
                                element={<Reports />}
                              />
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

                              <Route
                                path="/admincontent"
                                exact
                                element={<Content />}
                              />
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
                              <Route
                                path="/adminlistings"
                                exact
                                element={<Listings />}
                              />
                            </Routes>
                          </Grid>
                        </Grid>
                      </Box>
                    </Box>
                  )}
              </React.Fragment>
            }
          />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </Router>
    </div>
  );
}

export default AdminApp;
