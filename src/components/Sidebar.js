import React from 'react';
import logo from './Image/logo.png';
function Sidebar({ setCurrentComponent }) {
    const handleDashboardClick = () => {
        setCurrentComponent('DashboardComponent');
    };

    const handleCalculateClick = () => {
        setCurrentComponent('CalculateComponent');
    };

    const handleRateChartClick = () => {
        setCurrentComponent('RateChartComponent');
    };
   

    return (
        <div className='bg-secondary sidebar p-2'>
            <div className='m-2'>
            <img src={logo} alt="Logo" style={{ width: '100%', height: '50px' }} />
            </div>
            <hr className='text-dark' />
            <div className='list-group list-group-flush'>
                <a className='list-group-item py-2' onClick={handleDashboardClick}>
                    <i className='bi bi-speedometer2 fs-5 me-3'></i>
                    <span style={{ cursor: 'pointer' }}>Dashboard</span>
                </a>
                <a className='list-group-item py-2' onClick={handleCalculateClick}>
                    <i className='bi bi-house fs-5 me-3'></i>
                    <span style={{ cursor: 'pointer' }}>Calculate</span>
                </a>
                <a className='list-group-item py-2' onClick={handleRateChartClick}>
                    <i className='bi bi-table fs-5 me-3'></i>
                    <span style={{ cursor: 'pointer' }}>Rate Chart</span>
                </a>
            </div>
        </div>
    );
}

export default Sidebar;
