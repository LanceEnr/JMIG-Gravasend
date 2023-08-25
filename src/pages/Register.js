import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Register.css";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");

  const handleRegister = () => {
    // Perform registration logic here
  };

  return (
    <div className="register-container">
      <div className="register-wrapper">
        <div className="register-box">
          <h2>Register</h2>
          <div className="input-container">
            <label>First Name:</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Last Name:</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Email Address:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Mobile Number:</label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Confirm Password:</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Address:</label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
          <div className="input-container">
            <label>Gender:</label>
            <select value={gender} onChange={(e) => setGender(e.target.value)}>
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <button onClick={handleRegister}>Register</button>
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
