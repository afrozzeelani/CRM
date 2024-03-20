import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import "./chart.css";
import axios from "axios";

const DepartmentChart = () => {
  const [departmentData, setDepartmentData] = useState([]);
  const [chartOption, setChartOption] = useState({
    options: {
      labels: [],
      legend: {
        position: "bottom"
      },
      fill: {
        colors: [
          "#008DDA",
          "#4CCD99",
          "#FFC700",
          "#FF407D",
          "#9F70FD",
          "#FE7A36"
        ]
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true,
              total: {
                show: true
              }
            }
          }
        }
      }
    },
    series: []
  });

  const loadEmployeeData = () => {
    axios
      .get("http://localhost:4000/api/employee", {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        if (Array.isArray(response.data)) {
          setDepartmentData(
            response.data.map(
              (data) => data["department"][0]?.DepartmentName || ""
            )
          );
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const updateChartOptions = () => {
    const departmentCounts = {};
    departmentData.forEach((department) => {
      departmentCounts[department] = (departmentCounts[department] || 0) + 1;
    });

    const labels = Object.keys(departmentCounts);
    const series = labels.map((label) => departmentCounts[label]);

    setChartOption({
      options: {
        labels: labels,
        fill: {
          colors: [
            "#008DDA",
            "#4CCD99",
            "#FFC700",
            "#FF407D",
            "#9F70FD",
            "#FE7A36"
          ]
        },
        legend: {
          position: "bottom",
          labels: {
            colors: [
              "#008DDA",
              "#4CCD99",
              "#FFC700",
              "#FF407D",
              "#9F70FD",
              "#FE7A36"
            ]
          }
        },
        plotOptions: {
          pie: {
            donut: {
              labels: {
                colors: [
                  "#008DDA",
                  "#4CCD99",
                  "#FFC700",
                  "#FF407D",
                  "#9F70FD",
                  "#FE7A36"
                ],
                show: true,
                total: {
                  show: true,
                  colors: [
                    "#008DDA",
                    "#4CCD99",
                    "#FFC700",
                    "#FF407D",
                    "#9F70FD",
                    "#FE7A36"
                  ]
                }
              },
              colors: [
                "#008DDA",
                "#4CCD99",
                "#FFC700",
                "#FF407D",
                "#9F70FD",
                "#FE7A36"
              ]
            }
          }
        }
      },
      series: series
    });
  };

  useEffect(() => {
    updateChartOptions();
  }, [departmentData]);

  return (
    <>
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
            Employee By Department
          </h6>
        </div>
        <Chart
          options={chartOption.options}
          series={chartOption.series}
          type="donut"
          width="100%"
          height="380"
        />
      </div>
    </>
  );
};

export default DepartmentChart;
