// // import React from "react";
// // import "./QuotationDetails.css";

// // function ServiceList({ quotation }) {
// //   function getWithGstValue(service) {
// //     if (service.service === 'dhl') {
// //       return service.data.withgst || 0; // default to 0 if undefined
// //     } else if (service.service === 'fedex') {
// //       return service.data.withgstfedex || 0;
// //     } else if (service.service === 'ups') {
// //       return service.data.withgstups || 0;
// //     }
// //     return 0; // default case if service type is not recognized
// //   }

// //   function sortServicesByGstTotal(services) {
// //     return services.sort((a, b) => {
// //       const gstA = getWithGstValue(a);
// //       const gstB = getWithGstValue(b);
// //       return gstA - gstB; // Ascending order
// //     });
// //   }



// //   // function sortServicesByGstTotal(services) {
// //   //   return services.sort((a, b) => {
// //   //     const gstA = getWithGstValue(a);
// //   //     const gstB = getWithGstValue(b);
// //   //     return gstA - gstB; // Ascending order
// //   //   });
// //   // }


// //   function ServiceList({ services }) {
// //     // Sort services based on their respective GST total
// //     const sortedServices = sortServicesByGstTotal([...services]); // Use a spread to avoid mutating the original array

// //     return (
// //       <div className="custom-service-container">
// //         {sortedServices.map((service, index) => (
// //           <div className="custom-service" key={index}>
// //             <h4>Total Price {service.service.toUpperCase()}: {getWithGstValue(service)}</h4>
// //             <div className="custom-breakdown">
// //               <h5>Price Breakdown:</h5>
// //               <table className="custom-table">
// //                 <tbody>
// //                   {Object.entries(service.data).map(([key, value], idx) => (
// //                     <tr key={idx}>
// //                       <td>{key}</td>
// //                       <td>{value}</td>
// //                     </tr>
// //                   ))}
// //                 </tbody>
// //               </table>
// //             </div>
// //           </div>
// //         ))}
// //       </div>
// //     );
// //   }}

// //   export default ServiceList;

// import React from "react";
// import "./QuotationDetails.css";

// const labelMap = {
//   fixchargedhl: "Basic Freight",
//   custommchargedhl: "Customs Clearance Charge",
//   oversizeSurChargeDhl: "Additional Handling Surcharges",
//   dutitaxdhl: "DDP Charges",
//   elevatedriskchargedhl: "Elevated Risk Surcharges",
//   restrictedcountrychargedhl: "Restricted Country Surcharges",
//   fuelsurcharge: "Fuel Surcharge (%)",
//   fuelchargedhl: "Fuel Surcharge (INR)",
//   stackdhl: "Non-Stackable Charges",
//   totalPriceWithSurdhl: "Total Excl. GST",
//   gst: "GST (%)",
//   gst3: "GST (INR)",
//   withgst: "Total Incl. GST",
//   Commodity: "Commodity",
//   v1: "VAS",

//   fixchargefedex: "Basic Freight",
//   custommchargefedex: "Customs Clearance Charge",
//   oversizesurchargefedex: "Additional Handling Surcharges",
//   dutitaxfedex: "DDP Charges",
//   elevatedriskchargefedex: "Elevated Risk Surcharge",
//   restrictedcountrychargefedex: "Restricted Country Charge",
//   fuelsurchargefedex: "Fuel Surcharge (%)",
//   fuelcharge: "Fuel Surcharge (INR)",
//   stackfedex: "Non-Stackable Charge",
//   totalPriceWithSurfedex: "Total Excl. GST",
//   gstfedex: "GST (%)",
//   gst2: "GST (INR)",
//   withgstfedex: "Total Incl. GST",
//   Commodity: "Commodity",
//   v2: "VAS",

//   fixchargeups: "Basic Freight",
//   custommchargeups: "Customs Clearance Charge",
//   oversizesurchargeups: "Additional Handling Surcharges",
//   dutitaxups: "DDP Charges",
//   elevatedriskchargeups: "Elevated Risk Surcharge",
//   restrictedcountrychargeups: "Restricted Country Charge",
//   fuelsurchargeups: "Fuel Surcharge (%)",
//   fueltax: "Fuel Surcharge (INR)",
//   totalPriceWithSurups: "Total Excl. GST",
//   stackups: "Non-Stackable Charge",
//   gstups: "GST(%)",
//   gst1: "GST (INR)",
//   withgstups: "Total Including GST",
//   Commodity: "Commodity",
//   v3: "VAS",
// };

