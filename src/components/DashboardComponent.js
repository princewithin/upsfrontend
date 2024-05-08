// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import DraftDetails from "./DraftDetails";
// import QuotationDetails from "./QuotationDetails";
// import ShippingForm from "./ShippingForm";
// import { useNavigate } from 'react-router-dom';
// import { css } from "@emotion/react";
// import { RingLoader } from "react-spinners";
// import "./DashboardComponent.css";
 
// function DashboardComponent() {
//   const [orders, setOrders] = useState([]);
//   const [quotations, setQuotations] = useState([]);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [filter, setFilter] = useState("all");
//   const [currentComponent, setCurrentComponent] = useState(null);
//   const [selectedQuotation, setSelectedQuotation] = useState(null);
//   const [dropdownOpen, setDropdownOpen] = useState(false);
//   const [viewButtonName, setViewButtonName] = useState("View");
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();
 
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     setIsLoggedIn(!!user);
 
//     if (isLoggedIn) {
//       fetchData();
//     }
//   }, [isLoggedIn]);
 
//   useEffect(() => {
//     return () => {
//       setCurrentComponent(null);
//       setSelectedQuotation(null);
//     };
//   }, []);
 
//   useEffect(() => {
//     const timeout = setTimeout(() => setLoading(false), 2000);
//     return () => clearTimeout(timeout);
//   }, []);
 
//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/api/userData");
//       setQuotations(response.data);
//     } catch (error) {
//       console.error("Error fetching quotations:", error);
//     }
//   };
 
//   const handleFilterChange = (selectedFilter) => {
//     setFilter(selectedFilter);
//   };
 
//   const filteredQuotations = filter === "all"
//     ? quotations
//     : quotations.filter(quotation => quotation.dataToStore.status === filter);
 
//   const handleViewDetails = (quotation) => {
//     setSelectedQuotation(quotation);
//     if (quotation.dataToStore.status === "draft") {
//       setCurrentComponent("DraftDetails");
//     } else if (quotation.dataToStore.status === "confirm") {
//       setCurrentComponent("QuotationDetails");
//     }
//     setDropdownOpen(!dropdownOpen);
//     setViewButtonName(viewButtonName === "View" ? "Hide" : "View");
//   };
 
//   const handleEdit = (quotation) => {
//     navigate('/shippingForm', { state: { quotation } });
//   };
 
//   const handleCopy = (quotation) => {
//     navigate('/shippingForm', { state: { quotation: { ...quotation, _id: null, dataToStore: { ...quotation.dataToStore, status: 'draft' } } } });
//   };
 
//   const countConfirmedOrders = (service) => {
//     return orders.filter((order) => order.service === service && order.status === "confirm").length;
//   };
 
//   const override = css`
//     display: block;
//     margin: 0 auto;
//     border-color: red;
//   `;
 
