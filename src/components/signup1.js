import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
 
function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        workspace: '',
        role: ''
    });
 
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        setFormData({
            email: searchParams.get('email') || '',
            workspace: searchParams.get('workspace') || '',
            role: searchParams.get('role') || ''
        });
    }, []);
 
    const handleChange = (event) => {
        const { name, value } = event.target;
        let newValue = value;
        // Apply different rules based on the field name
        if (name === "role" || name === "workspace") {
            // Allow only letters and convert to uppercase
            newValue = value.replace(/[^a-zA-Z\s]/g, "").toUpperCase();
        }
        setFormData(prevState => ({
            ...prevState,
            [name]: newValue
        }));
    };
 
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add form submission logic here
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
                            <strong>Email</strong>
                        </label>
                        <input
                            type="email"
                            placeholder="Enter Email"
                            autoComplete="off"
                            name="email"
                            className="form-control rounded-0"
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>
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
                            value={formData.workspace}
                            onChange={handleChange}
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
                            value={formData.role}
                            onChange={handleChange}
                        />
                    </div>
                    <button type="submit" className="btn btn-success w-100 rounded-0">
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
 
export default SignupForm;