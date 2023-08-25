import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Login.css";

const Login = ({ dispatch }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      dispatch({ type: "LOGIN" });
    } catch (error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>Login</h2>
        <div className="input-container">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <button onClick={handleLogin}>Login</button>
        {error && <p className="error-message">{error}</p>}
        <div className="links">
          <p>
            <Link to="/register">Register</Link>
          </p>
          <p>
            <Link to="/forgot-password">Forgot Password</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
