// import React, { useState, useEffect } from 'react';
// import "bootstrap/dist/css/bootstrap.min.css";
// import { Link, useNavigate } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
// import { signup } from "./firebase";
 
// function SignupForm() {
//     const [formData, setFormData] = useState({
//         email: '',
//         workspace: '',
//         role: ''
//     });
 
//     useEffect(() => {
//         const searchParams = new URLSearchParams(window.location.search);
//         setFormData({
//             email: searchParams.get('email') || '',
//             workspace: searchParams.get('workspace') || '',
//             role: searchParams.get('role') || ''
//         });
//     }, []);
 
//     const handleChange = (event) => {
//         const { name, value } = event.target;
//         let newValue = value;
//         // Apply different rules based on the field name
//         if (name === "role" || name === "workspace") {
//             // Allow only letters and convert to uppercase
//             newValue = value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
//         }
//         setFormData(prevState => ({
//             ...prevState,
//             [name]: newValue
//         }));
//     };
 
//     const handleSubmit = (event) => {
//         event.preventDefault();
//         console.log('Form Data Submitted:', formData);
//         // Add form submission logic here
//     };
 
//     return (
//         <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
//             <div className="bg-white p-3 rounded w-25">
//                 <h2>
//                     <strong>Sign-Up</strong>
//                 </h2>
//                 <form onSubmit={handleSubmit}>
//                     <div className="mb-3">
//                         <label htmlFor="email">
//                             <strong>Email</strong>
//                         </label>
//                         <input
//                             type="email"
//                             placeholder="Enter Email"
//                             autoComplete="off"
//                             name="email"
//                             className="form-control rounded-0"
//                             value={formData.email}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="workspace">
//                             <strong>Workspace</strong>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter Workspace"
//                             autoComplete="off"
//                             name="workspace"
//                             className="form-control rounded-0"
//                             value={formData.workspace}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className="mb-3">
//                         <label htmlFor="role">
//                             <strong>Role</strong>
//                         </label>
//                         <input
//                             type="text"
//                             placeholder="Enter Role"
//                             autoComplete="off"
//                             name="role"
//                             className="form-control rounded-0"
//                             value={formData.role}
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <button type="submit" className="btn btn-success w-100 rounded-0">
//                         Register
//                     </button>
//                 </form>
//             </div>
//         </div>
//     );
// }
 
// export default SignupForm;

import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { signup } from "../firebase";

function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        workspace: '',
        role: '',
        password: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [signupSuccess, setSignupSuccess] = useState(false);
    const [emailExists, setEmailExists] = useState(false);

    const navigate = useNavigate();

    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFormData(prev => ({
            ...prev,
            email: searchParams.get('email') || '',
            workspace: searchParams.get('workspace') || '',
            role: searchParams.get('role') || ''
        }));
    }, []);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handlePasswordChange = (e) => {
        setFormData(prev => ({
            ...prev,
            password: e.target.value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password, workspace, role } = formData;

        try {
            const user = await signup(email, password, { workspace, role });
            console.log("User created successfully", user);
            setSignupSuccess(true);
            setEmailExists(false);
            // Optionally navigate to another route on success
            // navigate('');
        } catch (error) {
            console.error('Error creating user:', error);
            setEmailExists(true);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
            <div className="bg-white p-3 rounded w-25">
                <h2><strong>Sign-Up</strong></h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email"><strong>Email</strong></label>
                        <input type="email" placeholder="Enter Email" autoComplete="off"
                            name="email" className="form-control rounded-0"
                            value={formData.email} onChange={handleChange} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="workspace"><strong>Workspace</strong></label>
                        <input type="text" placeholder="Enter Workspace" autoComplete="off"
                            name="workspace" className="form-control rounded-0"
                            value={formData.workspace} onChange={handleChange} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role"><strong>Role</strong></label>
                        <input type="text" placeholder="Enter Role" autoComplete="off"
                            name="role" className="form-control rounded-0"
                            value={formData.role} onChange={handleChange} readOnly />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password"><strong>Password</strong></label>
                        <div className="input-group">
                            <input type={showPassword ? "text" : "password"}
                                placeholder="Enter Password" name="password"
                                className="form-control rounded-0"
                                value={formData.password} onChange={handlePasswordChange} required />
                            <button className="btn btn-outline-secondary" type="button"
                                onClick={() => setShowPassword(!showPassword)}>
                                <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                            </button>
                        </div>
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
                <p style={{ marginTop: "20px" }}>Already Have an Account? <Link to="/login" className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none">Login</Link></p>
            </div>
        </div>
    );
}

export default SignupForm;
