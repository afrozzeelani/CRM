// import React from "react";
// import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
// import TaskChart from "../../../Pages/Chart/TaskChart";
// import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
// import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
// import LeaveCount from "./CountData/LeavesCount";
// import EmplolyeeCount from "./CountData/EmployeeCount";
// import InnerDashContainer from "../../InnerDashContainer";
// import NoticeBoard from "../Notification/NoticeBoard";
// import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
// import LoginstatusCount from "./CountData/LoginstatusCount.jsx";
// const HRDash = () => {
//   return (
//     // <InnerDashContainer>
//     <div className="main-container">
//       <div className="row gap-0 mx-0">
//         <div className="col-lg-9">
//           <EmplolyeeCount />
//           <LeaveCount />

//           <div className="row row_flex mt-5">
//             <div className="col-lg-6">
//               <DepartmentChart />
//             </div>
//             <div className="col-lg-6">{/* <DailyAttendChart /> */}</div>
//           </div>
//           <div className="row row_flex mt-5">
//             <div className="col-lg-9">
//               <TaskChart />
//             </div>
//             <div className="col-lg-3">
//               <LoginstatusCount />
//             </div>
//           </div>
//         </div>
//         <div className="col-lg-3">
//           <UpcomingBirthdays />
//           <NoticeBoard />
//           <div className="holiday mt-3">
//             <HolidayList />
//           </div>
//           <div className="col-md-9"></div>
//         </div>
//       </div>
//     </div>
//     // </InnerDashContainer>
//   );
// };

// export default HRDash;

// // export default HRDash;
import React from "react";
import "./HRDash.css";
import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
import TaskChart from "../../../Pages/Chart/TaskChart";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import LeaveCount from "./CountData/LeavesCount";
import EmployeeCount from "./CountData/EmployeeCount";
import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
import NoticeBoard from "../Notification/NoticeBoard";
import { MdCreateNewFolder } from "react-icons/md";

const HRDash = () => {
  return (
    <div className="hrdashgrid-container container-fluid py-3">
      <div className="hrdashgrid dash-1">
        <EmployeeCount />
      </div>
      <div className="hrdashgrid dash-3">
        <LeaveCount />
      </div>
      <div className="hrdashgrid dash-7 px-3">
        <DailyAttendChart />
      </div>
      <div className="hrdashgrid dash-5 px-3">
        <DepartmentChart />
      </div>
      <div className="hrdashgrid dash-4 px-3">
        <TaskChart />
      </div>
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
