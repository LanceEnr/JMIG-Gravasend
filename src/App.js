import "./App.css";
import React, { useReducer } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Login from "./pages/Login";
import Register from "./pages/Register";
import authReducer from "./store/reducers/authReducer";
import UserDashboard from "./pages/DisplayAppointment";
const initialState = {
  isAuthenticated: false,
};

function App() {
  const [authState, authDispatch] = useReducer(authReducer, initialState);
  return (
    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/products" exact element={<Products />} />
          <Route path="/about" exact element={<About />} />
          <Route path="/contact" exact element={<Contact />} />
          <Route path="/userdashboard" exact element={<UserDashboard />} />
          <Route
            path="/login"
            exact
            element={<Login dispatch={authDispatch} />}
          />
          <Route
            path="/"
            exact
            render={() =>
              authState.isAuthenticated ? (
                <Home />
              ) : (
                <Login dispatch={authDispatch} />
              )
            }
          />
          <Route path="/register" exact element={<Register />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
