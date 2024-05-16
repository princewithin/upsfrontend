import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RateComponent = () => {
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const labelMap = {
    fixchargedhl: "Fixed Charge",
    custommchargedhl: "Customs Charge",
    oversizesurchargedhl: "Oversize Surcharge",
    dutitaxdhl: "Duties and Taxes",
    elevatedriskchargedhl: "Elevated Risk Surcharge",
    restrictedcountrychargedhl: "Restricted Country Charge",
    fuelsurcharge: "Fuel Surcharge (%)",
    fuelchargedhl: "Fuel Surcharge (INR)",
    stackdhl: "Stackable Charge",
    excludinggst: "Total Excluding GST",
    gst: "GST",
    gst3: "GST (INR)",
    withgst: "Total Including GST",

    fixchargefedex: "Fixed Charge",
    custommchargefedex: "Customs Charge",
    oversizesurchargefedex: "Oversize Surcharge",
    dutitaxfedex: "Duties And Taxes",
    elevatedriskchargefedex: "Elevated Risk Surcharge",
    restrictedcountrychargefedex: "Restricted Country Charge",
    fuelsurchargefedex: "Fuel Surcharge (%)",
    fuelcharge: "Fuel Surcharge (INR)",
    stackfedex: "Stackable Charge",
    gstfedex: "GST",
    gst2: "GST (INR)",
    withgstfedex: "Total Including GST",

    fixchargeups: "Fixed Charge",
    custommchargeups: "Customs Charge",
    oversizesurchargeups: "Oversize Surcharge",
    dutitaxups: "Duties And Taxes",
    elevatedriskchargeups: "Elevated Risk Surcharge",
    restrictedcountrychargeups: "Restricted Country Charge",
    fuelsurchargeups: "Fuel Surcharge (%)",
    fueltax: "Fuel Surcharge (INR)",
    stackups: "Stackable Charge",
    totalPriceWithSur: "Total Excluding GST",
    gstups: "GST",
    gst1: "GST (INR)",
    withgstups: "Total Including GST"
};

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://3.109.157.15:5000/api/submitForm");
        let data = response.data; 
        data = data.sort((a, b) => {
          const priceA = a.withgst || a.withgstfedex || a.withgstups;
          const priceB = b.withgst || b.withgstfedex || b.withgstups;
          return parseFloat(priceA) - parseFloat(priceB);
        });

        setServices(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  // return (
  //   <div>
  //     <table>
  //       <tbody>
          
           
  //       </tbody>
  //     </table>
  //   </div>
  // );
}


export default RateComponent;