// const handleDisplayLabel = (key) => labelMap[key]


// function ServiceList({ quotation }) {
//   function getWithGstValue(service) {
//     // Dynamically get the GST value based on the service type
//     if (service.service === 'dhl') {
//       return service.data.withgst || 0; // Assuming 'withgstdhl' as per earlier discussions
//     } else if (service.service === 'fedex') {
//       return service.data.withgstfedex || 0;
//     } else if (service.service === 'ups') {
//       return service.data.withgstups || 0;
//     }
//     return 0; // default case if service type is not recognized
//   }

//   function sortServicesByGstTotal(services) {
//     // Sort services based on their respective GST-inclusive total
//     return services.sort((a, b) => {
//       const gstA = getWithGstValue(a);
//       const gstB = getWithGstValue(b);
//       return gstA - gstB; // Ascending order
//     });
//   }

//   // Use a spread to avoid mutating the original array and sort the services
//   const sortedServices = sortServicesByGstTotal([...quotation.dataToStore.data]);

//   return (
//     <div className="custom-service-container">
//       <h1>confirm Quotation Details</h1>
//         <div className="custom-details">
//         {/* <p>User Email: {quotation.dataToStore.userEmail}</p>
//         <p>User ID: {quotation.dataToStore.userUid}</p>
//         <p>User Workspace: {quotation.dataToStore.userWorkspace}</p> */}
//         <p>Status: {quotation.dataToStore.status}</p>
//         <p>Origin: {quotation.dataToStore.formData.origin}</p>
//         <p>Destination: {quotation.dataToStore.formData.destination}</p>
//         <p>Product Value: {quotation.dataToStore.formData.productValue}</p>
//         <p>Type: {quotation.dataToStore.formData.type}</p>
//         <p>Packet Type: {quotation.dataToStore.formData.packetType}</p>
//         <p>Stackability: {quotation.dataToStore.formData.stackability}</p>
//         <p>Duties & Taxes: {quotation.dataToStore.formData.dutiesTaxes}</p>
//         <p>Commodity: {quotation.dataToStore.formData.commodity}</p>
//         <p>Status: {quotation.dataToStore.formData.status}</p>
//         </div>
//       {sortedServices.map((service, index) => (
//         <div className="custom-service" key={index}>
//           <h4>Total Price {service.service.toUpperCase()}: {getWithGstValue(service)}</h4>
//           <div className="custom-breakdown">
//             <h5>Price Breakdown:</h5>
//             <table className="custom-table">
//               <tbody>
//                 {Object.entries(service.data).map(([key, value], idx) => {
//                   if (labelMap[key]) {  // Only render if key is defined in the labelMap
//                     return (
//                       <tr key={idx}>
//                         <td>{labelMap[key]}</td>
//                         <td>{value}</td>
//                       </tr>
//                     );
//                   }
//                   return null;  // Return null for keys not in the labelMap, they won't be rendered
//                 })}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// export default ServiceList;


import React from "react";
import "./QuotationDetails.css";
 
