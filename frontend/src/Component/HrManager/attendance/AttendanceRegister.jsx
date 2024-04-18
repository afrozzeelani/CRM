import React, { useEffect, useState } from "react";
import axios from "axios";
import BASE_URL from "../../../Pages/config/config";

function AttendanceRegister() {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1;
  const [filterMonth, setFilterMonth] = useState(currentMonth);
  const [filterYear, setFilterYear] = useState(currentYear);
  const [attendance, setAttendance] = useState([]);
  const [employee, setEmployees] = useState([]);

  useEffect(() => {
    fetchAttendanceData();
  }, [filterYear, filterMonth]);

  const fetchAttendanceData = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/api/attendance`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`
        }
      });
      setAttendance(response.data);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const daysInMonth = new Date(filterYear, filterMonth, 0).getDate();

  const markAttendance = (loginTime) => {
    if (!loginTime || loginTime.length === 0) {
      return { status: "--", color: "rgba(219, 216, 216, .8)" };
    } else {
      const loginHour = parseInt(loginTime.split(":")[0]);
      const loginMinute = parseInt(loginTime.split(":")[1]);

      if (loginHour < 9 || (loginHour === 9 && loginMinute < 30)) {
        return { status: "P", color: "#6BCB77" };
      } else if (loginHour === 9 && loginMinute < 45) {
        return { status: "L", color: "#41C9E2" };
      } else if (loginHour < 14 || (loginHour === 14 && loginMinute === 0)) {
        return { status: "H", color: "#FDA403" };
      } else {
        return { status: "A", color: "#EF4040" };
      }
    }
  };

  const uniqueYears = Array.from(
    new Set(
      attendance.flatMap((employee) => employee.years.map((year) => year.year))
    )
  );

  const uniqueMonths = Array.from(
    new Set(
      attendance.flatMap((employee) =>
        employee.years
          .filter((year) => year.year === filterYear)
          .flatMap((year) => year.months.map((month) => month.month))
      )
    )
  );

  const getUserStatusColor = (month) => {
    switch (month) {
      case 1:
        return "January";
      case 2:
        return "February";
      case 3:
        return "March";
      case 4:
        return "April";
      case 5:
        return "May";
      case 6:
        return "June";
      case 7:
        return "July";
      case 8:
        return "August";
      case 9:
        return "September";
      case 10:
        return "October";
      case 11:
        return "November";
      case 12:
        return "December";
      default:
        return "";
    }
  };

  const calculateTotal = (status) => {
    let total = 0;
    attendance.forEach((employee) => {
      const yearIndex = employee.years.findIndex(
        (year) => year.year === filterYear
      );
      const monthIndex = employee.years[yearIndex]?.months.findIndex(
        (month) => month.month === filterMonth
      );
      const dates = employee.years[yearIndex]?.months[monthIndex]?.dates || [];
      dates.forEach((date) => {
        const loginTime = date.loginTime[0];
        if (markAttendance(loginTime).status === status) {
          total++;
        }
      });
    });
    return total;
  };

  console.log(attendance[0]);

  return (
    <div className="container-fluid pb-5">
      <div className="d-flex justify-content-between py-3">
        <h5 className="my-auto">Employee Monthly Attendance</h5>
        <div className="d-flex gap-3">
          <div className="">
            <label>Filter Year</label>
            <select
              className="form-select"
              value={filterYear}
              onChange={(e) => setFilterYear(parseInt(e.target.value))}
            >
              <option value="">--Select Year--</option>
              {uniqueYears
                .sort(function (a, b) {
                  return a - b;
                })
                .map((year, index) => (
                  <option key={index} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
          <div className="">
            <label>Filter Month</label>
            <select
              className="form-select"
              value={filterMonth}
              onChange={(e) => setFilterMonth(parseInt(e.target.value))}
            >
              <option value="">--Select Month--</option>
              {uniqueMonths
                .sort(function (a, b) {
                  return a - b;
                })
                .map((month, index) => (
                  <option key={index} value={month}>
                    {getUserStatusColor(month)}
                  </option>
                ))}
            </select>
          </div>
        </div>
      </div>
      <div
        style={{
          overflow: "scroll auto",
          maxHeight: "80vh",
          position: "relative"
        }}
        className="border border-1 employee-attendence-table mt-3"
      >
        <table className="table table-bordered table-striped">
          <thead>
            <tr style={{ position: "sticky", top: "-2px" }}>
              <th
                style={{
                  whiteSpace: "pre",
                  backgroundColor: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)",
                  position: "sticky",
                  left: "0",
                  top: "0"
                }}
              >
                S.No
              </th>
              <th
                style={{
                  whiteSpace: "pre",
                  backgroundColor: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)",
                  position: "sticky",
                  left: "0",
                  top: "0"
                }}
              >
                Employee ID
              </th>
              <th
                style={{
                  whiteSpace: "pre",
                  backgroundColor: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)",
                  position: "sticky",
                  left: "-1px",
                  top: "0"
                }}
              >
                Employee Name
              </th>
              {/* Render days of the month */}
              {[...Array(daysInMonth)].map((_, day) => (
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)"
                  }}
                  className="text-center"
                  key={day}
                >
                  {(day + 1).toString().padStart(2, "0")}
                </th>
              ))}
              <th
                className="text-white"
                style={{ whiteSpace: "pre", backgroundColor: "#EF4040" }}
              >
                Total Absent
              </th>
              <th
                className="text-white"
                style={{ whiteSpace: "pre", backgroundColor: "#6BCB77" }}
              >
                Total Present
              </th>
              <th
                className="text-white"
                style={{ whiteSpace: "pre", backgroundColor: "#41C9E2" }}
              >
                Total Late
              </th>
              <th
                className="text-white"
                style={{ whiteSpace: "pre", backgroundColor: "#FDA403" }}
              >
                Total Halfday
              </th>
            </tr>
          </thead>
          <tbody>
            {attendance.map((employee, index) => (
              <tr key={employee.userId}>
                <td className="text-center">
                  {(index + 1).toString().padStart(2, "0")}
                </td>
                <td>{employee.employeeObjID.empID}</td>
                <td>
                  {employee.employeeObjID.FirstName}{" "}
                  {employee.employeeObjID.LastName}
                </td>
                {/* Calculate attendance for each day */}
                {[...Array(daysInMonth)].map((_, day) => {
                  const yearIndex = uniqueYears.indexOf(filterYear);
                  const monthIndex = uniqueMonths.indexOf(filterMonth);
                  const loginTimeForDay =
                    employee.years[yearIndex]?.months[monthIndex]?.dates[day]
                      ?.loginTime[0];
                  const { status, color } = markAttendance(loginTimeForDay);
                  return (
                    <td
                      className="fw-bold"
                      style={{
                        whiteSpace: "pre",
                        backgroundColor: color,
                        color: "white"
                      }}
                      key={day}
                    >
                      {status}
                    </td>
                  );
                })}
                <td className="text-center">{calculateTotal("Absent")}</td>
                <td className="text-center">{calculateTotal("Present")}</td>
                <td className="text-center">{calculateTotal("Late")}</td>
                <td className="text-center">{calculateTotal("Halfday")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AttendanceRegister;
