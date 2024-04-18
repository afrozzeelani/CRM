import React, { useState, useEffect } from "react";
import { Form, Button, Col } from "react-bootstrap";
import axios from "axios";
import "./LeaveApplicationEmpForm.css";
import LeaveImg from "./Leave.svg";
import InnerDashContainer from "../../InnerDashContainer";
import BASE_URL from "../../../Pages/config/config";

const LeaveApplicationEmpForm = (props) => {
  const id = localStorage.getItem("_id");
  const [empData, setEmpData] = useState([]);
  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        console.log(response.data);
        setEmpData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadEmployeeData();
  }, []);
  return (
    // <div
    //   style={{ height: "100vh", width: "100%" }}
    //   className="registration-page py-4"
    // >
    //   <h2
    //     id="role-form-title"
    //     className="text-center text-black text-uppercase fw-bold my-4"
    //   >
    //     Add LeaveApplicationEmp Details
    //   </h2>

    //   <div id="role-form-outer-div">
    //     <Form id="form" onSubmit={props.onLeaveApplicationEmpSubmit}>
    //       <div className="d-flex w-100 flex-column gap-2 rounded ">
    //         <div className="row row-gap-3 ">
    //           <div className="form-group col-12 col-md-6">
    //             <Form.Label column sm={6}>
    //               Leave Type
    //             </Form.Label>
    //             <Col sm={10} className="form-input">
    //               <Form.Control as="select" required>
    //                 <option value="" disabled selected>
    //                   Select your option
    //                 </option>
    //                 <option value="Sick Leave">Sick Leave</option>
    //                 <option value="Casual Leave">Casual Leave</option>
    //                 <option value="Privilege Leave">Privilege Leave</option>
    //               </Form.Control>
    //             </Col>
    //           </div>
    //           <div className="form-group col-12 col-md-6">
    //             <Form.Label column sm={6}>
    //               FromDate
    //             </Form.Label>
    //             <Col sm={10} className="form-input">
    //               <Form.Control type="date" required />
    //             </Col>
    //           </div>
    //           <div className="form-group col-12 col-md-6">
    //             <Form.Label column sm={6}>
    //               ToDate
    //             </Form.Label>
    //             <Col sm={10} className="form-input">
    //               <Form.Control type="date" placeholder="ToDate" required />
    //             </Col>
    //           </div>

    //           <div className="form-group col-12 col-md-6">
    //             <Form.Label column sm={6}>
    //               Leave Status
    //             </Form.Label>
    //             <Col sm={10} className="form-input">
    //               <Form.Control as="select" required>
    //                 <option value="1" selected>
    //                   Pending
    //                 </option>
    //               </Form.Control>
    //             </Col>
    //           </div>

    //           <div className="form-group col-12">
    //             <Form.Label column sm={6}>
    //               Reason for leave
    //             </Form.Label>
    //             <Col sm={11} className="form-input">
    //               <Form.Control
    //                 as="textarea"
    //                 rows={3}
    //                 required
    //                 className="form-control"
    //                 placeholder="Please Describe your reasion...."
    //               />
    //             </Col>
    //           </div>

    //           <div
    //             className="form-group col-12 col-md-6"
    //             id="form-submit-button"
    //           >
    //             <Col sm={{ span: 10, offset: 2 }}>
    //               <Button type="submit">Submit</Button>
    //             </Col>
    //           </div>
    //           <div
    //             className="form-group col-12 col-md-6"
    //             id="form-cancel-button"
    //           >
    //             <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
    //               <Button type="reset" onClick={props.onFormClose}>
    //                 cancel
    //               </Button>
    //             </Col>
    //           </div>
    //         </div>
    //       </div>
    //     </Form>
    //   </div>
    // </div>

    <InnerDashContainer>
      <div style={{ overflow: "auto" }} className="row">
        <div className="col-5">
          <img style={{ width: "130%" }} src={LeaveImg} alt="" />
        </div>
        <div className="col-6">
          <form
            className="text-white shadow bg-dark px-3 py-4 rounded row"
            onSubmit={props.onLeaveApplicationEmpSubmit}
          >
            <h4 className="fw-bolder text-white mb-5">Create Leave Request</h4>

            <div className="mb-3 col-12">
              <label htmlFor="leaveType" className="form-label">
                Select Leave Type
              </label>
              <select
                className="form-select"
                id="leaveType"
                name="leaveType"
                // value={formData.leaveType}
                // onChange={handleInputChange}
              >
                <option value="" disabled selected>
                  -- Select --
                </option>
                <option value="Sick Leave">Sick Leave</option>
                <option value="Casual Leave">Casual Leave</option>
                <option value="Privilege Leave">Privilege Leave</option>
              </select>
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="startDate" className="form-label">
                Start Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="startDate"
                name="startDate"
                // value={formData.startDate}
                // onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3 col-6">
              <label htmlFor="endDate" className="form-label">
                End Date:
              </label>
              <input
                type="date"
                className="form-control"
                id="endDate"
                name="endDate"
                // value={formData.endDate}
                // onChange={handleInputChange}
                required
              />
            </div>
            <div className="mb-3 col-12">
              <label htmlFor="leaveType" className="form-label">
                Leave Status
              </label>
              <select
                className="form-select"
                id="leaveStatus"
                name="leaveStatus"
              >
                <option value="1" selected>
                  Pending
                </option>
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="manager" className="form-label">
                Reporting Manager:
              </label>
              <input
                className="form-control"
                id="manager"
                name="manager"
                value={empData.reportManager}
                // onChange={handleInputChange}
                required
                disabled
                placeholder={empData.reportManager}
              />
            </div>

            <div className="mb-3">
              <label htmlFor="hr" className="form-label">
                Reporting Hr:
              </label>
              <input
                className="form-control"
                id="hr"
                name="hr"
                value={empData.reportHr}
                // onChange={handleInputChange}
                required
                disabled
                placeholder={empData.reportHr}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason:
              </label>
              <textarea
                className="form-control"
                id="reason"
                name="reason"
                // value={formData.reason}
                // onChange={handleInputChange}
                required
                placeholder="Please mention the reason for leave"
              />
            </div>

            <div className="row mt-3 mx-1 justify-content-between">
              <button type="submit" className="btn btn-primary col-5 ">
                Submit
              </button>
              <button
                type="reset"
                className="btn btn-danger col-5"
                onClick={props.onFormClose}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </InnerDashContainer>
  );
};

export default LeaveApplicationEmpForm;
