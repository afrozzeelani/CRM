import React, { useState } from "react";
import "./DashboardHR.css";
import { HashRouter as Router } from "react-router-dom";
import Sidebar from "./Sidebar.jsx";
import MainContent from "./Router.jsx";
import NavBar from "../../Pages/Navbar/NavBar.jsx";
import DashContainer from "../DashContainer.jsx";
import { useSidebar } from "../../Context/AttendanceContext/smallSidebarcontext.jsx";
import SidebarSmallScreen from "./SidebarSmallScreen.jsx";

const DashboardHR = (props) => {
  const [checked, setChecked] = useState(true);
  const { isOpen } = useSidebar();

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
        <div>
          <div>
            <NavBar
              loginInfo={props.data}
              checked={checked}
              handleChange={handleChange}
              onLogout={props.onLogout}
            />{" "}
          </div>
          <div className="d-flex">
            <Sidebar />
            <div className="p-0 w-100">
              <MainContent />
            </div>
          </div>
        </div>
      </Router>
    </DashContainer>
  );
};

export default DashboardHR;
