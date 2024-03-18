// // EmployeeChart.js
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chart from "react-apexcharts";

// const TaskChart = () => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error.message);
//       setError("Error fetching tasks. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   const taskStatusCounts = {
//     totalActiveTasks: tasks.filter((task) => task.status === "Pending").length,
//     newtask: tasks.filter((task) => task.status === "Pending").length,
//     complete: tasks.filter((task) => task.status === "complete").length
//   };

//   const taskStatusChartData = {
//     options: {
//       chart: {
//         id: "task-status-chart",
//         type: "bar"
//       },
//       xaxis: {
//         categories: Object.keys(taskStatusCounts),
//         title: {
//           text: "Task Status"
//         }
//       },
//       yaxis: {
//         title: {
//           text: "Number of Tasks"
//         }
//       }
//     },
//     series: [
//       {
//         name: "Task Status",
//         data: Object.values(taskStatusCounts)
//       }
//     ]
//   };

//   return (
//     <div className="chart_container">
//       <div className="chart_heading p-2">
//         <h2>Task Progress Report</h2>
//       </div>
//       <Chart
//         options={taskStatusChartData.options}
//         series={taskStatusChartData.series}
//         type="bar"
//         height="85%"
//       />
//     </div>
//   );
// };

// export default TaskChart;
/********************************************************************** */

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Table from "react-bootstrap/Table";

// const EmployeeNewTask = (props) => {
//   const [tasks, setTasks] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isCanceling, setIsCanceling] = useState(false);
//   const [isCompleting, setIsCompleting] = useState(false);
//   const [email, setEmail] = useState(null);

//   // const [totalNewTasksLength, setTotalNewTasksLength] = useState(0);
//   // const [acceptedTasks, setAcceptedTasks] = useState([]);
//   // const [rejectedTasks, setRejectedTasks] = useState([]);
//   // const [completedTasks, setCompletedTasks] = useState([]);
//   const [pendingTasks, setPendingTasks] = useState([]);
//   const [acceptedTasks, setAcceptedTasks] = useState([]);
//   const [rejectedTasks, setRejectedTasks] = useState([]);
//   const [completedTasks, setCompletedTasks] = useState([]);
//   const [lateTasks, setLateTasks] = useState([]);
//   const [onTimeTasks, setOnTimeTasks] = useState([]);

//   const id = localStorage.getItem("_id");

//   useEffect(() => {
//     const loadPersonalInfoData = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:4000/api/personal-info/${id}`,
//           {
//             headers: {
//               authorization: localStorage.getItem("token") || ""
//             }
//           }
//         );
//         setEmail(response.data.Email);
//       } catch (error) {
//         console.error("Error fetching employees:", error);
//       }
//     };

//     loadPersonalInfoData();
//   }, []);

//   const calculateRemainingTime = (endDate) => {
//     const now = new Date();
//     const endDateTime = new Date(endDate);
//     let remainingTime = endDateTime - now;

//     if (remainingTime < 0) {
//       remainingTime = Math.abs(remainingTime);
//       return { delay: true, days: 0, hours: 0, minutes: 0 };
//     } else {
//       const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
//       const hours = Math.floor(
//         (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
//       );
//       const minutes = Math.floor(
//         (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
//       );
//       return { delay: false, days, hours, minutes };
//     }
//   };

//   const fetchData = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/api/tasks");
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error.message);
//       setError("Error fetching tasks. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     // Update task categories whenever tasks change
//     setPendingTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Pending" &&
//           task.employees.some((taskemp) => taskemp.empemail === email)
//       )
//     );

//     setAcceptedTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Accepted" &&
//           task.employees.some((taskemp) => taskemp.empemail === email)
//       )
//     );

//     setRejectedTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Rejected" &&
//           task.employees.some((taskemp) => taskemp.empemail === email)
//       )
//     );

//     setCompletedTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Completed" &&
//           task.employees.some((taskemp) => taskemp.empemail === email)
//       )
//     );

//     setLateTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Pending" &&
//           task.employees.some((taskemp) => taskemp.empemail === email) &&
//           calculateRemainingTime(task.endDate).delay
//       )
//     );

