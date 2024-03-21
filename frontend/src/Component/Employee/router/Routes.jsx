import React from "react";
import { Route } from "react-router-dom";
import PersonalInfo from "../EmpPresonal/PersonalInfo.jsx";
import Education from "../EmpEducation/Education.jsx";
import FamilyInfo from "../EmpFamily/FamilyInfo.jsx";
import WorkExperience from "../EmpWorkExp/WorkExperience.jsx";
import LeaveApplicationEmp from "../EmpLeave/LeaveApplicationEmp.jsx";
// import NotFound404 from "../../Pages/PageNot/NotFound404.jsx";
import EmployeeNewTask from "../EmployeeTaskManagement/EmployeeNewTask.jsx";
import EmployeeActiveTask from "../EmployeeTaskManagement/EmployeeActiveTask.jsx";
import EmployeeCompleteTask from "../EmployeeTaskManagement/EmployeeCompleteTask.jsx";
import EmployeeRejectTask from "../EmployeeTaskManagement/EmployeeRejectTask.jsx";
import Attendance from "../attendance/Attendance.jsx";
import AttendanceList from "../attendance/AttendanceList.jsx";
import EmpDash from "../Dashboard/EmpDash.jsx";
import LeaveApplicationEmpTable from "../EmpLeave/LeaveApplicationEmp.jsx";
// import DepartmentChart from "../../../Pages/Chart/DepartmentChart";
import DashContainer from "../../DashContainer.jsx";
import SelfAttendance from "../attendance/SelfAttendance.jsx";
import DepartmentChart from "../Dashboard/EmpChart.jsx/DepartmentChart.jsx";
import UpcomingBirthdays from "../Dashboard/CountData/UpcomingBirthdays.jsx";
import Notification from "../Notification/Notification.jsx";
const RouterContent = ({ data }) => {
  return (
    // <DashContainer>
    <div
      style={{ height: "100%", width: "100%", overflow: "auto" }}
      className="empSidebar d-flex flex-column"
    >
      <Route path="/employee/dashboard" exact component={EmpDash} />
      <Route
        exact
        path="/employee/:id/personal-info"
        render={(props) => <PersonalInfo data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/education"
        render={(props) => <Education data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/family-info"
        render={(props) => <FamilyInfo data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/work-experience"
        render={(props) => <WorkExperience data={data} back={false} />}
      />
      <Route
        exact
        path="/employee/:id/leave-application-emp"
        render={(props) => <LeaveApplicationEmp data={data} />}
      />
      <Route
        exact
        path="/employee/leaveApplication"
        render={(props) => <LeaveApplicationEmpTable data={data} />}
      />
      <Route
        exact
        path="/employee/:id/leave-application-emp"
        render={(props) => <LeaveApplicationEmp data={data} />}
      />
      <Route
        exact
        path="/employee/:id/attenDance"
        render={(props) => <Attendance data={data} />}
      />
      <Route
        exact
        path="/employee/:id/attendanceList"
        render={(props) => <AttendanceList data={data} />}
      />
      <Route
        exact
        path="/employee/:id/departmentchart"
        render={(props) => <DepartmentChart data={data} />}
      />
      <Route path="/employee/newTask" exact component={EmployeeNewTask} />
      <Route path="/employee/activeTask" exact component={EmployeeActiveTask} />
      <Route
        path="/employee/taskcomplete"
        exact
        component={EmployeeCompleteTask}
      />
      <Route path="/employee/taskreject" exact component={EmployeeRejectTask} />
      <Route
        path="/employee/:id/selfAtteend"
        exact
        component={SelfAttendance}
      />
      <Route
        path="/employee/:id/birthDay"
        exact
        component={UpcomingBirthdays}
      />
      <Route path="/employee/notification" exact component={Notification} />
    </div>
    // </DashContainer>
  );
};

export default RouterContent;
