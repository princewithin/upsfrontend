import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import {login} from "./firebase";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const user = await login(email, password);
        // Redirect the user or perform other actions upon successful login
        console.log('User logged in successfully', user);
        localStorage.setItem('user', JSON.stringify(user));
        const userdata = await axios.post(
          "http://3.109.157.15:5000/api/userData",
          { user }
        );
        console.log(userdata.data);
        navigate("/");
    } catch (error) {
        // setError(error.message); // Display the error message to the user
        console.error('Login failed:', error);
    }};

// }; else {
//       // Show password error message
//       setPasswordError(
//         "Password should be at least 6 characters long and contain at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character."
//       );
//       // Clear the error message after 10 seconds
//       setTimeout(() => {
//         setPasswordError("");
//       }, 10000);
//     }
//   };

  const handlePasswordChange = (e) => {
    const newPassword = e.target.value;
    setPassword(newPassword);

    const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#./])[A-Za-z\d@$!%*?&^#./]{6,}$/;

    const isPasswordValid = passwordRegex.test(newPassword);
  
    // Show or hide the popup based on password validity and non-empty password field
    setShowPasswordPopup(newPassword.trim() !== "" && !isPasswordValid);
  };
  
  

  const validatePassword = () => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/;
    return passwordRegex.test(password);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <strong>Login</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              type="email"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
         

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                name="password"
                className="form-control rounded-0"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={() => setShowPassword(!showPassword)}
              >
                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
              </button>
            </div>
            {showPasswordPopup && (
              <p style={{ color: "red", marginTop: "5px" }}>
                Password should be at least 6 characters long and contain at
                least 1 uppercase letter, 1 lowercase letter, 1 number, and 1
                special character.
              </p>
            )}
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
        <p style={{ marginTop: "20px" }}>Don't Have an Account? Sign Up</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          style={{ marginTop: "-20px" }}
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