//   return (
//     <div className="container-fluid">
//       {loading ? (
//         <div className="loader-overlay">
//           <RingLoader color={"#ff0000"} loading={true} css={override} size={200} />
//         </div>
//       ) : (
//         <div>
//           <div className="row g-3 my-2">
//             <div className="col-md-4 p-1">
//               <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: "gray", color: "white" }}>
//                 <div>
//                   <h3 className="fs-2">{countConfirmedOrders("DHL")}</h3>
//                   <p className="fs-5">DHL</p>
//                 </div>
//                 <i className="bi bi-cart-plus p-3 fs-1"></i>
//               </div>
//             </div>
//             <div className="col-md-4 p-1">
//               <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: "gray", color: "white" }}>
//                 <div>
//                   <h3 className="fs-2">{countConfirmedOrders("FedEx")}</h3>
//                   <p className="fs-5">FedEx</p>
//                 </div>
//                 <i className="bi bi-currency-dollar p-3 fs-1"></i>
//               </div>
//             </div>
//             <div className="col-md-4 p-1">
//               <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{ backgroundColor: "gray", color: "white" }}>
//                 <div>
//                   <h3 className="fs-2">{countConfirmedOrders("UPS")}</h3>
//                   <p className="fs-5">UPS</p>
//                 </div>
//                 <i className="bi bi-truck p-3 fs-1"></i>
//               </div>
//             </div>
//           </div>
//           <h1>Quotations</h1>
//           <div className="button-container">
//             <button onClick={() => handleFilterChange("all")}>All</button>
//             <button onClick={() => handleFilterChange("confirm")}>Confirm</button>
//             <button onClick={() => handleFilterChange("draft")}>Draft</button>
//           </div>
//           <table className="quotation-table">
//             <thead>
//               <tr>
//                 <th>Origin</th>
//                 <th>Destination</th>
//                 <th>Product Value</th>
//                 <th>Status</th>
//                 <th>Action</th>
//               </tr>
//             </thead>
//             <tbody>
//               {filteredQuotations.map((quotation, index) => (
//                 <React.Fragment key={quotation._id}>
//                   <tr>
//                     <td>{quotation.dataToStore.formData.origin}</td>
//                     <td>{quotation.dataToStore.formData.destination}</td>
//                     <td>{quotation.dataToStore.formData.productValue}</td>
//                     <td>{quotation.dataToStore.status}</td>
//                     <td>
//                       {quotation.dataToStore.status === "confirm" && (
//                         <React.Fragment>
//                           <button className="view-button" onClick={() => handleViewDetails(quotation)}>{quotation === selectedQuotation && viewButtonName}{quotation !== selectedQuotation && "View"}</button>{" "}
//                           <button className="view-button" onClick={() => handleCopy(quotation)}>Copy</button>{" "}
//                         </React.Fragment>
//                       )}
//                       {quotation.dataToStore.status === "draft" && (
//                         <React.Fragment>
//                           <button className="view-button" onClick={() => handleViewDetails(quotation)}>{quotation === selectedQuotation && viewButtonName}{quotation !== selectedQuotation && "View"}</button>{" "}
//                           <button className="view-button" onClick={() => handleEdit(quotation)}>Edit</button>{" "}
//                         </React.Fragment>
//                       )}
//                     </td>
//                   </tr>
//                   {dropdownOpen && quotation === selectedQuotation && (
//                     <tr className="dropdown-row">
//                       <td colSpan="5">
//                         <div className="dropdown-content">
//                           {currentComponent === "DraftDetails" && (
//                             <DraftDetails quotation={selectedQuotation} />
//                           )}
//                           {currentComponent === "QuotationDetails" && (
//                             <QuotationDetails quotation={selectedQuotation} />
//                           )}
//                         </div>
//                       </td>
//                     </tr>
//                   )}
//                 </React.Fragment>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }
 
// export default DashboardComponent;

import React, { useState, useEffect } from "react";
import axios from "axios";
import DraftDetails from "./DraftDetails";
import QuotationDetails from "./QuotationDetails";
import { css } from "@emotion/react";
import { RingLoader } from "react-spinners";
import "./DashboardComponent.css";
 

