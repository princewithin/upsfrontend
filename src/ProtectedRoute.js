// import React from 'react';
// import { Navigate } from 'react-router-dom';

// function ProtectedRoute({ children }) {
//     const user = localStorage.getItem('user'); // Check if the user is logged in
//     if (!user) {
//         return <Navigate to="/login" replace />; // Redirect to login if not logged in
//     }
//     return children; // Render children if logged in
// }

// export default ProtectedRoute;

export function isAuthenticated() {
    return !!localStorage.getItem('user');
}