const labelMap = {
  fixchargedhl: "Basic Freight",
  custommchargedhl: "Customs Clearance Charge",
  oversizeSurChargeDhl: "Additional Handling Surcharges",
  dutitaxdhl: "DDP Charges",
  elevatedriskchargedhl: "Elevated Risk Surcharges",
  restrictedcountrychargedhl: "Restricted Country Surcharges",
  fuelsurcharge: "Fuel Surcharge (%)",
  fuelchargedhl: "Fuel Surcharge (INR)",
  stackdhl: "Non-Stackable Charges",
  totalPriceWithSurdhl: "Total Excl. GST",
  gst: "GST (%)",
  gst3: "GST (INR)",
  withgst: "Total Incl. GST",
  Commodity: "Commodity",
  v1: "VAS",
 
  fixchargefedex: "Basic Freight",
  custommchargefedex: "Customs Clearance Charge",
  oversizesurchargefedex: "Additional Handling Surcharges",
  dutitaxfedex: "DDP Charges",
  elevatedriskchargefedex: "Elevated Risk Surcharge",
  restrictedcountrychargefedex: "Restricted Country Charge",
  fuelsurchargefedex: "Fuel Surcharge (%)",
  fuelcharge: "Fuel Surcharge (INR)",
  stackfedex: "Non-Stackable Charge",
  totalPriceWithSurfedex: "Total Excl. GST",
  gstfedex: "GST (%)",
  gst2: "GST (INR)",
  withgstfedex: "Total Incl. GST",
  Commodity: "Commodity",
  v2: "VAS",
 
  fixchargeups: "Basic Freight",
  custommchargeups: "Customs Clearance Charge",
  oversizesurchargeups: "Additional Handling Surcharges",
  dutitaxups: "DDP Charges",
  elevatedriskchargeups: "Elevated Risk Surcharge",
  restrictedcountrychargeups: "Restricted Country Charge",
  fuelsurchargeups: "Fuel Surcharge (%)",
  fueltax: "Fuel Surcharge (INR)",
  totalPriceWithSurups: "Total Excl. GST",
  stackups: "Non-Stackable Charge",
  gstups: "GST(%)",
  gst1: "GST (INR)",
  withgstups: "Total Including GST",
  Commodity: "Commodity",
  v3: "VAS",
};
 
const handleDisplayLabel = (key) => labelMap[key];
 
function ServiceList({ quotation }) {
  function getWithGstValue(service) {
    // Dynamically get the GST value based on the service type
    if (service.service === "dhl") {
      return service.data.withgst || 0; // Assuming 'withgstdhl' as per earlier discussions
    } else if (service.service === "fedex") {
      return service.data.withgstfedex || 0;
    } else if (service.service === "ups") {
      return service.data.withgstups || 0;
    }
    return 0; // default case if service type is not recognized
  }
 
  function sortServicesByGstTotal(services) {
    // Sort services based on their respective GST-inclusive total
    return services.sort((a, b) => {
      const gstA = getWithGstValue(a);
      const gstB = getWithGstValue(b);
      return gstA - gstB; // Ascending order
    });
  }
 
  // Use a spread to avoid mutating the original array and sort the services
  const sortedServices = sortServicesByGstTotal([
    ...quotation.dataToStore.data,
  ]);
 
  return (
<div className="details-container">
      <h1 style={{ marginLeft: "200px" }}>Confirm Quotation Details</h1>
      <div className="quotation-details">
        <div class="form-container">
          <div class="box">Origin: {quotation.dataToStore.formData.origin}</div>
          <div class="box">
            Destination: {quotation.dataToStore.formData.destination}
          </div>
          <div class="box">
            Product Value: {quotation.dataToStore.formData.productValue}
          </div>
          <div class="box">Type: {quotation.dataToStore.formData.type}</div>
          <div class="box">
            Packet Type: {quotation.dataToStore.formData.packetType}
          </div>
          <div class="box">
            Stackability: {quotation.dataToStore.formData.stackability}
          </div>
          <div class="box">
            Duties & Taxes: {quotation.dataToStore.formData.dutiesTaxes}
          </div>
          <div class="box">
            Commodity: {quotation.dataToStore.formData.commodity}
          </div>
          <div class="box">Status: {quotation.dataToStore.formData.status}</div>
        </div>
 
        <div className="custom-service-container" style={{ marginTop: "50px" }}>
          {sortedServices.map((service, index) => (
            <div className="custom-service" key={index}>
              <h4>
                Total Price {service.service.toUpperCase()}:{" "}
                {getWithGstValue(service)}
              </h4>
              <div className="custom-breakdown">
                <h5>Price Breakdown:</h5>
                <div className="table-wrapper">
                  {/* Wrap each table separately */}
                  <table className="custom-table">
                    <tbody>
                      {Object.entries(service.data).map(([key, value], idx) => {
                        if (labelMap[key]) {
                          return (
                            <tr key={idx}>
                              <td>{labelMap[key]}</td>
                              <td>{value}</td>
                            </tr>
                          );
                        }
                        return null;
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
 
export default ServiceList;