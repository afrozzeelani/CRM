import React, { useState, useEffect } from "react";
import axios from "axios";
import { IoMdInformationCircleOutline } from "react-icons/io";

const AttendanceDetails = () => {
  const [employeeId, setEmployeeId] = useState("");
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [hoveredDate, setHoveredDate] = useState(null);
  const [isInfoHovering, setIsInfoHovering] = useState(false);

  const handleMouseEnter = (date) => {
    setHoveredDate(date);
  };

  const handleMouseLeave = () => {
    setHoveredDate(null);
  };

  const handleInfoMouseEnter = () => {
    setIsInfoHovering(true);
  };

  const handleInfoMouseLeave = () => {
    setIsInfoHovering(false);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      });
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleEmployeeChange = (event) => {
    setEmployeeId(event.target.value);
  };

  const handleFetchAttendance = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/attendance/${employeeId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token") || ""}`
          }
        }
      );

      let singleUser = response.data.filter((val) => {
        return val.employeeObjID && val.employeeObjID._id === employeeId;
      });

      setAttendanceData(singleUser.length > 0 ? singleUser[0] : null);
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  };

  const getTotalHolidays = () => {
    if (
      attendanceData &&
      attendanceData.user &&
      attendanceData.user.holidayObjID
    ) {
      return attendanceData.user.holidayObjID.holidays.length;
    }
    return 0;
  };

  const getMonthName = (monthNumber) => {
    switch (monthNumber) {
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

  const getLogStatus = (status) => {
    switch (status) {
      case "login":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "green", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "green"
              }}
              className="spinner-grow"
            ></div>
            Login
          </span>
        );
      case "logout":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "red", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "red"
              }}
              className="spinner-grow"
            ></div>
            Logout
          </span>
        );
      case "Break":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "orange", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "orange"
              }}
              className="spinner-grow"
            ></div>
            Break
          </span>
        );
      case "Login":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "green", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "green"
              }}
              className="spinner-grow"
            ></div>
            Login
          </span>
        );
      case "Logout":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "red", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "red"
              }}
              className="spinner-grow"
            ></div>
            Logout
          </span>
        );
      case "resume":
        return (
          <span
            className="d-flex flex-nowrap align-items-center gap-2 fw-bold justify-content-end rounded-5 py-1 px-3 shadow-sm "
            style={{ color: "green", width: "fit-content" }}
          >
            <div
              style={{
                height: "12px",
                width: "12px",
                borderRadius: "50%",
                backgroundColor: "green"
              }}
              className="spinner-grow"
            ></div>
            Resume
          </span>
        );
      default:
        return "";
    }
  };

  const getMonthsForYear = (year) => {
    if (year === new Date().getFullYear()) {
      return Array.from({ length: new Date().getMonth() + 1 }, (_, i) => i + 1);
    }
    return Array.from({ length: 12 }, (_, i) => i + 1);
  };

  const getYears = () => {
    if (attendanceData && attendanceData.years) {
      const currentYear = new Date().getFullYear();
      return attendanceData.years.filter((year) => year.year <= currentYear);
    }
    return [];
  };

  const millisecondsToTime = (milliseconds) => {
    const millisecond = Math.floor(milliseconds);
    const seconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    const formattedHours = String(hours).padStart(2, "0");
    const formattedMinutes = String(minutes % 60).padStart(2, "0");
    const formattedSeconds = String(seconds % 60).padStart(2, "0");
    const formattedMillisecond = String(millisecond % 60).padStart(2, "0");

    return `${formattedMinutes}hrs: ${formattedSeconds}min: ${formattedMillisecond}sec`;
  };

  const getAttendanceMark = (date) => {
    const loginTime = date && date.loginTime[0];
    if (loginTime) {
      const [loginHour, loginMinute] = loginTime.split(":").map(Number);
      if (loginHour > 9 || (loginHour === 9 && loginMinute > 45)) {
        return "Half Day";
      } else if (loginHour > 9 || (loginHour === 9 && loginMinute > 30)) {
        return "Late";
      }
    }
    return loginTime ? "Present" : "Absent";
  };

  return (
    <div className="d-flex flex-column p-5 gap-3">
      <div className="d-flex gap-3 ">
        <div>
          <select
            className="form-select w-100 shadow-sm text-muted"
            id="employeeId"
            value={employeeId}
            onChange={handleEmployeeChange}
          >
            <option value="" disabled>
              --Select an employee--
            </option>

            {employees
              .sort((a, b) => a.empID - b.empID)
              .map((employee) => (
                <option
                  className="text-uppercase"
                  key={employee._id}
                  value={employee._id}
                >
                  🪪 ({employee.empID}) {employee.FirstName}-{employee.LastName}
                </option>
              ))}
          </select>
        </div>

        <button
          className="btn shadow btn-dark fw-bolder"
          style={{ width: "fit-content" }}
          onClick={handleFetchAttendance}
        >
          Fetch Attendance
        </button>
      </div>

      {attendanceData && (
        <div className="d-flex gap-3">
          <div className="w-25">
            <label htmlFor="year">Select Year:</label>
            <select
              className="form-select shadow"
              id="year"
              value={selectedYear}
              onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            >
              {getYears().map((year) => (
                <option key={year.year} value={year.year}>
                  {year.year}
                </option>
              ))}
            </select>
          </div>
          <div className="w-25">
            <label htmlFor="month">Select Month:</label>
            <select
              className="form-select shadow"
              id="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {getMonthsForYear(selectedYear).map((month) => (
                <option key={month} value={month}>
                  {getMonthName(month)}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {attendanceData && (
        <div style={{ overflow: "auto", height: "80vh" }}>
          <table className="table">
            <thead>
              <tr
                style={{ position: "sticky", top: "0", zIndex: "3" }}
                className="shadow-sm"
              >
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Date
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Attendance Status
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Login Time
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Logout Time
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Break
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    cursor: "pointer"
                  }}
                >
                  Log Status
                </th>
              </tr>
            </thead>
            <tbody>
              {getYears().map((year) =>
                year.months
                  .filter((month) => month.month === selectedMonth)
                  .map((month) =>
                    month.dates
                      .sort((a, b) => a.date - b.date)
                      .map((date) => (
                        <tr
                          className="shadow-sm"
                          key={date.date}
                          id={`attendance-row-${date.date}`}
                          onMouseEnter={() => handleMouseEnter(date.date)}
                          onMouseLeave={() => handleMouseLeave()}
                        >
                          <td className="">
                            <span
                              style={{ height: "30px", width: "30px" }}
                              className="fw-bold d-flex justify-content-center align-items-center bg-info rounded-circle shadow-sm text-white"
                            >
                              {String(date.date).padStart(2, "0")}
                            </span>
                          </td>
                          <td
                            style={{ verticalAlign: "middle" }}
                            className="text-start"
                          >
                            <span
                              style={{ fontSize: ".8rem" }}
                              className={`py-1 px-3 rounded-5 shadow-sm fw-bold ${
                                getAttendanceMark(date) === "Present"
                                  ? "bg-success text-white"
                                  : getAttendanceMark(date) === "Late"
                                  ? "bg-info text-white"
                                  : getAttendanceMark(date) === "Half Day"
                                  ? "bg-warning text-white"
                                  : "bg-danger text-white"
                              }`}
                            >
                              {getAttendanceMark(date)}
                            </span>
                          </td>
                          <td className="text-uppercase">
                            {date.loginTime[0]}
                          </td>
                          <td className="text-uppercase">
                            {date.logoutTime[date.logoutTime.length - 1]}
                          </td>
                          <td className="position-relative bg-white">
                            <div
                              style={{
                                display: "flex ",
                                justifyContent: "start",
                                alignItems: "center"
                              }}
                              className="fs-6 gap-2 "
                              onMouseEnter={handleInfoMouseEnter}
                              onMouseLeave={handleInfoMouseLeave}
                            >
                              <span
                                style={{ fontSize: ".9rem" }}
                                className="fw-bold text-muted"
                              >
                                {millisecondsToTime(date.totalBrake)}
                              </span>{" "}
                              <IoMdInformationCircleOutline
                                style={{ fontSize: "1.1rem" }}
                                className="text-dark "
                              />
                            </div>
                            <div
                              style={{ zIndex: "5", right: "0%" }}
                              className="position-absolute"
                            >
                              {isInfoHovering && hoveredDate === date.date && (
                                <table className="table table-bordered table-striped">
                                  <thead>
                                    <tr className="shadow-sm">
                                      <th
                                        style={{
                                          whiteSpace: "pre",
                                          backgroundColor:
                                            "var(--primaryDashColorDark)",
                                          color: "var(--primaryDashMenuColor)"
                                        }}
                                      >
                                        Break
                                      </th>
                                      <th
                                        style={{
                                          whiteSpace: "pre",
                                          backgroundColor:
                                            "var(--primaryDashColorDark)",
                                          color: "var(--primaryDashMenuColor)"
                                        }}
                                      >
                                        Resume
                                      </th>
                                      <th
                                        style={{
                                          whiteSpace: "pre",
                                          backgroundColor:
                                            "var(--primaryDashColorDark)",
                                          color: "var(--primaryDashMenuColor)"
                                        }}
                                      >
                                        Total Break
                                      </th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {date.breakTime.map((breakTime, index) => (
                                      <tr className="shadow-sm" key={index}>
                                        <td
                                          className="text-uppercase text-center"
                                          style={{ whiteSpace: "pre" }}
                                        >
                                          {breakTime}
                                        </td>
                                        <td
                                          className="text-uppercase text-center"
                                          style={{ whiteSpace: "pre" }}
                                        >
                                          {date.ResumeTime[index]}
                                        </td>
                                        <td
                                          className="text-end"
                                          style={{ whiteSpace: "pre" }}
                                        >
                                          {millisecondsToTime(
                                            date.BreakData[index]
                                          )}
                                        </td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              )}
                            </div>
                          </td>
                          <td>{getLogStatus(date.status)}</td>
                        </tr>
                      ))
                  )
              )}
            </tbody>
          </table>
        </div>
      )}
      {attendanceData === null && (
        <div
          style={{
            height: "80vh",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            wordSpacing: "5px",
            flexDirection: "column",
            gap: "1rem"
          }}
        >
          <div className="fs-2 fw-bolder">
            <span className="spinner-border text-info" />
          </div>
          <p className="text-muted">
            User not selected. To view data, please select a user.
          </p>
        </div>
      )}
    </div>
  );
};

export default AttendanceDetails;
