import React, { useState, useEffect } from "react";
import "./EmployeeTable.css";
import { LuSearch } from "react-icons/lu";
import { LiaPhoneSolid } from "react-icons/lia";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faEdit,
  faInfoCircle
} from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import "bootstrap/dist/css/bootstrap.min.css";
import { BsFillFileEarmarkPdfFill } from "react-icons/bs";
import { IoMdInformationCircleOutline } from "react-icons/io";
import {
  FaFilePdf,
  FaFilter,
  FaLocationArrow,
  FaRegEdit
} from "react-icons/fa";
import { MdDeleteForever, MdOutlineEmail } from "react-icons/md";
import { SiMinutemailer } from "react-icons/si";
import { TbPhoneCalling, TbUserEdit } from "react-icons/tb";
import { FcNumericalSorting12 } from "react-icons/fc";
import { FcNumericalSorting21 } from "react-icons/fc";
import { Form, Button, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from "../config/config";

// *************csv & pdf **************//
import jsPDF from "jspdf";
import "jspdf-autotable";
// import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { FiSearch } from "react-icons/fi";
// *************csv & pdf **************//

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminEmployeeTable = (props) => {
  const [employeeData, setEmployeeData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const [isIdFilterActive, setIsIdFilterActive] = useState(false);
  const [isIdSortAscending, setIsIdSortAscending] = useState(true);
  const [upcomingBirthdays, setUpcomingBirthdays] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("");
  const [activeProfile, setActiveProfile] = useState(null);

  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/employee`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        // Ensure that response.data is an array
        if (Array.isArray(response.data)) {
          setEmployeeData(response.data);
          setLoading(false);

          // Clear the state arrays
          setRowData([]);

          response.data.forEach((data) => {
            let temp = {
              data,
              Email: data["Email"],
              Password: data["Password"],
              Account:
                data["Account"] === 1
                  ? "Admin"
                  : data["Account"] === 2
                  ? "HR"
                  : data["Account"] === 3
                  ? "Employee"
                  : data["Account"] === 4
                  ? "Manager"
                  : "",

              RoleName: data["role"][0] ? data["role"][0]["RoleName"] : "",
              FirstName: data["FirstName"],
              MiddleName: data["MiddleName"],
              LastName: data["LastName"],
              DOB: data["DOB"].slice(0, 10),
              ContactNo: data["ContactNo"],
              // EmployeeCode: data["EmployeeCode"],
              empID: data["empID"],
              DepartmentName: data["department"][0]
                ? data["department"][0]["DepartmentName"]
                : "",
              PositionName: data["position"][0]
                ? data["position"][0]["PositionName"]
                : "",
              DateOfJoining: data["DateOfJoining"].slice(0, 10)
            };

            // Use set function to update state
            setRowData((prevData) => [...prevData, temp]);
          });
        } else {
          console.error("Data received is not an array:", response.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onEmployeeDelete = (e) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/employee/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadEmployeeData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const exportToPDF = () => {
    window.confirm("Are you sure to download Employee record? ");
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [297, 210]
    });

    doc.setFontSize(18);
    doc.text("Employee Details", 297 / 2, 15, "center");
    const headers = [
      "Emp Id",
      "Email",
      "Account Access",
      "First Name",
      "Last Name",
      "DOB",
      "ContactNo",
      "Role",
      "Position",
      "Department",
      "D.O.J"
    ];
    const data = rowData.map((row) => [
      row.empID,
      row.Email,
      row.Account,
      row.FirstName,
      row.LastName,
      row.DOB,
      row.ContactNo,
      row.RoleName,
      row.PositionName,
      row.DepartmentName,
      row.DateOfJoining,
      ""
    ]);
    doc.setFontSize(12);
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 25
    });

    doc.save("employee_data.pdf ");
  };

  const renderInfoButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <div>
          <FontAwesomeIcon
            icon={faInfoCircle}
            onClick={() => props.onEmpInfo(params.data.data)}
          />
        </div>
      );
    }
    return null;
  };

  const renderButton = (params) => {
    if (params.data && params.data.data && params.data.data["_id"]) {
      return (
        <FontAwesomeIcon
          icon={faTrash}
          onClick={() => onEmployeeDelete(params.data.data["_id"])}
        />
      );
    }
    return null;
  };

  const renderEditButton = (params) => {
    if (params.data && params.data.data) {
      return (
        <FontAwesomeIcon
          icon={faEdit}
          onClick={() => props.onEditEmployee(params.data.data)}
        />
      );
    }
    return null;
  };

  const getBackgroundColor = (accountType) => {
    switch (accountType) {
      case "Admin":
        return "#1D267D";
      case "HR":
        return "#1D267D";
      case "Employee":
        return "#1D267D";
      case "Manager":
        return "#1D267D";
      default:
        return "#1D267D";
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchInput(event.target.value);
  };

  const handleToggleIdSort = () => {
    setIsIdSortAscending(!isIdSortAscending);
  };

  const sortById = (a, b) => {
    const idA = a.empID.toLowerCase();
    const idB = b.empID.toLowerCase();

    if (isIdSortAscending) {
      return idA.localeCompare(idB);
    } else {
      return idB.localeCompare(idA);
    }
  };

  useEffect(() => {
    loadEmployeeData();
  }, []);

  const calculateUpcomingBirthdays = () => {
    const today = new Date();
    const upcomingBirthdaysData = rowData.filter((employee) => {
      const dob = new Date(employee.DOB);
      dob.setFullYear(today.getFullYear());

      // Check if the upcoming birthday is within the next 7 days
      const timeDiff = dob - today;
      const daysDiff = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
      return daysDiff >= 0 && daysDiff <= 7;
    });

    setUpcomingBirthdays(upcomingBirthdaysData);
  };

  useEffect(() => {
    calculateUpcomingBirthdays();
  }, [rowData]);

  let filteredData = rowData.filter((item) => {
    const isMatchingId = isIdFilterActive
      ? item.empID.toLowerCase() === searchInput.toLowerCase()
      : true;

    const isMatchingFirstName = item.FirstName.toLowerCase().includes(
      searchInput.toLowerCase()
    );

    return isMatchingId && isMatchingFirstName;
  });

  filteredData = filteredData.sort(sortById);

  // Calculate the total length for each status
  const allCount = filteredData.filter((data) => data.Account === "").length;
  const adminCount = filteredData.filter(
    (data) => data.Account === "Admin"
  ).length;
  const hrCount = filteredData.filter((data) => data.Account === "HR").length;
  const managerCount = filteredData.filter(
    (data) => data.Account === "Manager"
  ).length;
  const employeeCount = filteredData.filter(
    (data) => data.Account === "Employee"
  ).length;

  return (
    <div className="py-0">
      <div
        style={{
          position: "sticky",
          top: "0",
          zIndex: "3",
          backgroundColor: "white"
        }}
        className="my-auto bg-light  py-2 shadow-sm mb-5"
      >
        <div className="row m-auto row-gap-2 px-2">
          <div className="col-12 col-sm-12 col-md-3 d-flex">
            <h5 className="fw-bolder my-auto text-uppercase  d-flex text-muted gap-0">
              Employees
              <span className="text-primary my-auto fs-6 mx-2">
                ({rowData.length})
              </span>
            </h5>
          </div>
          <div className="col-6 col-md-5 d-flex p-0 position-relative">
            <input
              style={{
                height: "100%",
                width: "100%",
                paddingLeft: "30px"
              }}
              className="form-control py-1 border border-muted border-2"
              type="text"
              placeholder="Search by name"
              value={searchInput}
              onChange={handleSearchInputChange}
            />
            <LuSearch
              style={{
                position: "absolute",
                top: "30%",
                left: "8px",
                height: "17px",
                width: "17px"
              }}
            />
          </div>
          <div className="col-6 col-md-4 d-flex align-items-center justify-content-end gap-1">
            <button
              onClick={exportToPDF}
              className="btn py-1 bg-white shadow-sm fw-bold"
            >
              <FaFilePdf className="fs-6 align-items-center text-danger" />
            </button>
            <div className="bg-white" style={{ position: "relative" }}>
              <span
                onMouseEnter={() => setActiveProfile("name")}
                onMouseLeave={() => setActiveProfile(null)}
                className="btn py-1 shadow-sm text-primary"
              >
                <FaFilter />
                <div
                  style={{
                    position: "absolute",
                    zIndex: "1",
                    right: "0",
                    top: "95%",
                    width: "130px",
                    display: activeProfile === "name" ? "flex" : "none"
                  }}
                  className="bg-white fw-bold rounded-3 px-2 shadow flex-column"
                >
                  <div
                    onClick={() => setSelectedFilter("")}
                    style={{ cursor: "pointer" }}
                    className="d-flex  flex-nowrap justify-content-between"
                  >
                    ALL <span>({rowData.length})</span>
                  </div>
                  <div
                    onClick={() => setSelectedFilter("Admin")}
                    style={{ cursor: "pointer" }}
                    className="d-flex flex-nowrap justify-content-between"
                  >
                    ADMIN <span>({adminCount})</span>
                  </div>
                  <div
                    onClick={() => setSelectedFilter("HR")}
                    style={{ cursor: "pointer" }}
                    className="d-flex flex-nowrap justify-content-between"
                  >
                    HR <span>({hrCount})</span>
                  </div>
                  <div
                    onClick={() => setSelectedFilter("Manager")}
                    style={{ cursor: "pointer" }}
                    className="d-flex flex-nowrap justify-content-between"
                  >
                    MANAGER <span>({managerCount})</span>
                  </div>
                  <div
                    onClick={() => setSelectedFilter("Employee")}
                    style={{ cursor: "pointer" }}
                    className="d-flex flex-nowrap justify-content-between"
                  >
                    EMPLOYEE <span>({employeeCount})</span>
                  </div>
                </div>
              </span>
            </div>
            <button
              onClick={handleToggleIdSort}
              className="btn py-1 bg-white shadow-sm fs-6 fw-bold"
            >
              {isIdSortAscending ? (
                <FcNumericalSorting21 />
              ) : (
                <FcNumericalSorting12 />
              )}
            </button>
            <button
              className="d-flex py-1 btn justify-center bg-success shadow-sm text-white fw-bold aline-center gap-2"
              onClick={props.onAddEmployee}
            >
              + <span className="d-none d-lg-flex">Add Employee</span>
            </button>
          </div>
        </div>
      </div>
      <div id="clear-both" />
      {!loading ? (
        <div className="row container-fluid mx-auto px-2 px-sm-5 justify-content-lg-around justify-content-start  row-gap-3 column-gap-0 ">
          {filteredData
            .filter((items) =>
              selectedFilter ? items.Account === selectedFilter : true
            )

            .map((items, index) => {
              return (
                <div className="col-12 col-sm-6 col-lg-3 position-relative">
                  <p
                    style={{
                      width: "fit-content",
                      position: "absolute",
                      zIndex: "2",
                      top: "-3px",
                      letterSpacing: "5px",
                      left: "50%",
                      transform: "translate(-50%)"
                    }}
                    className="m-0 mx-auto rounded-5 fw-bold text-capitalize btn py-0 px-3 bg-white"
                  >
                    {items.empID}
                  </p>

                  <div className=" p-3 shadow rounded-4 d-flex flex-column gap-2">
                    <div
                      className="rounded-4  d-flex flex-column py-2 text-center jusctify-content-center"
                      style={{
                        backgroundColor: "rgba(0, 0, 92, .1)",
                        boxShadow: "0 0 20px 1px #F1EAFF inset",
                        position: "relative"
                      }}
                    >
                      <button
                        style={{
                          position: "absolute",
                          top: "5%",
                          right: "5% "
                        }}
                        onClick={() => props.onEmpInfo(items.data)}
                        className=" btn p-0 text-primary cursor-pointer"
                        to=""
                        title="Info"
                      >
                        <FaLocationArrow className="fs-6" />
                      </button>{" "}
                      <button
                        style={{
                          position: "absolute",
                          top: "5%",
                          left: "5% ",
                          fontSize: ".8px"
                        }}
                        onClick={() => props.onEditEmployee(items.data)}
                        className=" btn p-0 text-primary cursor-pointer"
                        to=""
                        title="Edit Profile"
                      >
                        <TbUserEdit className="fs-5" />
                      </button>
                      <div
                        style={{
                          height: "80px",
                          width: "80px",
                          overflow: "hidden",
                          borderRadius: "50%",
                          border: "3px solid #4477CE"
                        }}
                        className="profile-image mt-1 bg-white  mx-auto"
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            overflow: "hidden",
                            borderRadius: "50%",
                            objectFit: "cover",
                            padding: ".2rem"
                          }}
                          className=""
                          src={
                            items?.data?.profile?.image_url
                              ? items?.data?.profile?.image_url
                              : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                          }
                          alt=""
                        />
                      </div>
                      <div style={{ position: "relative" }}>
                        <p className="m-0 text-capitalize fw-bold fs-5">
                          {items.FirstName} {items.LastName}
                        </p>
                        <p className="m-0 text-capitalize fw-bold">
                          {items.PositionName}
                        </p>
                        <p
                          style={{ width: "fit-content " }}
                          className="btn btn-outline-success my-1 mx-auto p-0 px-2 fw-bold rounded-5"
                        >
                          {items.Account}
                        </p>
                      </div>
                    </div>
                    <a
                      target="_blank"
                      href={`mailto:${items.Email}`}
                      style={{
                        color: "#00005C",
                        textDecoration: "none",
                        cursor: "pointer"
                      }}
                      className="m-0"
                    >
                      <MdOutlineEmail /> {items.Email}
                    </a>
                    <a
                      target="_blank"
                      href={`tel:${items.ContactNo}`}
                      style={{
                        color: "#00005C",
                        textDecoration: "none",
                        cursor: "pointer"
                      }}
                      className="m-0"
                    >
                      <LiaPhoneSolid /> {items.ContactNo}
                    </a>
                  </div>
                </div>
              );
            })}
        </div>
      ) : (
        <div id="loading-bar">
          <RingLoader
            css={override}
            sizeUnit={"px"}
            size={50}
            color={"#0000ff"}
            loading={true}
          />
        </div>
      )}
    </div>
  );
};

export default AdminEmployeeTable;
