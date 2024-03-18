import React, { useState } from "react";
import "../../HrManager/DashboardHR.css";
import { Link } from "react-router-dom";
import LeaveApplicationEmpTable from "../EmpLeave/LeaveApplicationEmp";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
import EmpTaskCount from "./CountData/EmpTaskCount";
// import DepartmentChart from "./EmpChart.jsx/DepartmentChart";
import DepartmentChart from "./EmpChart.jsx/DepartmentChart";
import Chart from "react-apexcharts";
import NoticeBoard from "../Notification/NoticeBoard";
import { IoIosArrowDroprightCircle } from "react-icons/io";
import EmpProfile from "./CountData/EmpProfile";

const EmpDash = (props) => {
  const [totalEmployeeLeave, setTotalEmployeeLeave] = useState(0);

  // Update total leave count when LeaveApplicationEmpTable component notifies
  const updateTotalEmployeeLeave = (count) => {
    setTotalEmployeeLeave(count);
  };

  return (
    <div className="row gap-0 mx-0">
      <div className="col-lg-9 mt-5">
        <div className="row row_flex ">
          <div className="col-lg-12">
            {" "}
            <EmpTaskChart />
          </div>
          <div className="col-lg-6"> {/* <EmpProfile /> */}</div>
        </div>
      </div>
      <div className="col-lg-3">
        <UpcomingBirthdays />
        <NoticeBoard />
        <div className="holiday mt-3">
          <HolidayList />
        </div>
        <div className="col-md-9"></div>
      </div>
    </div>
  );
};

export default EmpDash;
