import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signup } from "./firebase";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [workspace, setWorkspace] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [showPasswordPopup, setShowPasswordPopup] = useState(false);
  const [role, setrole] = useState('')

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate password before submitting the form
    if (validatePassword(password)) {  // Assuming validatePassword needs a parameter
        try {
            const user = await signup(email, password, {workspace, role: "Admin"});
            console.log("User created successfully", user);

            // Set success state and clear form inputs
            setSignupSuccess(true);
            setEmail('');
            setPassword('');
            setWorkspace('');
            setName('');
            setrole('')

            // Optionally navigate to another route on success
            // navigate('/dashboard');

        } catch (error) {
            console.error('Error creating user:', error);
            // console.log(setSignupSuccess(true))
            setEmailExists(true);

        }
    }
};
  
  


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

  const handleNameChange = (e) => {
    let input = e.target.value;
    input = input.replace(/[^a-zA-Z\s]/g, "");
    input = input.toUpperCase();
    setName(input);
  };

  const handleWorkspaceChange = (e) => {
    const value = e.target.value.trim().toLowerCase();
    setWorkspace(value);
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>
          <strong>Sign-Up</strong>
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Name</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Name"
              autoComplete="off"
              name="name"
              className="form-control rounded-0"
              value={name}
              onChange={handleNameChange}
              required
            />
          </div>
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
          {emailExists && email.trim() !== "" && (
            <p style={{ color: "red" }}>
              This email is already registered. Please use a different email.
            </p>
          )}

          <div className="mb-3">
            <label htmlFor="workspace">
              <strong>Workspace</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Workspace"
              autoComplete="off"
              name="workspace"
              className="form-control rounded-0"
              onChange={handleWorkspaceChange}
              value={workspace}
              required
              // readOnly={true}
              // style={{ pointerEvents: "none" }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role">
              <strong>Role</strong>
            </label>
            <input
              type="text"
              placeholder="Enter Role"
              autoComplete="off"
              name="role"
              className="form-control rounded-0"
              value="Admin" // Set the value to "admin"
              readOnly // Make the input field read-only
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
            Register
          </button>
        </form>
        {signupSuccess && (
          <div className="alert alert-success mt-3" role="alert">
            Sign up successful! Continue to <Link to="/login">Login</Link>
          </div>
        )}
        <p style={{ marginTop: "20px" }}>Already Have an Account? Login</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
          style={{ marginTop: "-20px" }}
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
