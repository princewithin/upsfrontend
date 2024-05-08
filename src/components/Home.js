import { React, useState, useEffect } from 'react';
import ShippingForm from './ShippingForm';
import DashboardComponent from './DashboardComponent';
import RateChartComponent from './RateChartComponent';
import ManageWorkspace from './ManageWorkspace';
import { isAuthenticated } from '../ProtectedRoute';
import QuotationDetails from './QuotationDetails';
import DraftDetails from './DraftDetails';

function Home({ currentComponent, setCurrentComponent }) {
    const authenticated = isAuthenticated();
    const [currentQuotation, setCurrentQuotation] = useState(null);

    const openShippingForm = (quotationData) => {
        setCurrentQuotation(quotationData || '');
        setCurrentComponent('CalculateComponent');
    };
    
    useEffect(() => {
        if (currentComponent !== 'CalculateComponent') {
            setCurrentQuotation(null);  // Reset quotation data when not on CalculateComponent
        }
    }, [currentComponent]);  // Dependency on currentComponent to trigger the effect


    // const openShippingForm = (quotationData, shouldPrefill = false) => {
    //     // Only set the currentQuotation state if shouldPrefill is true
    //     if (shouldPrefill) {
    //         setCurrentQuotation(quotationData);
    //     } else {
    //         setCurrentQuotation(null); // Ensure no pre-filling if not required
    //     }
    //     setCurrentComponent('CalculateComponent');
    // };

    return (
        <div className='px-3'>
            {currentComponent === 'DashboardComponent' && <DashboardComponent openShippingForm={openShippingForm} />}
            {/* {
                currentComponent === 'CalculateComponent' && authenticated && (
                    currentQuotation ? <ShippingForm quotation={currentQuotation} /> : <ShippingForm />
                )
            } */}
            {currentComponent === 'CalculateComponent' && (authenticated ? <ShippingForm quotation={currentQuotation} /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'RateChartComponent' && (authenticated ? <RateChartComponent /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'ManageWorkspace' && (authenticated ? <ManageWorkspace /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'QuotationDetails' && (authenticated ? <QuotationDetails setCurrentComponent={setCurrentComponent} /> : <div>Access Denied. Please log in.</div>)}
            {currentComponent === 'DraftDetails' && (authenticated ? <DraftDetails setCurrentComponent={setCurrentComponent} /> : <div>Access Denied. Please log in.</div>)}
        </div>
    );
}

export default Home