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

const AdminProfileInfo = lazy(() => import("./pages/admin/AdminProfileInfo"));
const FleetInformation = lazy(() => import("./pages/admin/FleetInformation"));
const Maintenance = lazy(() => import("./pages/admin/Maintenance"));
const Inspection = lazy(() => import("./pages/admin/Inspection"));
const Trips = lazy(() => import("./pages/admin/Trips"));
const JobOrderSystem = lazy(() => import("./pages/admin/JobOrderSystem"));
const DeliveryMonitoring = lazy(() =>
  import("./pages/admin/DeliveryMonitoring")
);
const Reports = lazy(() => import("./pages/admin/Reports"));
const DriverManagement = lazy(() => import("./pages/admin/DriverManagement"));
const ManageAppointments = lazy(() =>
  import("./pages/admin/ManageAppointments")
);
const ManageOrders = lazy(() => import("./pages/admin/ManageOrders"));
const Inventory = lazy(() => import("./pages/admin/Inventory"));
const ManageListings = lazy(() => import("./pages/admin/ManageListings"));
const Content = lazy(() => import("./pages/admin/Content"));
const UserManagement = lazy(() => import("./pages/admin/UserManagement"));
const ManageContactForm = lazy(() => import("./pages/admin/ManageContactForm"));

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
                    <Route
                      path="/adminmanagelistings"
                      exact
                      element={<ManageListings />}
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
