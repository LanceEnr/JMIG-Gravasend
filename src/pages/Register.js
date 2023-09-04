import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";
import axios from "axios";

function Register() {
  const [firstName, setFirstName] = useState([]);

  const handleRegister = (e) => {
    e.preventDefault();
    try {
      const response = axios
        .get("http://localhost:3001/register")
        .then((response) => {
          // Set the user data in the state
          setFirstName(response.data);
        });

      console.log("Registration successful:", response.data);
    } catch (error) {
      console.log("Registration failed:", error.response.data.error);
    }
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-box">
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <div className="input-container">
              <label>First Name:</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <button>Register</button>
          </form>
          <div className="links">
            <p>
              <Link to="/login">I already have an account</Link>
            </p>
            <p>
              <Link to="/forgot-password">Forgot Password</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
