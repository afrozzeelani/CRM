import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AiOutlineMore } from "react-icons/ai";
import { TbLogin } from "react-icons/tb";
import { TbLogin2 } from "react-icons/tb";

const TodaysAttendance = () => {
  const [activeCategory, setActiveCategory] = useState(null);
  const [attendanceData, setAttendanceData] = useState([]);

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/todays-attendance"
        );
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching today's attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  const Today = () => {
    const options = { day: "2-digit", month: "2-digit", year: "numeric" };
    return new Date()
      .toLocaleDateString(undefined, options)
      .split("/")
      .reverse()
      .join("-");
  };

  const today = new Date();
  const yyyy = today.getFullYear();
  let mm = today.getMonth() + 1;
  let dd = today.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  let dayCurrent = today.getDay();

  console.log("Today's Date:", `${dd}-${mm}-${yyyy}`);
  console.log("Day of the Week:", dayCurrent);

  const getAttendanceMark = (user) => {
    const loginTime = user.attendance && user.attendance.loginTime[0];
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

  const calculateTotalLoginTime = (loginTimeMs, logoutTimeMs) => {
    console.log("Login Time (ms):", loginTimeMs);
    console.log("Logout Time (ms):", logoutTimeMs);

    if (loginTimeMs && logoutTimeMs) {
      const totalMilliseconds = logoutTimeMs - loginTimeMs;
      console.log("Total Milliseconds:", totalMilliseconds);

      // Calculation logic...
      const hours = Math.floor(totalMilliseconds / (60 * 60 * 1000));
      const minutes = Math.floor(
        (totalMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
      return `${hours} H:${minutes} M:${seconds} S`;
    }
    return "--";
  };

  const calculatetotalBrake = (totalBrake) => {
    console.log("Total Break Time:", totalBrake);

    if (totalBrake) {
      const totalMilliseconds = totalBrake;
      console.log("Total Milliseconds:", totalMilliseconds);

      // Calculation logic...
      const hours = Math.floor(totalMilliseconds / (60 * 60 * 1000));
      const minutes = Math.floor(
        (totalMilliseconds % (60 * 60 * 1000)) / (60 * 1000)
      );
      const seconds = Math.floor((totalMilliseconds % (60 * 1000)) / 1000);
      return `${hours} H:${minutes} M:${seconds} S`;
    }
    return "--";
  };

  const status = (s) => {
    if (s == 0) {
      return "Sunday";
    }
    if (s == 1) {
      return "Monday";
    }
    if (s == 2) {
      return "Tuesday";
    }
    if (s == 3) {
      return "Wednedsy";
    }
    if (s == 4) {
      return "Thrusday";
    }
    if (s == 5) {
      return "Friday";
    }
    if (s == 6) {
      return "Saturday";
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex justify-content-between py-3">
        <h4 className="fw-bolder my-auto text-success mb-2">
          Today's Attendance
        </h4>
        <span className="p-0 fw-bolder fs-6 text-muted d-flex flex-column ">
          <span className="m-0 p-0 fs-6 text-center bg-white shadow-sm rounded-5 px-2">
            {" "}
            <span className="fw-bold">{dd}</span>-
            <span className="fw-bold">{mm}</span>-
            <span className="fw-bold">{yyyy}</span>
          </span>
          <span className="text-uppercase m-0 p-0 text-primary fs-4 text-center">
            {status(dayCurrent)}
          </span>
        </span>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Employee
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              <TbLogin /> Login Time
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              <TbLogin2 /> Logout Time
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Total Break
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Total Login
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Status
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Mark
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            >
              Break Count
            </th>
            <th
              style={{
                background: "var(--primaryDashColorDark)",
                color: "var(--primaryDashMenuColor)"
              }}
            ></th>
          </tr>
        </thead>
        <tbody>
          {attendanceData.map((user) => {
            const mark = getAttendanceMark(user);
            return (
              <tr key={user.userId}>
                <td className="fw-bold">
                  <div className="d-flex w-100 align-items-center gap-2">
                    <div
                      style={{
                        height: "43px",
                        width: "43px",
                        overflow: "hidden"
                      }}
                    >
                      <img
                        style={{
                          height: "100%",
                          width: "100%",
                          objectFit: "cover"
                        }}
                        src="https://tse3.mm.bing.net/th?id=OIP.-d8GY5axNJZYoXsNOUJ4iwAAAA&pid=Api&P=0&h=180"
                        alt=""
                      />
                    </div>
                    <div>
                      <p
                        style={{ fontSize: ".85rem" }}
                        className="p-0 m-0 w-100"
                      >
                        {user.empID}
                      </p>
                      <p
                        style={{ fontSize: ".95rem" }}
                        className="p-0 m-0 w-100 text-uppercase"
                      >
                        {user.FirstName} {user.LastName}
                      </p>
                    </div>
                  </div>
                </td>
                <td
                  style={{ verticalAlign: "middle" }}
                  className="text-uppercase"
                >
                  {user.attendance ? user.attendance.loginTime[0] : "N/A"}
                </td>
                <td
                  style={{ verticalAlign: "middle" }}
                  className="text-uppercase"
                >
                  {user.attendance
                    ? user.attendance.logoutTime[
                        user.attendance.logoutTime.length - 1
                      ]
                    : "N/A"}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {calculatetotalBrake(
                    user.attendance ? user.attendance.totalBrake : null
                  )}
                </td>
                <td style={{ verticalAlign: "middle" }}>
                  {calculateTotalLoginTime(
                    user.attendance ? user.attendance.loginTimeMs[0] : null,
                    user.attendance
                      ? user.attendance.logoutTimeMs[
                          user.attendance.logoutTimeMs.length - 1
                        ]
                      : null
                  )}
                </td>
                <td
                  className="text-capitalize"
                  style={{ verticalAlign: "middle" }}
                >
                  {user.attendance ? user.attendance.status : "N/A"}
                </td>
                
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  <span
                    style={{ fontSize: ".8rem" }}
                    className={`py-1 px-3 rounded-5 shadow-sm fw-bold ${
                      mark === "Present"
                        ? "bg-success text-white"
                        : mark === "Late"
                        ? "bg-info text-white"
                        : mark === "Half Day"
                        ? "bg-warning text-white"
                        : "bg-danger text-white"
                    }`}
                  >
                    {mark}
                  </span>
                </td>
                <td style={{ verticalAlign: "middle" }} className="text-center">
                  {user.attendance ? user.attendance.breakTime.length : "N/A"}
                </td>
                <td
                  style={{ zIndex: "1", verticalAlign: "middle" }}
                  className="text-center"
                >
                  <button
                    onMouseEnter={() => setActiveCategory(user)}
                    onMouseLeave={() => setActiveCategory(null)}
                    className=" btn p-0 fw-bold fs-5 position-relative"
                  >
                    <AiOutlineMore />{" "}
                    <span
                      style={{
                        display: activeCategory === user ? "flex" : "none"
                      }}
                    >
                      <Link
                        to="/hr/viewAttenDance"
                        style={{
                          position: "absolute",
                          whiteSpace: "pre",
                          right: "70%",
                          bottom: "-100%",
                          zIndex: "5"
                        }}
                        className="shadow p-2 fs-6"
                      >
                        Detailed
                      </Link>
                    </span>
                  </button>{" "}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default TodaysAttendance;
