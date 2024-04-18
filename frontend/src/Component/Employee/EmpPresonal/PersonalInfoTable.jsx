import React, { useEffect, useState } from "react";
import "./PersonalInfoTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faPlus } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

import "./profilePage.css";
import {
  FaCamera,
  FaFileAudio,
  FaFileImage,
  FaRegFileImage,
  FaRegFilePdf
} from "react-icons/fa";
import { IoMdDownload } from "react-icons/io";
import FloralAbstract from "./FloralAbstract.jpg";
import { GoDotFill } from "react-icons/go";
import { IoArrowBackCircle, IoEye } from "react-icons/io5";
import Education from "../EmpEducation/Education";
import WorkExperience from "../EmpWorkExp/WorkExperience";
import FamilyInfo from "../EmpFamily/FamilyInfo";
import BASE_URL from "../../../Pages/config/config.js";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const PersonalInfoTable = (props) => {
  const [personalInfoData, setPersonalInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);
  const [activeSection, setActiveSection] = useState("personalInfo");
  const [showDownloadbtn, setShowDownloadbtn] = useState(null);
  const [visibleDocs, setVisibleDocs] = useState([]);
  const loadPersonalInfoData = () => {
    axios
      .get(`${BASE_URL}/api/personal-info/${props.data["_id"]}`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        const data = response.data;
        setPersonalInfoData(data);
        setLoading(false);

        const temp = {
          data,
          FirstName: data["FirstName"] || "Not Avaiable",
          MiddleName: data["MiddleName"] || "Not Avaiable",
          LastName: data["LastName"] || "Not Avaiable",
          empID: data["empID"] || "Not Avaiable",
          Gender: data["Gender"] || "Not Avaiable",
          ContactNo: data["ContactNo"] || "Not Avaiable",
          Email: data["Email"] || "Not Avaiable",
          PANcardNo: data["PANcardNo"] || "Not Avaiable",
          DOB: data["DOB"].slice(0, 10) || "Not Avaiable",
          BloodGroup: data["BloodGroup"] || "Not Avaiable",
          EmergencyContactNo: data["EmergencyContactNo"] || "Not Avaiable",
          Hobbies: data["Hobbies"] || "Not Avaiable",
          PresentAddress: data["PresentAddress"] || "Not Avaiable",
          PermanetAddress: data["PermanetAddress"] || "Not Avaiable",
          RoleName: data["role"][0] ? data["role"][0]["RoleName"] : "",
          DateOfJoining: data["DateOfJoining"].slice(0, 10),
          reportManager: data["reportManager"] || "Not Avaiable",
          reportHr: data["reportManager"] || "Not Avaiable",
          DepartmentName: data["department"][0]
            ? data["department"][0]["DepartmentName"]
            : "",
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
          PositionName: data["position"][0]
            ? data["position"][0]["PositionName"]
            : ""
        };

        setRowData([temp]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    loadPersonalInfoData();
  }, [props.data]);

  const onToggleSection = (section) => {
    setActiveSection(section);
  };

  const onPersonalInfoDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/personalInfo/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then(() => {
          loadPersonalInfoData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const renderEditButton = (params) => {
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditPersonalInfo(params.data.data)}
      />
    );
  };
  const getBackgroundColor = (accountType) => {
    switch (accountType) {
      case "Admin":
        return "#8EAC50";
      case "HR":
        return "#0079FF";
      case "Employee":
        return "purple";
      default:
        return "#FF9B50";
    }
  };

  const documentDATA = [
    {
      docTitle: "Aadhar Card",
      docURL:
        "https://aadhar-uidai.in/wp-content/uploads/2018/07/main-qimg-4a3032007d087580af4a6eff50634659.png",
      docNumber: "123456789",
      docSize: "1.02"
    },
    {
      docTitle: "PAN Card",
      docURL:
        "https://images.livemint.com/img/2019/10/25/1600x900/pan_card_1565610340828_1572021543426.PNG",
      docNumber: "ADNPT5873H",
      docSize: "1.02"
    },
    {
      docTitle: "10th MarkSheet",
      docURL:
        "https://www.pastcart.com/wp-content/uploads/2019/07/10th-marksheet-1024x813.jpg",
      docNumber: "201535400",
      docSize: "1.02"
    },
    {
      docTitle: "12th MarkSheet",
      docURL:
        "https://cdn.slidesharecdn.com/ss_thumbnails/bac93f03-6b88-4390-8643-eddc0804e020-160807132546-thumbnail-4.jpg?cb=1470576360",
      docNumber: "545421000",
      docSize: "1.02"
    },
    {
      docTitle: "Graduation MarkSheet",
      docURL: FloralAbstract,
      docNumber: "212101215",
      docSize: "1.02"
    },
    {
      docTitle: "Graduation MarkSheet",
      docURL: FloralAbstract,
      docNumber: "212101215",
      docSize: "1.02"
    },
    {
      docTitle: "Graduation MarkSheet",
      docURL: FloralAbstract,
      docNumber: "212101215",
      docSize: "1.02"
    }
  ];

  return (
    <div>
      <div id="clear-both" />
      {!loading ? (
        <div style={{ position: "relative" }} className="row">
          <div
            style={{
              height: "25rem",
              background:
                "url(https://images.unsplash.com/photo-1621947081720-86970823b77a?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
              backgroundPosition: "center",
              backgroundSize: "cover",
              marginTop: "-.5rem"
            }}
            className="col-12"
          >
            {" "}
            <Link to="/hr/employee">
              <button
                className="btn fw-bold d-flex gap-3 "
                style={{ background: "white", color: "black" }}
                id="add-button"
              >
                <IoArrowBackCircle className="my-auto fs-5" />{" "}
                <span my-auto>Back</span>
              </button>
            </Link>
          </div>
          <div
            style={{
              height: "35rem",
              position: "fixed",
              top: "20%",
              zIndex: "1"
            }}
            className="col-12 row mx-auto justify-content-center gap-4 w-100"
          >
            <div
              style={{
                height: "33rem",
                background: `url(${FloralAbstract})`,
                backgroundPosition: "center",
                backgroundSize: "cover",
                overflow: "hidden"
              }}
              className="col-12 m-0 p-0 rounded-3 col-lg-3 bg-white shadow"
            >
              {rowData.map((items, index) => {
                return (
                  <div
                    style={{
                      backgroundColor: "rgba(258,258,258,.95)",
                      position: "relative"
                    }}
                    className="d-flex flex-column gap-3 py-2 h-100"
                    key={index}
                  >
                    <div
                      className="d-flex flex-column gap-2"
                      style={{ width: "100%", padding: "1rem 1rem" }}
                    >
                      <div
                        className="mx-auto"
                        style={{
                          height: "120px",
                          width: "120px",
                          border: "6px solid #39A7FF",
                          borderRadius: "50%",
                          position: "relative"
                        }}
                      >
                        <img
                          style={{
                            height: "100%",
                            width: "100%",
                            borderRadius: "50%",
                            objectFit: "cover"
                          }}
                          src={
                            items?.data?.profile?.image_url
                              ? items?.data?.profile?.image_url
                              : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                          }
                          alt="employee"
                        />
                        <button
                          style={{
                            height: "30px",
                            width: "30px",
                            borderRadius: "50%",
                            border: "3px solid white",
                            position: "absolute",
                            bottom: "0",
                            right: "0"
                          }}
                          className="btn btn-primary text-white d-flex p-1 "
                        >
                          <FaCamera className="m-auto" />
                        </button>
                      </div>
                      <p
                        style={{ position: "absolute", top: "0", left: "0" }}
                        className="btn btn-success px-2 py-0 m-2 rounded-5 fw-bold shadow"
                      >
                        {items.empID}
                      </p>
                      {/* <p className="m-auto fw-bold fs-6">{items.empID}</p> */}
                      <h3 className="text-capitalize my-0 fw-bold text-muted text-center">
                        {items.FirstName} {personalInfoData.LastName}
                      </h3>
                      <p className="text-capitalize my-0 fw-bold text-center">
                        {items.RoleName} {items.DepartmentName}
                      </p>
                    </div>
                    <div className="d-flex flex-column justify-content-between gap-2">
                      <div className="p-2 fw-bold mx-3 d-flex bg-white justify-content-between shadow rounded-5">
                        <span
                          style={{ alignItems: "center" }}
                          className="my-auto d-flex gap-2 "
                        >
                          <GoDotFill className="text-primary fs-4" />
                          Total Assigned Task
                        </span>{" "}
                        <span className="fw-bold  text-primary my-auto">
                          123
                        </span>
                      </div>
                      <div className="p-2 fw-bold mx-3 d-flex bg-white justify-content-between shadow rounded-5">
                        <span
                          style={{ alignItems: "center" }}
                          className="my-auto d-flex gap-2 "
                        >
                          <GoDotFill className="text-warning fs-4" />
                          Total Active Task
                        </span>{" "}
                        <span className="fw-bold text-warning my-auto">
                          123
                        </span>
                      </div>
                      <div className="p-2 fw-bold mx-3 d-flex  bg-white justify-content-between shadow rounded-5">
                        <span
                          style={{ alignItems: "center" }}
                          className="my-auto d-flex gap-2 "
                        >
                          {" "}
                          <GoDotFill className="text-danger fs-4" />
                          Total Cancelled Task
                        </span>{" "}
                        <span className="fw-bold my-auto text-danger">123</span>
                      </div>
                      <div className="p-2 fw-bold  bg-white mx-3 d-flex justify-content-between shadow rounded-5">
                        <span
                          style={{ alignItems: "center" }}
                          className="my-auto d-flex gap-2 "
                        >
                          <GoDotFill className="text-success fs-4" />
                          Total Completed Task
                        </span>{" "}
                        <span className="fw-bold my-auto text-success">
                          123
                        </span>
                      </div>
                    </div>
                    <span
                      onClick={() => props.onEditPersonalInfo(items.data)}
                      style={{
                        borderBottom:
                          activeSection === "documentDetails"
                            ? "3px solid blue"
                            : "none",
                        borderRadius: "0",
                        position: "absolute",
                        bottom: "0",
                        left: "0",
                        cursor: "pointer"
                      }}
                      className="btn px-3 w-100 fw-bold btn-primary "
                    >
                      Update Details
                    </span>
                  </div>
                );
              })}
            </div>
            <div
              id="personalinfo"
              style={{ height: "33rem", overflow: "hidden" }}
              className="col-12 rounded col-lg-7 p-0 m-0 bg-white shadow"
            >
              <div className="shift-pages w-100 shadow-sm d-flex gap-3 px-2 mb-1">
                <span
                  onClick={() => onToggleSection("personalInfo")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "personalInfo"
                        ? "3px solid blue"
                        : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-2 fw-bold"
                >
                  Personal Info
                </span>
                <span
                  onClick={() => onToggleSection("companyInfo")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "companyInfo"
                        ? "3px solid blue"
                        : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-2 fw-bold"
                >
                  Company Info
                </span>
                <span
                  onClick={() => onToggleSection("Educationalinfo")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "Educationalinfo"
                        ? "3px solid blue"
                        : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-2 fw-bold"
                >
                  Education Details
                </span>
                <span
                  onClick={() => onToggleSection("documentDetails")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "documentDetails"
                        ? "3px solid blue"
                        : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-2 fw-bold"
                >
                  Documents
                </span>
                <span
                  onClick={() => onToggleSection("WorkExperience")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "WorkExperience"
                        ? "3px solid blue"
                        : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-2 fw-bold"
                >
                  Work Experience{" "}
                </span>
                <span
                  onClick={() => onToggleSection("otherInfo")}
                  style={{
                    whiteSpace: "pre",
                    borderBottom:
                      activeSection === "otherInfo" ? "3px solid blue" : "none",
                    borderRadius: "0"
                  }}
                  className="btn py-3 px-3 fw-bold"
                >
                  Dependents
                </span>
              </div>
              {activeSection === "personalInfo" && (
                <div className="row">
                  <div
                    className="pb-5"
                    id="companyinfo"
                    style={{
                      overflow: "hidden auto",
                      height: "29rem",
                      scrollbarWidth: "thin"
                    }}
                  >
                    {rowData.map((items, index) => {
                      return (
                        <div className="row justify-content-evenly py-3 row-gap-3">
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              First Name
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.FirstName}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Last Name
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.LastName}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Phone Number
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.ContactNo}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Emergency Contact
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.EmergencyContactNo}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Email Address
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.Email}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Date of Birth
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.DOB.slice(0, 10)}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Blood Group
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.BloodGroup}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              PAN Number
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-uppercase"
                              value={items.PANcardNo}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Present Address
                            </label>

                            <textarea
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.PresentAddress}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Permanent Address
                            </label>

                            <textarea
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.PermanetAddress}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {activeSection === "companyInfo" && (
                <div className="row">
                  <div
                    style={{
                      overflow: "hidden auto",
                      height: "29rem",
                      scrollbarWidth: "thin"
                    }}
                  >
                    {rowData.map((items, index) => {
                      return (
                        <div className="row justify-content-evenly py-3 row-gap-3">
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Employee ID
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-uppercase"
                              value={items.empID}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Email
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.Email}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Role
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.RoleName}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Position
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.PositionName}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Department
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm text-capitalize"
                              value={items.DepartmentName}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Date of Joining
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.DateOfJoining}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Account Access
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.Account}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Reporting Manager
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.reportManager}
                            />
                          </div>
                          <div className="col-12 col-sm-5 d-flex flex-column">
                            <label htmlFor="" className=" fw-bold text-muted">
                              Reporting HR
                            </label>
                            <input
                              type="text"
                              className="form-control rounded-1 shadow-sm"
                              value={items.reportHr}
                            />
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
              {activeSection === "Educationalinfo" && (
                <div className="w-100 container ">
                  <Education />
                </div>
              )}
              {activeSection === "documentDetails" && (
                <div
                  style={{
                    overflow: "hidden auto",
                    height: "27rem",
                    scrollbarWidth: "thin"
                  }}
                >
                  <div className="container-fluid">
                    <Button variant="primary" onClick={props.onAddFamilyInfo}>
                      <FontAwesomeIcon icon={faPlus} id="plus-icon" />
                      Add Document
                    </Button>
                  </div>

                  <div className="row mx-2 pb-3 column-gap-4 row-gap-4">
                    {documentDATA.reverse().map((data, index) => (
                      <div
                        key={index}
                        onMouseEnter={() => setShowDownloadbtn("name")}
                        onMouseLeave={() => setShowDownloadbtn(null)}
                        className="d-flex flex-column gap-2 rounded px-2 py-1 shadow"
                        style={{ height: "190px", width: "250px" }}
                      >
                        <div
                          style={{
                            height: "150px",
                            width: "100%",
                            overflow: "hidden",
                            background: `url(${data.docURL})`,
                            backgroundPosition: "center",
                            backgroundSize: "cover",
                            opacity: "85%",
                            boxShadow:
                              "0 0 10px 1px rgba(192, 185, 185, 0.758) inset"
                          }}
                          className="bg-primary m-auto position-relative "
                        >
                          <div
                            style={{
                              height: "100%",
                              width: "100%",
                              position: "absolute",
                              top: "0",
                              left: "0",
                              background: "rgba(0,0,0,.4)",
                              display: showDownloadbtn ? "flex" : "none",
                              justifyContent: "center",
                              alignItems: "center",
                              gap: "1rem"
                            }}
                          >
                            <a
                              target="_blank"
                              href={data.docURL}
                              style={{ height: "40px", width: "40px" }}
                              className="btn p-0 btn bg-white text-primary shadow d-flex"
                            >
                              <IoEye className="m-auto fs-4" />
                            </a>
                            <a
                              download={data.docURL}
                              href={data.docURL}
                              style={{ height: "40px", width: "40px" }}
                              className="btn p-0 btn bg-white text-primary shadow d-flex"
                            >
                              <IoMdDownload className="m-auto fs-4" />
                            </a>
                          </div>
                          <div
                            style={{
                              height: "30px",
                              width: "30px",
                              position: "absolute",
                              bottom: "0",
                              right: "0",
                              opacity: "100%"
                            }}
                            className="bg-white d-flex shadow-sm text-danger"
                          >
                            {data.docURL.toLowerCase().endsWith(".pdf") && (
                              <FaRegFilePdf className="m-auto fs-3 text-black" />
                            )}
                            {(data.docURL.toLowerCase().endsWith(".jpeg") ||
                              data.docURL.toLowerCase().endsWith(".jpg")) && (
                              <FaFileImage className="m-auto fs-3" />
                            )}
                            {data.docURL.toLowerCase().endsWith(".png") && (
                              <FaRegFileImage className="m-auto fs-3" />
                            )}
                            {data.docURL.toLowerCase().endsWith(".mp3") && (
                              <FaFileAudio className="m-auto fs-3" />
                            )}
                          </div>
                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <p
                            style={{ fontSize: ".9rem" }}
                            className="text-muted fw-bold m-0"
                          >
                            {data.docTitle}
                          </p>{" "}
                          <p
                            style={{ fontSize: ".7rem" }}
                            className="text-primary fw-bold m-0"
                          >
                            {data.docSize} MB
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {activeSection === "WorkExperience" && (
                <div className="w-100 container ">
                  <WorkExperience />
                </div>
              )}
              {activeSection === "otherInfo" && (
                <div className="w-100 container ">
                  <FamilyInfo />
                </div>
              )}
            </div>
          </div>
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

export default PersonalInfoTable;
