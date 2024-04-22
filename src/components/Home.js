import React from 'react';
import Nav from './Nav';
import ShippingForm from './ShippingForm';
import DashboardComponent from './DashboardComponent';
import RateChartComponent from './RateChartComponent';
import ManageWorkspace from './ManageWorkspace';
import { isAuthenticated } from '../ProtectedRoute';
import { Navigate } from 'react-router-dom';

function Home({ currentComponent }) {
    // Check if the user is authenticated
    const authenticated = isAuthenticated();

    return (
        <div className='px-3'>
            {/* Render components based on authentication */}
            {currentComponent === 'DashboardComponent' && <DashboardComponent />}
            {currentComponent === 'CalculateComponent' && (authenticated ? <ShippingForm /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'RateChartComponent' && (authenticated ? <RateChartComponent /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'ManageWorkspace' && (authenticated ? <ManageWorkspace /> : <div>Access Denied. Please log in.</div>)}
        </div>
    );
}

export default Home;
