import React, { useState, useEffect } from "react";
import axios from "axios";
import { TfiReload } from "react-icons/tfi";
import { FaCircleInfo } from "react-icons/fa6";
import BASE_URL from "../../../Pages/config/config";

const AttendanceDetails = (props) => {
  const [employees, setEmployees] = useState([]);
  const [attendanceData, setAttendanceData] = useState(null);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

  const [hoveredDate, setHoveredDate] = useState(null);
  const [isInfoHovering, setIsInfoHovering] = useState(false);
  const employeeId = localStorage.getItem("_id");

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
      const response = await axios.get(
        `${BASE_URL}/api/employee/` + props.data["_id"],
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      );
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleFetchAttendance = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/attendance/${employeeId}`,
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

  useEffect(() => {
    handleFetchAttendance();
  }, [selectedYear, selectedMonth]); // Add dependencies to re-fetch attendance when year or month changes

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

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMillisecond}`;
  };

  const getAttendanceMark = (date) => {
    const loginTime = date && date.loginTime[0];
    if (loginTime) {
      const [loginHour, loginMinute] = loginTime.split(":").map(Number);
      if (loginHour > 9 || (loginHour === 9 && loginMinute > 45)) {
        return "H";
      } else if (loginHour > 9 || (loginHour === 9 && loginMinute > 30)) {
        return "L";
      }
    }
    return loginTime ? "P" : "A";
  };

  const calculateMonthlyTotals = () => {
    if (!attendanceData) return null;

    const monthlyData = attendanceData.years
      .find((yearData) => yearData.year === selectedYear)
      ?.months.find((month) => month.month === selectedMonth);

    if (monthlyData) {
      const totalWorkingHours = monthlyData.dates.reduce(
        (acc, date) => acc + date.totalLogAfterBreak,
        0
      );

      const totalPresent = monthlyData.dates.filter(
        (date) => getAttendanceMark(date) === "P"
      ).length;

      const totalAbsent = monthlyData.dates.filter(
        (date) => getAttendanceMark(date) === "A"
      ).length;

      const totalHalfDays = monthlyData.dates.filter(
        (date) => getAttendanceMark(date) === "H"
      ).length;

      return {
        totalWorkingHours,
        totalPresent,
        totalAbsent,
        totalHalfDays
      };
    }

    return null;
  };

  const monthlyTotals = calculateMonthlyTotals();

  return (
    <div className="d-flex flex-column p-5 gap-3">
      {attendanceData && (
        <div className="d-flex gap-3">
          <div>
            <label htmlFor="year">Select a year:</label>
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
          <div>
            <label htmlFor="month">Select a month:</label>
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

      {attendanceData && monthlyTotals && (
        <div style={{ overflow: "auto", height: "80vh" }}>
          <div className="mt-4">
            <h5>Monthly Totals</h5>
            <p>
              Total Working Hours:{" "}
              {millisecondsToTime(monthlyTotals.totalWorkingHours)}
            </p>
            <p>Total Present: {monthlyTotals.totalPresent}</p>
            <p>Total Absent: {monthlyTotals.totalAbsent}</p>
            <p>Total Half-Days: {monthlyTotals.totalHalfDays}</p>
          </div>

          <table className="table">
            <thead>
              <tr className="shadow-sm">{/* ... (unchanged) */}</tr>
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
                          {/* ... (unchanged) */}
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
            <TfiReload className="spinner-border text-info" />
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

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { TfiReload } from "react-icons/tfi";
// import { FaCircleInfo } from "react-icons/fa6";

// const AttendanceDetails = (props) => {
//   const [employees, setEmployees] = useState([]);
//   const [attendanceData, setAttendanceData] = useState(null);
//   const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
//   const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);

//   const [hoveredDate, setHoveredDate] = useState(null);
//   const [isInfoHovering, setIsInfoHovering] = useState(false);
//   const [presentCount, setPresentCount] = useState(0);
//   const [absentCount, setAbsentCount] = useState(0);
//   const [halfDayCount, setHalfDayCount] = useState(0);
//   const [totalPresentTime, setTotalPresentTime] = useState(0);
//   const [totalAbsentTime, setTotalAbsentTime] = useState(0);
//   const [totalHalfDayTime, setTotalHalfDayTime] = useState(0);

//   const employeeId = localStorage.getItem("_id");

//   const handleMouseEnter = (date) => {
//     setHoveredDate(date);
//   };

//   const handleMouseLeave = () => {
//     setHoveredDate(null);
//   };

//   const handleInfoMouseEnter = () => {
//     setIsInfoHovering(true);
//   };

//   const handleInfoMouseLeave = () => {
//     setIsInfoHovering(false);
//   };

//   useEffect(() => {
//     fetchEmployees();
//   }, []);

//   const fetchEmployees = async () => {
//     try {
//       const response = await axios.get(
//         "${BASE_URL}/api/employee/" + props.data["_id"],
//         {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         }
//       );
//       setEmployees(response.data);
//     } catch (error) {
//       console.error("Error fetching employees:", error);
//     }
//   };

//   const handleFetchAttendance = async () => {
//     try {
//       const response = await axios.get(
//         `${BASE_URL}/api/attendance/${employeeId}`,
//         {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token") || ""}`
//           }
//         }
//       );

//       let singleUser = response.data.filter((val) => {
//         return val.employeeObjID && val.employeeObjID._id === employeeId;
//       });

//       setAttendanceData(singleUser.length > 0 ? singleUser[0] : null);
//     } catch (error) {
//       console.error("Error fetching attendance data:", error);
//     }
//   };

//   useEffect(() => {
//     handleFetchAttendance();
//   }, []);

//   useEffect(() => {
//     if (attendanceData) {
//       let presentCount = 0;
//       let absentCount = 0;
//       let halfDayCount = 0;
//       let totalPresentTime = 0;
//       let totalAbsentTime = 0;
//       let totalHalfDayTime = 0;

//       attendanceData.years.forEach((year) => {
//         year.months.forEach((month) => {
//           month.dates.forEach((date) => {
//             const attendanceMark = getAttendanceMark(date);

//             if (attendanceMark === "P") {
//               presentCount++;
//               totalPresentTime += date.totalLogAfterBreak;
//             } else if (attendanceMark === "A") {
//               absentCount++;
//               totalAbsentTime += date.totalLogAfterBreak;
//             } else if (attendanceMark === "H" || attendanceMark === "L") {
//               halfDayCount++;
//               totalHalfDayTime += date.totalLogAfterBreak;
//             }
//           });
//         });
//       });

//       setPresentCount(presentCount);
//       setAbsentCount(absentCount);
//       setHalfDayCount(halfDayCount);
//       setTotalPresentTime(totalPresentTime);
//       setTotalAbsentTime(totalAbsentTime);
//       setTotalHalfDayTime(totalHalfDayTime);
//     }
//   }, [attendanceData]);

//   const getAttendanceMark = (date) => {
//     const loginTime = date && date.loginTime[0];
//     if (loginTime) {
//       const [loginHour, loginMinute] = loginTime.split(":").map(Number);
//       if (loginHour > 9 || (loginHour === 9 && loginMinute > 45)) {
//         return "H";
//       } else if (loginHour > 9 || (loginHour === 9 && loginMinute > 30)) {
//         return "L";
//       }
//     }
//     return loginTime ? "P" : "A";
//   };
//   const millisecondsToTime = (milliseconds) => {
//     const millisecond = Math.floor(milliseconds);
//     const seconds = Math.floor(milliseconds / 1000);
//     const minutes = Math.floor(seconds / 60);
//     const hours = Math.floor(minutes / 60);

//     const formattedHours = String(hours).padStart(2, "0");
//     const formattedMinutes = String(minutes % 60).padStart(2, "0");
//     const formattedSeconds = String(seconds % 60).padStart(2, "0");
//     const formattedMillisecond = String(millisecond % 60).padStart(2, "0");

//     return `${formattedHours}:${formattedMinutes}:${formattedSeconds}:${formattedMillisecond}`;
//   };
//   // ... (existing code)

//   return (
//     <div className="d-flex flex-column p-5 gap-3">
//       {attendanceData && (
//         <div>
//           <div>
//             <h3>Attendance Summary:</h3>
//             <p>Present Count: {presentCount}</p>
//             <p>Absent Count: {absentCount}</p>
//             <p>Half-Day Count: {halfDayCount}</p>
//             <p>Total Present Time: {millisecondsToTime(totalPresentTime)}</p>
//             <p>Total Absent Time: {millisecondsToTime(totalAbsentTime)}</p>
//             <p>Total Half-Day Time: {millisecondsToTime(totalHalfDayTime)}</p>
//           </div>
//         </div>
//       )}

//       {attendanceData && (
//         <div style={{ overflow: "auto", height: "80vh" }}>
//           {/* ... (existing code) */}
//         </div>
//       )}

//       {attendanceData === null && <div>{/* ... (existing code) */}</div>}
//     </div>
//   );
// };

// export default AttendanceDetails;
