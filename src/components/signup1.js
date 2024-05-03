import React, { useState, useEffect } from 'react';

function SignupForm() {
    const [formData, setFormData] = useState({
        email: '',
        workspace: '',
        role: ''
    });

    useEffect(() => {
        // Function to extract query parameters from the URL
        const searchParams = new URLSearchParams(window.location.search);
        setFormData({
            email: searchParams.get('email') || '',
            workspace: searchParams.get('workspace') || '',
            role: searchParams.get('role') || ''
        });
    }, []);

    // Function to handle form input changes
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle form submission
    const handleSubmit = (event) => {
        event.preventDefault();
        console.log('Form Data Submitted:', formData);
        // Add form submission logic here
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Workspace:
                <input
                    type="text"
                    name="workspace"
                    value={formData.workspace}
                    onChange={handleChange}
                />
            </label>
            <br />
            <label>
                Role:
                <input
                    type="text"
                    name="role"
                    value={formData.role}
                    onChange={handleChange}
                />
            </label>
            <br />
            <button type="submit">Submit</button>
        </form>
    );
}

export default SignupForm;
