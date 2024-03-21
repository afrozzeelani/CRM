import React from "react";
import TaskChart from "./Chart/TaskChart";
import LeaveCount from "./CountData/LeavesCount";
import EmplolyeeCount from "./CountData/EmployeeCount";
import InnerDashContainer from "../../InnerDashContainer";
import UpcomingBirthdays from "../../../Pages/AddEmployee/UpcomingBirthdays";
import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import HolidayList from "../../../Pages/LeaveCalendar/HolidayList";
import TodatAttendance from "../../../Pages/Chart/DailyAttendChart";
import NoticeBoard from "../Notification/NoticeBoard";
const ManagerDash = () => {
  return (
    <InnerDashContainer>
      <div className="row gap-0 mx-0">
        <div className="col-lg-9">
          <EmplolyeeCount />
          <LeaveCount />

          <div className="row row_flex mt-5">
            <div className="col-lg-6">
              <TodatAttendance />
            </div>
            <div className="col-lg-6">
              <DepartmentChart />
            </div>
          </div>
          <div className="row row_flex">
            <div className="col-lg-8">
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
    </InnerDashContainer>
  );
};

export default ManagerDash;
