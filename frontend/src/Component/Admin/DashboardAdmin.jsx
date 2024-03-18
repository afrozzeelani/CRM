
import React, { useState, useEffect } from "react";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar.jsx";
import AdminRoutes from "./Routes.jsx";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import "./DashboardAdmin.css";
// import InnerDashContainer from "../InnerDashContainer.jsx";
import DashContainer from "../DashContainer.jsx";

const DashboardAdmin = (props) => {
  const [checked, setChecked] = useState(true);

  const handleChange = () => {
    console.log("switch");

    if (checked) {
      document.getElementById("sidebar").setAttribute("class", "display-none");
    } else {
      document.getElementById("sidebar").setAttribute("class", "display-block");
    }

    setChecked(!checked);
  };

  return (
    <DashContainer>
      <Router>
        <div id="outer-main-div">
          <div id="outer-nav">
            <NavBar
              loginInfo={props.data}
              checked={checked}
              handleChange={handleChange}
              onLogout={props.onLogout}
            />
          </div>
          <div
            className="d-flex"
            style={{
              maxHeight: "100vh"
            }}
            id="main-non-nav"
          >
            <Sidebar />
            <div
              style={{ overflow: "hidden" }}
              className="HrDashBG w-100"
              id="main-area"
            >
              <AdminRoutes />
            </div>
          </div>
          {/* <div
            className="d-flex"
            style={{
              maxHeight: "100vh"
            }}
            id="main-non-nav"
          >
            {" "}
            
            <div className="AdminDashBG w-100" id="main-area">
              
            </div>
          </div> */}
        </div>
      </Router>
    </DashContainer>
  );
};

export default DashboardAdmin;
