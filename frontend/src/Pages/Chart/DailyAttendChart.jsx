import React, { useState, useEffect } from "react";
import axios from "axios";
import ReactApexChart from "react-apexcharts";
import BASE_URL from "../config/config";

const DailyAttendChart = () => {
  const [attendanceData, setAttendanceData] = useState([]);
  const [statusCounts, setStatusCounts] = useState({
    Present: 0,
    Late: 0,
    "Half Day": 0,
    Absent: 0
  });

  useEffect(() => {
    const fetchAttendanceData = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/todays-attendance`);
        setAttendanceData(response.data);
      } catch (error) {
        console.error("Error fetching today's attendance data:", error);
      }
    };

    fetchAttendanceData();
  }, []);

  useEffect(() => {
    const counts = attendanceData.reduce(
      (acc, user) => {
        const mark = getAttendanceMark(user);
        acc[mark]++;
        return acc;
      },
      { Late: 0, Present: 0, "Half Day": 0, Absent: 0 }
    );

    setStatusCounts(counts);
  }, [attendanceData]);

  const getAttendanceMark = (user) => {
    const loginTime = user.attendance && user.attendance.loginTime[0];
    if (loginTime) {
      const [loginHour, loginMinute] = loginTime.split(":").map(Number);
      if (loginHour > 9 || (loginHour === 9 && loginMinute >= 45)) {
        return "Half Day";
      } else if (loginHour > 9 || (loginHour === 9 && loginMinute > 30)) {
        return "Late";
      }
    }
    return loginTime ? "Present" : "Absent";
  };

  const seriesData = [
    statusCounts.Late,
    statusCounts.Present,
    statusCounts["Half Day"],
    statusCounts.Absent
  ];

  const chartOptions = {
    chart: {
      type: "polarArea"
    },
    stroke: {
      colors: ["#fff"]
    },
    fill: {
      opacity: 0.8
    },
    labels: ["Late", "Present", "Half Day", "Absent"], // Labels for each segment
    legend: {
      position: "bottom",
      labels: {
        useSeriesColors: true // Apply series colors to legend labels
      },
      markers: {
        width: 12,
        height: 12,
        strokeWidth: 0,
        strokeColor: "#fff",
        fillColors: undefined,
        radius: 12,
        offsetX: 0,
        offsetY: 0,
        onClick: undefined,
        customHTML: undefined,
        onClick: undefined,
        toggleOnLegendClick: true,
        itemMargin: {
          horizontal: 5,
          vertical: 5
        },
        onItemClick: {
          toggleDataSeries: true
        },
        onItemHover: {
          highlightDataSeries: true
        }
      }
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: "bottom"
          }
        }
      }
    ]
  };

  return (
    <div style={{ height: "fit-content" }} className="ChartCard p-2">
      <div className="ChartHeader">
        <h6
          style={{
            width: "fit-content",
            boxShadow: "0 0 10px 1px rgba(0,0,0,.2) inset",
            color: "var(--primaryDashColorDark)"
          }}
          className="fw-bolder d-flex px-3 rounded-5 py-1"
        >
          Today's Attendance
        </h6>
      </div>
      <ReactApexChart
        options={chartOptions}
        series={seriesData}
        type="polarArea"
      />
    </div>
    // <div>
    //   <div className="ChartCard shadow-sm ">
    //     <div className="ChartHeader">
    //       <div className="d-flex justify-content-between ">
    //         <h4 className="fw-bolder my-auto text-white ">
    //           Today's Attendance
    //         </h4>
    //       </div>
    //     </div>
    //     <div id="chart">
    //       <ReactApexChart
    //         options={chartOptions}
    //         series={seriesData}
    //         type="polarArea"
    //       />
    //     </div>
    //   </div>
    // </div>
  );
};

export default DailyAttendChart;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chart from "react-apexcharts";
// import ReactApexChart from "react-apexcharts";

// const DailyAttendChart = () => {
//   const [attendanceData, setAttendanceData] = useState([]);
//   const [statusCounts, setStatusCounts] = useState({
//     Present: 0,
//     Late: 0,
//     "Half Day": 0,
//     Absent: 0
//   });

//   const [chartOption, setChartOption] = useState({
//     options: {
//       labels: ["Late", "Present", "Half Day", "Absent"],
//       colors: ["#FFC764", "#00FFAB", "#FF884B", "#F65A83"],
//       plotOptions: {
//         pie: {
//           donut: {
//             labels: {
//               show: true,
//               total: {
//                 show: true
//               }
//             }
//           }
//         }
//       }
//     },
//     series: [
//       statusCounts.Late,
//       statusCounts.Present,
//       statusCounts["Half Day"],
//       statusCounts.Absent
//     ]
//   });

//   useEffect(() => {
//     const fetchAttendanceData = async () => {
//       try {
//         const response = await axios.get(
//           "${BASE_URL}/api/todays-attendance"
//         );
//         setAttendanceData(response.data);
//       } catch (error) {
//         console.error("Error fetching today's attendance data:", error);
//       }
//     };

//     fetchAttendanceData();
//   }, []);

//   const Today = () => {
//     const options = { day: "2-digit", month: "2-digit", year: "numeric" };
//     return new Date()
//       .toLocaleDateString(undefined, options)
//       .split("/")
//       .reverse()
//       .join("-");
//   };

//   const today = new Date();
//   const yyyy = today.getFullYear();
//   let mm = today.getMonth() + 1;
//   let dd = today.getDate();
//   if (dd < 10) dd = "0" + dd;
//   if (mm < 10) mm = "0" + mm;
//   let dayCurrent = today.getDay();

//   console.log("Today's Date:", `${dd}-${mm}-${yyyy}`);
//   console.log("Day of the Week:", dayCurrent);

//   useEffect(() => {
//     const counts = attendanceData.reduce(
//       (acc, user) => {
//         const mark = getAttendanceMark(user);
//         acc[mark]++;
//         return acc;
//       },
//       { Late: 0, Present: 0, "Half Day": 0, Absent: 0 }
//     );

//     setStatusCounts(counts);
//   }, [attendanceData]);

//   useEffect(() => {
//     setChartOption({
//       options: {
//         labels: ["Late", "Present", "Half Day", "Absent"],
//         colors: ["#FFC764", "#00FFAB", "#FF884B", "#F65A83"],
//         plotOptions: {
//           pie: {
//             donut: {
//               labels: {
//                 show: true,
//                 total: {
//                   show: true
//                 }
//               }
//             }
//           }
//         }
//       },
//       series: [
//         statusCounts.Late,
//         statusCounts.Present,
//         statusCounts["Half Day"],
//         statusCounts.Absent
//       ]
//     });
//   }, [statusCounts]);

//   const getAttendanceMark = (user) => {
//     const loginTime = user.attendance && user.attendance.loginTime[0];
//     if (loginTime) {
//       const [loginHour, loginMinute] = loginTime.split(":").map(Number);
//       if (loginHour > 9 || (loginHour === 9 && loginMinute >= 45)) {
//         return "Half Day";
//       } else if (loginHour > 9 || (loginHour === 9 && loginMinute > 30)) {
//         return "Late";
//       }
//     }
//     return loginTime ? "Present" : "Absent";
//   };
//   const status = (s) => {
//     if (s == 0) {
//       return "Sunday";
//     }
//     if (s == 1) {
//       return "Monday";
//     }
//     if (s == 2) {
//       return "Tuesday";
//     }
//     if (s == 3) {
//       return "Wednedsy";
//     }
//     if (s == 4) {
//       return "Thrusday";
//     }
//     if (s == 5) {
//       return "Friday";
//     }
//     if (s == 6) {
//       return "Saturday";
//     }
//   };

//   return (
//     <div style={{ height: "fit-content" }} className="ChartCard p-2">
//       <div className="ChartHeader">
//         <h6
//           style={{
//             width: "fit-content",
//             boxShadow: "0 0 10px 1px rgba(0,0,0,.2) inset",
//             color: "var(--primaryDashColorDark)"
//           }}
//           className="fw-bolder d-flex px-3 rounded-5 py-1"
//         >
//           Today's Attendance
//         </h6>
//       </div>
//       <Chart
//         options={chartOption.options}
//         series={chartOption.series}
//         type="donut"
//         width="100%"
//         height="300px"
//       />
//     </div>

//   );
// };

// export default DailyAttendChart;
