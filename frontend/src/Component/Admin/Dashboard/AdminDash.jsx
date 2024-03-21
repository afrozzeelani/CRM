import React from "react";
import "../AdminDash.css";
import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
import TaskChart from "../Dashboard/Chart/TaskChart";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import EmployeeCount from "./CountData/EmployeeCount";
import LeaveCount from "./CountData/LeavesCount";
import NoticeBoard from "../Notification/NoticeBoard";
import DailyAttendChart from "../../../Pages/Chart/DailyAttendChart";
const AdminDash = () => {
  return (
    <div className="main-container">
      <div className="row gap-0 mx-0">
        <div className="col-lg-9">
          <EmployeeCount />
          <LeaveCount />

          <div className="row row_flex mt-5">
            <div className="col-lg-6">
              <DailyAttendChart />
            </div>
            <div className="col-lg-6">
              <DepartmentChart />
            </div>
          </div>
          <div className="row row_flex mt-5">
            <div className="col-lg-9">
              <TaskChart />
            </div>
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
    </div>
  );
};

export default AdminDash;
