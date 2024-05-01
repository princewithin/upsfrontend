import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import ShippingForm from "./ShippingForm";

 
function DashboardComponent() {
  const [orders, setOrders] = useState([]);
  const [dhlOrders, setDhlOrders] = useState([]);
  const [fedexOrders, setFedexOrders] = useState([]);
  const [upsOrders, setUpsOrders] = useState([]);
  const [quotations, setQuotations] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filter, setFilter] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the user is logged in (e.g., check if user data exists in localStorage)
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user);

    if (isLoggedIn) {
      fetchData(); // Fetch data only when user is logged in
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/userData');
      setQuotations(response.data);
    } catch (error) {
      console.error('Error fetching quotations:', error);
    }
  };


  const handleFilterChange = (selectedFilter) => {
    setFilter(selectedFilter);
  };

  const filteredQuotations = filter === 'all' ? quotations : quotations.filter(quotation => quotation.dataToStore.status === filter);

 
  useEffect(() => {
    // Fetch data from your API endpoint for all orders
    fetch("api/all-orders")
      .then((response) => response.json())
      .then((data) => {
        // Set all orders to state
        setOrders(data);
 
        // Filter orders for DHL
        setDhlOrders(data.filter((order) => order.service === "DHL"));
 
        // Filter orders for FedEx
        setFedexOrders(data.filter((order) => order.service === "FedEx"));
 
        // Filter orders for UPS
        setUpsOrders(data.filter((order) => order.service === "UPS"));
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // useEffect(() => {
  //   // Fetch data from backend when component mounts
  //   fetchData();
  // }, []);

  

  const handleRowClick = (quotation) => {
    // Implement navigation to detailed page here
    console.log('Clicked row:', quotation);
    if (quotation.dataToStore.status === 'draft') {
      // Redirect to the shipping form with form data as props
      navigate('/shippingForm', { state:{quotation} });
    }
  };
 
  // Function to count confirmed orders for a specific service
  const countConfirmedOrders = (service) => {
    return orders.filter((order) => order.service === service && order.status === "confirm").length;
  };
 
  return (
    <div>
      <div className="container-fluid">
        <div className="row g-3 my-2">
          {/* DHL Section */}
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
          {/* FedEx Section */}
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
          {/* UPS Section */}
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
        {/* <div>
          <table className="table caption-top bg-white rounded mt-2">
            <caption className="text-white fs-4">Recent Orders</caption>
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Service</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{order.firstName}</td>
                  <td>{order.lastName}</td>
                  <td>{order.service}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> */}
        <div>
      <h1>Quotations</h1>
      <div>
        <button onClick={() => handleFilterChange('all')}>All</button>
        <button onClick={() => handleFilterChange('confirm')}>Confirm</button>
        <button onClick={() => handleFilterChange('draft')}>Draft</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>Origin</th>
            <th>Destination</th>
            <th>Product Value</th>
            <th>Status</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {filteredQuotations.map((quotation) => (
            <tr key={quotation._id} onClick={() => handleRowClick(quotation)}>
              <td>{quotation.dataToStore.formData.origin}</td>
              <td>{quotation.dataToStore.formData.destination}</td>
              <td>{quotation.dataToStore.formData.productValue}</td>
              <td>{quotation.dataToStore.status}</td>
              {/* Add more table data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </div>
    </div>
  );
}
 
export default DashboardComponent;