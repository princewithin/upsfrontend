import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './Ratechart.css'; // Import your custom CSS file for additional styling

const WeightTable = ({ title, data }) => {
    return (
        <div className="table-container">
            <h2 className="text-center">{title}</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '200px' }}>Kg</th>
                            {[...Array(14).keys()].map((index) => (
                                <th key={index} className="text-center">Zone {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-center">{row.kg}</td>
                                {row.zones.map((zone, zoneIndex) => (
                                    <td key={zoneIndex} className="text-center">{zone}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

const RateMultiplierTable = ({ title, data }) => {
    return (
        <div className="table-container">
            <h2 className="text-center">{title}</h2>
            <div className="table-responsive">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th className="text-center" style={{ width: '200px' }}>Kg</th>
                            {[...Array(14).keys()].map((index) => (
                                <th key={index} className="text-center">Zone {index + 1}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row, rowIndex) => (
                            <tr key={rowIndex}>
                                <td className="text-center">{row.kg}</td>
                                {row.zones.map((zone, zoneIndex) => (
                                    <td key={zoneIndex} className="text-center">{zone}</td>
                                ))}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

function RateChartComponent() {
    // Sample data for tables
    const dhlDocumentDataUpTo2Kg = [
        // Data for DHL Document up to 2 kg
        { kg: '0.5 kg', zones: ['$10', '$12', '$15', '$20', '$25', '$30', '$35', '$40', '$45', '$50', '$55', '$60', '$65', '$65'] },
        { kg: '1 kg', zones: ['$15', '$18', '$22', '$28', '$35', '$42', '$49', '$56', '$63', '$70', '$77', '$84', '$91', '$65'] },
        { kg: '1.5 kg', zones: ['$20', '$24', '$30', '$36', '$45', '$54', '$63', '$72', '$81', '$90', '$99', '$108', '$117', '$65'] },
        { kg: '2 kg', zones: ['$25', '$30', '$37', '$44', '$55', '$66', '$77', '$88', '$99', '$110', '$121', '$132', '$143', '$65'] },
    ];

    const dhlDocumentData2KgTo30Kg = [
        // Data for DHL Document 2 kg to 30 kg
        { kg: '0.5 kg', zones: ['$10', '$12', '$15', '$20', '$25', '$30', '$35', '$40', '$45', '$50', '$55', '$60', '$65', '$65'] },
        { kg: '1 kg', zones: ['$15', '$18', '$22', '$28', '$35', '$42', '$49', '$56', '$63', '$70', '$77', '$84', '$91', '$65'] },
        { kg: '1.5 kg', zones: ['$20', '$24', '$30', '$36', '$45', '$54', '$63', '$72', '$81', '$90', '$99', '$108', '$117', '$65'] },
        { kg: '2 kg', zones: ['$25', '$30', '$37', '$44', '$55', '$66', '$77', '$88', '$99', '$110', '$121', '$132', '$143', '$65'] },
    ];

    const rateMultiplierData = [
        // Data for Rate Multiplier table
        { kg: '30.1 kg - 50 kg', zones: ['$10', '$12', '$15', '$20', '$25', '$30', '$35', '$40', '$45', '$50', '$55', '$60', '$65', '$70'] },
        { kg: '50.1 kg - 70 kg', zones: ['$15', '$18', '$22', '$28', '$35', '$42', '$49', '$56', '$63', '$70', '$77', '$84', '$91', '$98'] },
    ];

    return (
        <div className="container-fluid"> {/* Use fluid container for responsiveness */}
            <h1 className="text-center">Ratechart Component</h1>
            {/* Add WeightTable and RateMultiplierTable components */}
            <WeightTable title="Document up to 2 kg" data={dhlDocumentDataUpTo2Kg} />
            <WeightTable title="Non Documents from 0.5kg and document from 2.5kg" data={dhlDocumentData2KgTo30Kg} />
            <RateMultiplierTable title="Multiplier rate per 1 kg from 30.1 kg" data={rateMultiplierData} />
        </div>
    );
}

export default RateChartComponent;