//     setOnTimeTasks(
//       tasks.filter(
//         (task) =>
//           task.status === "Pending" &&
//           task.employees.some((taskemp) => taskemp.empemail === email) &&
//           !calculateRemainingTime(task.endDate).delay
//       )
//     );
//   }, [tasks, email]);

//   const acceptTask = async (taskId, empEmail) => {
//     // ... (existing code)
//   };

//   const rejectTask = async (taskId, empEmail) => {
//     // ... (existing code)
//   };

//   const completeTask = async (taskId, empEmail) => {
//     // ... (existing code)
//   };

//   return (
//     <div>
//       <h1 className="fs-3 fw-bolder text-uppercase ">🌟New Task ({}) </h1>
//       {loading && (
//         <div
//           style={{ width: "100%", height: "100%" }}
//           className="d-flex aline-center gap-2"
//         >
//           <div
//             className="spinner-grow bg-primary"
//             style={{ width: "1rem", height: "1rem" }}
//             role="status"
//           ></div>
//           <span className="text-primary fw-bold">Loading...</span>
//         </div>
//       )}
//       {error && <p className="text-danger">{error}</p>}
//       <div
//         style={{
//           overflowY: "scroll",
//           height: "80vh",
//           scrollbarWidth: "thin",
//           scrollbarGutter: "stable",
//           scrollMargin: "1rem"
//         }}
//       >
//         {/* ... (existing code) */}
//         {/* Display the total number of tasks */}
//         <div>
//           <p>Total pending Tasks: {pendingTasks.length}</p>
//           <p>Total accepted Tasks: {acceptedTasks.length}</p>
//           <p>Total rejected Tasks: {rejectedTasks.length}</p>
//           <p>Total Completed Tasks: {completedTasks.length}</p>
//           <p>Total late Tasks: {lateTasks.length}</p>
//           <p>Total ontime Tasks: {onTimeTasks.length}</p>
//         </div>
//         {/* ... (existing code) */}
//       </div>
//     </div>
//   );
// };

// export default EmployeeNewTask;
// *********************************************************************************************************
import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { BsFiletypeDoc } from "react-icons/bs";
import { Table } from "react-bootstrap";

