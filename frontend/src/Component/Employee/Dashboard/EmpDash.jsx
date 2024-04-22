import React from "react";
import "./EmpDash.css";
// import "../../HrManager/DashboardHR.css";
import { Link } from "react-router-dom";
import LeaveApplicationEmpTable from "../EmpLeave/LeaveApplicationEmp";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
import DepartmentChart from "./EmpChart.jsx/DepartmentChart";
import NoticeBoard from "../Notification/NoticeBoard";
import EmpProfile from "./CountData/EmpProfile";
import { MdCreateNewFolder } from "react-icons/md";

const HRDash = () => {
  return (
    <div className="hrdashgrid-container container-fluid py-3">
      <div className="hrdashgrid dash-1">
        <EmpTaskChart />
      </div>
      {/* <div className="hrdashgrid dash-3">
        <LeaveApplicationEmpTable />
      </div> */}
      {/* <div className="hrdashgrid dash-7 px-3">
        <DailyAttendChart />
      </div> */}
      <div className="hrdashgrid dash-5 px-3">
        <DepartmentChart />
      </div>
      {/* <div className="hrdashgrid dash-4 px-3">
        <EmpTaskChart />
      </div> */}
      <div className="hrdashgrid dash-2">
        <NoticeBoard />
      </div>
      <div className="hrdashgrid dash-6">
        <HolidayList
          title={"Holiday List"}
          newFolderLink={"/hr/holiday"}
          holidayIcons={<MdCreateNewFolder />}
        />
      </div>
      <div className="hrdashgrid dash-8">
        <UpcomingBirthdays />
      </div>
    </div>
  );
};

export default HRDash;

// import React, { useState } from "react";
// import "../../HrManager/DashboardHR.css";
// import { Link } from "react-router-dom";
// import LeaveApplicationEmpTable from "../EmpLeave/LeaveApplicationEmp";
// import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
// import UpcomingBirthdays from "./CountData/UpcomingBirthdays";
// import EmpTaskChart from "./EmpChart.jsx/EmpTaskChart";
// import EmpTaskCount from "./CountData/EmpTaskCount";
// // import DepartmentChart from "./EmpChart.jsx/DepartmentChart";
// import DepartmentChart from "./EmpChart.jsx/DepartmentChart";
// import Chart from "react-apexcharts";
// import NoticeBoard from "../Notification/NoticeBoard";
// import { IoIosArrowDroprightCircle } from "react-icons/io";
// import EmpProfile from "./CountData/EmpProfile";

// const EmpDash = (props) => {
//   const [totalEmployeeLeave, setTotalEmployeeLeave] = useState(0);

//   // Update total leave count when LeaveApplicationEmpTable component notifies
//   const updateTotalEmployeeLeave = (count) => {
//     setTotalEmployeeLeave(count);
//   };

//   return (
//     <div className="row gap-0 mx-0">
//       <div className="col-lg-9 mt-5">
//         <div className="row row_flex ">
//           <div className="col-lg-12">
//             {" "}
//             <EmpTaskChart />
//           </div>
//           <div className="col-lg-6"> {/* <EmpProfile /> */}</div>
//         </div>
//       </div>
//       <div className="col-lg-3">
//         <UpcomingBirthdays />
//         <NoticeBoard />
//         <div className="holiday mt-3">
//           <HolidayList />
//         </div>
//         <div className="col-md-9"></div>
//       </div>
//     </div>
//   );
// };

// export default EmpDash;
