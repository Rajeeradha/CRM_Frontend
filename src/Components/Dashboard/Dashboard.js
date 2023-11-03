import React from "react";

const Dashboard = () => {
  return (
    <>
      <div className="container my-4" style={{ width: "80%" }}>
        <div className="col main pt-5 mt-3">
          <h1 className="lead d-none d-sm-block fs-4 fw-normal">
            Add Leads, Contacts and Service request Details and Records
          </h1>

          <div className="row mb-3">
            <div className="col-xl-3 col-sm-6 py-2">
              <div className="card bg-success text-white h-100">
                <div
                  className="card-body bg-success"
                  style={{ backgroundColor: "#57b960" }}
                >
                  <div className="rotate">
                  <i class="fa-solid fa-users fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">Users</h6>
                  <h1 className="display-4">5</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
              <div className="card text-white bg-danger h-100">
                <div className="card-body bg-danger">
                  <div className="rotate">
                  <i class="fa-sharp fa-solid fa-user-tie fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">Leads</h6>
                  <h1 className="display-4">4</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
              <div className="card text-white bg-info h-100">
                <div className="card-body bg-info">
                  <div className="rotate">
                  <i class="fa-sharp fa-solid fa-building fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">Contacts</h6>
                  <h1 className="display-4">3</h1>
                </div>
              </div>
            </div>
            <div className="col-xl-3 col-sm-6 py-2">
              <div className="card text-white bg-warning h-100">
                <div className="card-body">
                  <div className="rotate">
                  <i class="fa-solid fa-handshake-angle fa-4x"></i>
                  </div>
                  <h6 className="text-uppercase">Service Request</h6>
                  <h1 className="display-4">2</h1>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