const EmployeeNewTask = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [email, setEmail] = useState(null);

  const id = localStorage.getItem("_id");

  useEffect(() => {
    const loadPersonalInfoData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/personal-info/${id}`,
          {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
        );
        setEmail(response.data.Email);
      } catch (error) {
        console.error("Error fetching employees:", error);
      }
    };

    loadPersonalInfoData();
  }, []);

  const calculateRemainingTime = (endDate) => {
    const now = new Date();
    const endDateTime = new Date(endDate);
    let remainingTime = endDateTime - now;

    if (remainingTime < 0) {
      // If remaining time is negative, consider it as delay
      remainingTime = Math.abs(remainingTime);
      return { delay: true, days: 0, hours: 0, minutes: 0 };
    } else {
      // Calculate remaining days, hours, minutes, and seconds
      const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor(
        (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
      );
      return { delay: false, days, hours, minutes };
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/api/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error.message);
      setError("Error fetching tasks. Please try again later.");
    } finally {
      setLoading(false);
      setTimeout(fetchData, 60000);
    }
  };

  useEffect(() => {
    fetchData();

    return () => clearTimeout();
  }, []);

  // Count of different task statuses for the current employee
  const acceptedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email && taskemp.emptaskStatus === "Accepted"
    )
  ).length;

  const rejectedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email && taskemp.emptaskStatus === "Rejected"
    )
  ).length;

  const completedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email && taskemp.emptaskStatus === "Completed"
    )
  ).length;

  const pendingTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) => taskemp.empemail === email && task.status === "Pending"
    )
  ).length;

  const notAssignedButNotAcceptedTasksCount = tasks.filter(
    (task) =>
      !task.employees.some((taskemp) => taskemp.empemail === email) &&
      task.employees.every((taskemp) => taskemp.emptaskStatus !== "Accepted")
  ).length;

  const assignedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email && taskemp.emptaskStatus === "Task Assigned"
    )
  ).length;

  const notAcceptedAssignedTasksCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email &&
        taskemp.emptaskStatus === "Task Assigned" &&
        taskemp.emptaskStatus !== "Accepted"
    )
  ).length;

  const acceptedTasksNotCompletedOnTimeCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email &&
        taskemp.emptaskStatus === "Accepted" &&
        calculateRemainingTime(task.endDate).delay
    )
  ).length;

  const assignedTasksNotAcceptedOnTimeCount = tasks.filter((task) =>
    task.employees.some(
      (taskemp) =>
        taskemp.empemail === email &&
        taskemp.emptaskStatus === "Task Assigned" &&
        calculateRemainingTime(task.endDate).delay
    )
  ).length;

  return (
    <div>
      {/* ... (unchanged) */}
      <h1 className="fs-3 fw-bolder text-uppercase ">
        🌟New Task ({tasks.length})
      </h1>

      {/* <p>Accepted Tasks Count: {acceptedTasksCount}</p>
      <p>Rejected Tasks Count: {rejectedTasksCount}</p>
      <p>Completed Tasks Count: {completedTasksCount}</p>
      <p>Pending Tasks Count: {pendingTasksCount}</p> */}
      <p>
        Not Assigned but Not Accepted Tasks Count:{" "}
        {notAssignedButNotAcceptedTasksCount}
      </p>

      <p>Assigned Tasks Count: {assignedTasksCount}</p>
      <p>Not Accepted Assigned Tasks Count: {notAcceptedAssignedTasksCount}</p>

      <p>
        Accepted Tasks Not Completed On Time Count:{" "}
        {acceptedTasksNotCompletedOnTimeCount}
      </p>
      <p>
        Assigned Tasks Not Accepted On Time Count:{" "}
        {assignedTasksNotAcceptedOnTimeCount}
      </p>

      {/* ... (unchanged) */}
    </div>
  );
};

export default EmployeeNewTask;

// *************************************************************************

// -------------------------------------------------------------------------------
// import React, { useState, useEffect } from "react";
// // import "./DonutChart.css";
// import Chart from "react-apexcharts";
// import axios from "axios";

// const PieChart = () => {
//   const [chartOptions, setChartOptions] = useState({
//     options: {
//       labels: ["Accepted", "Rejected", "Completed", "New"],
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
//     series: [0, 0, 0, 0]
//   });

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await axios.get("http://localhost:4000/api/tasks");
//         const tasks = response.data;

//         const acceptedCount = tasks.filter((task) =>
//           task.employees.some((taskemp) => taskemp.emptaskStatus === "Accepted")
//         ).length;

//         const rejectedCount = tasks.filter((task) =>
//           task.employees.some((taskemp) => taskemp.emptaskStatus === "Rejected")
//         ).length;

//         const completedCount = tasks.filter((task) =>
//           task.employees.some(
//             (taskemp) => taskemp.emptaskStatus === "Completed"
//           )
//         ).length;

//         const newCount = tasks.filter(
//           (task) =>
//             task.status === "Pending" &&
//             task.employees.every(
//               (taskemp) =>
//                 taskemp.emptaskStatus !== "Accepted" &&
//                 taskemp.emptaskStatus !== "Rejected" &&
//                 taskemp.emptaskStatus !== "Completed"
//             )
//         ).length;

//         setChartOptions((prevOptions) => ({
//           ...prevOptions,
//           series: [acceptedCount, rejectedCount, completedCount, newCount]
//         }));
//       } catch (error) {
//         console.error("Error fetching tasks:", error.message);
//         // Handle error
//       }
//     };

//     fetchData();
//   }, []);

//   return (
//     <>
//       <div className="chart_container">
//         <div className="chart_heading">
//           <h2>Task Status Overview</h2>
//         </div>
//         <Chart
//           options={chartOptions.options}
//           series={chartOptions.series}
//           type="donut"
//           width="100%"
//           height="260px"
//         />
//       </div>
//     </>
//   );
// };

// export default PieChart;