function DashboardComponent({ openShippingForm }) {
  const [orders, setOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState("all");
  const [currentComponent, setCurrentComponent] = useState(null);
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [loading, setLoading] = useState(true);
 
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    // const user = userData ? JSON.parse(userData) : null;
    setIsLoggedIn(!!user);
 
    if (isLoggedIn) {
      fetchData();
    }
  }, [isLoggedIn]);
 
  useEffect(() => {
    return () => {
      setCurrentComponent(null);
      setSelectedQuotation(null);
    };
  }, []);
 
  useEffect(() => {
    const timeout = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);
 
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/userData");
      setQuotations(response.data);
    } catch (error) {
      console.error("Error fetching quotations:", error);
    }
  };
  
 
  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };
 
  const filteredQuotations =
    filter === "all"
      ? quotations
      : quotations.filter(
          (quotation) => quotation.dataToStore.status === filter
        );
 
  const handleViewDetails = (quotation) => {
    if (selectedQuotation === quotation) {
      // If the clicked quotation is already open, close it
      setSelectedQuotation(null);
      setCurrentComponent(null);
    } else {
      // If a different quotation is clicked, open it
      setSelectedQuotation(quotation);
      if (quotation.dataToStore.status === "draft") {
        setCurrentComponent("DraftDetails");
      } else if (quotation.dataToStore.status === "confirm") {
        setCurrentComponent("QuotationDetails");
      }
    }
  };
 
   const handleCopy = (quotation) => {
    openShippingForm({
      quotation: {
        ...quotation,
        _id: null,
        dataToStore: { ...quotation.dataToStore, status: "draft" },
      },
      formData: quotation.dataToStore.formData, // Pass form data
    });
  };
 
  const handleEdit = (quotation) => {
    openShippingForm({
      quotation,
      formData: quotation.dataToStore.formData, // Pass form data
    });
  };
 
  const countConfirmedOrders = (service) => {
    return orders.filter(
      (order) => order.service === service && order.status === "confirm"
    ).length;
  };
 
  const override = css`
    display: block;
    margin: 0 auto;
    border-color: red;
  `;
 
  return (
    <div className="container-fluid">
      {loading ? (
        <div className="loader-overlay">
          <RingLoader
            color={"#ff0000"}
            loading={true}
            css={override}
            size={200}
          />
        </div>
      ) : (
        <div>
          <div className="row g-3 my-2">
            <div className="col-md-4 p-1">
              <div
                className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded"
                style={{ backgroundColor: "gray", color: "white" }}
              >
                <div>
                  <h3 className="fs-2">{countConfirmedOrders("DHL")}</h3>
                  <p className="fs-5">DHL</p>
                </div>
                <i className="bi bi-cart-plus p-3 fs-1"></i>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div
                className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded"
                style={{ backgroundColor: "gray", color: "white" }}
              >
                <div>
                  <h3 className="fs-2">{countConfirmedOrders("FedEx")}</h3>
                  <p className="fs-5">FedEx</p>
                </div>
                <i className="bi bi-currency-dollar p-3 fs-1"></i>
              </div>
            </div>
            <div className="col-md-4 p-1">
              <div
                className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded"
                style={{ backgroundColor: "gray", color: "white" }}
              >
                <div>
                  <h3 className="fs-2">{countConfirmedOrders("UPS")}</h3>
                  <p className="fs-5">UPS</p>
                </div>
                <i className="bi bi-truck p-3 fs-1"></i>
              </div>
            </div>
          </div>
          <h1>Quotations</h1>
          <div className="button-container">
            <button onClick={() => handleFilterChange("all")}>All</button>
            <button onClick={() => handleFilterChange("confirm")}>
              Confirm
            </button>
            <button onClick={() => handleFilterChange("draft")}>Draft</button>
          </div>
          <table className="quotation-table">
            <thead>
              <tr>
                <th>Id</th>
                <th>Origin</th>
                <th>Destination</th>
                <th>Product Value</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredQuotations.map((quotation, index) => (
                <React.Fragment key={quotation._id}>
                  <tr>
                    <td>{quotation._id}</td>
                    <td>{quotation.dataToStore.formData.origin}</td>
                    <td>{quotation.dataToStore.formData.destination}</td>
                    <td>{quotation.dataToStore.formData.productValue}</td>
                    <td>{quotation.dataToStore.status}</td>
                    <td>
                      {quotation.dataToStore.status === "confirm" && (
                        <React.Fragment>
                          <button
                            className="view-button"
                            onClick={() => handleViewDetails(quotation)}
                          >
                            {selectedQuotation === quotation && currentComponent
                              ? "Hide"
                              : "View"}
                          </button>{" "}
                          <button
                            className="view-button"
                            onClick={() => handleCopy(quotation)}
                          >
                            Copy
                          </button>{" "}
                        </React.Fragment>
                      )}
                      {quotation.dataToStore.status === "draft" && (
                        <React.Fragment>
                          <button
                            className="view-button"
                            onClick={() => handleViewDetails(quotation)}
                          >
                            {selectedQuotation === quotation && currentComponent
                              ? "Hide"
                              : "View"}
                          </button>{" "}
                          <button
                            className="view-button"
                            onClick={() => handleEdit(quotation)}
                          >
                            Edit
                          </button>{" "}
                        </React.Fragment>
                      )}
                    </td>
                  </tr>
                  {selectedQuotation === quotation && currentComponent === "DraftDetails" && (
                    <tr className="dropdown-row">
                      <td colSpan="5">
                        <div className="dropdown-content">
                          <DraftDetails quotation={selectedQuotation} />
                        </div>
                      </td>
                    </tr>
                  )}
                  {selectedQuotation === quotation && currentComponent === "QuotationDetails" && (
                    <tr className="dropdown-row">
                      <td colSpan="5">
                        <div className="dropdown-content">
                          <QuotationDetails quotation={selectedQuotation} />
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
 
export default DashboardComponent;