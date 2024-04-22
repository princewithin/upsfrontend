import React from "react";

function DashboardComponent() {
  return (
    <div>
      <div className="container-fluid">
      <div className="row g-3 my-2">
        <div className="col-md-3 p-1">
          <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor: 'gray', color: 'white'}}>
            <div>
              <h3 className="fs-2">20%</h3>
              <p className="fs-5">DHL</p>
            </div>
            <i className="bi bi-cart-plus p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor: 'gray', color: 'white'}}>
            <div>
              <h3 className="fs-2">20%</h3>
              <p className="fs-5">Fedex</p>
            </div>
            <i className="bi bi-currency-dollar p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor: 'gray', color: 'white'}}>
            <div>
              <h3 className="fs-2">20%</h3>
              <p className="fs-5">UPS</p>
            </div>
            <i className="bi bi-truck p-3 fs-1"></i>
          </div>
        </div>
        <div className="col-md-3 p-1">
          <div className="p-3 bg-secondary shadow-sm d-flex justify-content-around align-items-center rounded" style={{backgroundColor: 'gray', color: 'white'}}>
            <div>
              <h3 className="fs-2">20%</h3>
              <p className="fs-5">XYZ</p>
            </div>
            <i className="bi bi-graph-up-arrow p-3 fs-1"></i>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default DashboardComponent;
