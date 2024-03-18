import React, { useState } from "react";
import "./PersonalInfoFormEdit.css";
import axios from "axios";
import { Form, Button, Col, Row } from "react-bootstrap";
import personalinfoimage from "./Personalinfo.svg";

const PersonalInfoFormEdit = (props) => {
  const [state, setState] = useState({
    GenderData: props.editData["Gender"],
    EmailData: props.editData["Email"],
    FirstNameData: props.editData["FirstName"],
    MiddleNameData: props.editData["MiddleName"],
    LastNameData: props.editData["LastName"],
    DOBData: props.editData["DOB"].slice(0, 10),
    ContactNoData: props.editData["ContactNo"],
    EmergencyContactNoData: props.editData["EmergencyContactNo"] || "",
    PANcardNoData: props.editData["PANcardNo"] || "",
    HobbiesData: props.editData["Hobbies"] || "",
    PresentAddressData: props.editData["PresentAddress"] || "",
    PermanetAddressData: props.editData["PermanetAddress"] || "",
    presonalEmail: props.editData["presonalEmail"] || "",
    role: props.editData["role"] || ""
  });
  const onEmailDataChange = (e) => {
    setState({ ...state, EmailData: e.target.value });
  };

  const onFirstNameDataChange = (e) => {
    setState({ ...state, FirstNameData: e.target.value });
  };
  const onMiddleNameDataChange = (e) => {
    setState({ ...state, MiddleNameData: e.target.value });
  };
  const onLastNameDataChange = (e) => {
    setState({ ...state, LastNameData: e.target.value });
  };
  const onContactNoDataChange = (e) => {
    setState({ ...state, ContactNoData: e.target.value });
  };
  const onPANcardNoDataChange = (e) => {
    setState({ ...state, PANcardNoData: e.target.value });
  };
  const onpresonalemailDataChange = (e) => {
    setState({ presonalEmail: e.target.value });
  };
  const onEmergencyContactNoDataChange = (e) => {
    setState({ ...state, EmergencyContactNoData: e.target.value });
  };
  const onHobbiesDataChange = (e) => {
    setState({ ...state, HobbiesData: e.target.value });
  };
  const onPresentAddressDataChange = (e) => {
    setState({ ...state, PresentAddressData: e.target.value });
  };
  const onPermanentAddressDataChange = (e) => {
    setState({ ...state, PermanetAddressData: e.target.value });
  };

  const onGenderChange = (e) => {
    setState({ ...state, GenderData: e.target.value });
    props.onGenderChange(e);
  };
  const onDOBDataChange = (e) => {
    console.log(e.target.value);
    setState({ ...state, DOBData: e.target.value });
  };

  return (
    <div className="container-fluid position-relative">
      <div
        style={{ marginTop: "-.5rem", minHeight: "95vh" }}
        className="row bg-light p-2"
      >
        <div className="col-md-4 col-0">
          <img src={personalinfoimage} alt="" />
        </div>
        <div className="col-md-8 col-0 ">
          <div className="">
            <Form
              style={{ overflow: "auto", maxHeight: "600px" }}
              className="row row-gap-2 rounded-2 shadow-sm m-auto justify-content-between bg-white"
              onSubmit={(e) =>
                props.onPersonalInfoEditUpdate(props.editData, e)
              }
            >
              <h4
                style={{ position: "sticky", top: "0", zIndex: "2" }}
                className="fw-bold text-muted py-3 w-100 bg-light "
              >
                Edit Employee info
              </h4>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  First Name
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="First Name"
                    required
                    disabled
                    value={state.FirstNameData}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Middle Name
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Middle Name"
                    required
                    disabled
                    value={state.MiddleNameData}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Last Name
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Last Name"
                    disabled
                    required
                    value={state.LastNameData}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" as="legend" column>
                  Gender
                </Form.Label>
                <Col className="d-flex gap-3">
                  <Form.Check
                    inline
                    type="radio"
                    label="Male"
                    value="male"
                    name="gender"
                    className="d-flex gap-1 shadow-sm py-1 px-5 rounded-5"
                    onChange={onGenderChange}
                    checked={state.GenderData == "male"}
                    required
                  />
                  <Form.Check
                    inline
                    type="radio"
                    label="Female"
                    value="female"
                    name="gender"
                    className="d-flex gap-1 shadow-sm py-1 px-5 rounded-5"
                    onChange={onGenderChange}
                    checked={state.GenderData == "female"}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Contact No
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Contact No "
                    required
                    value={state.ContactNoData}
                    onChange={(value) => onContactNoDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Emergency Contact
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Emergency Contact No"
                    required
                    value={state.EmergencyContactNoData}
                    onChange={(value) => onEmergencyContactNoDataChange(value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Work Email
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="email"
                    placeholder="Email"
                    disabled
                    required
                    value={state.EmailData}
                    onChange={(value) => onEmailDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  PAN Card No
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="PAN Card No"
                    required
                    value={state.PANcardNoData}
                    onChange={(value) => onPANcardNoDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Presonal Email
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Presonal Email"
                    required
                    value={state.presonalEmail}
                    onChange={(value) => onpresonalemailDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  DOB
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="date"
                    placeholder="DOB"
                    required
                    //   value={props.editData["DOB"].slice(0, 10)}
                    value={state.DOBData}
                    onChange={(value) => onDOBDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Blood Group
                </Form.Label>

                <Col className="form-input">
                  <Form.Control as="select" required>
                    <option value="" disabled selected>
                      Select your option
                    </option>
                    <option
                      value="A+"
                      selected={props.editData["BloodGroup"] == "A+"}
                    >
                      A+
                    </option>
                    <option
                      value="A-"
                      selected={props.editData["BloodGroup"] == "A-"}
                    >
                      A-
                    </option>
                    <option
                      value="B+"
                      selected={props.editData["BloodGroup"] == "B+"}
                    >
                      B+
                    </option>
                    <option
                      value="B-"
                      selected={props.editData["BloodGroup"] == "B-"}
                    >
                      B-
                    </option>
                    <option
                      value="AB+"
                      selected={props.editData["BloodGroup"] == "AB+"}
                    >
                      AB+
                    </option>
                    <option
                      value="AB-"
                      selected={props.editData["BloodGroup"] == "AB-"}
                    >
                      AB-
                    </option>
                    <option
                      value="O+"
                      selected={props.editData["BloodGroup"] == "O+"}
                    >
                      O+
                    </option>
                    <option
                      value="O-"
                      selected={props.editData["BloodGroup"] == "O-"}
                    >
                      O-
                    </option>
                  </Form.Control>
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Hobbies
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    type="text"
                    placeholder="Hobbies"
                    required
                    value={state.HobbiesData}
                    onChange={(value) => onHobbiesDataChange(value)}
                  />
                </Col>
              </Form.Group>

              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Present Address
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    plassholder="Present Address"
                    required
                    value={state.PresentAddressData}
                    onChange={(value) => onPresentAddressDataChange(value)}
                  />
                </Col>
              </Form.Group>
              <Form.Group
                className="col-12 col-md-6 d-flex flex-column gap-1"
                as={Row}
              >
                <Form.Label className="fw-bold text-muted" column>
                  Permanet Address
                </Form.Label>
                <Col className="form-input">
                  <Form.Control
                    as="textarea"
                    rows="3"
                    plassholder=" Permanet Address"
                    value={state.PermanetAddressData}
                    onChange={(value) => onPermanentAddressDataChange(value)}
                  />
                </Col>
              </Form.Group>

              <div className="d-flex m-0 gap-3 py-2">
                <button className="btn btn-primary px-5" type="submit">
                  Submit
                </button>
                <button
                  className="btn btn-danger px-5"
                  type="reset"
                  onClick={props.onFormEditClose}
                >
                  cancel
                </button>
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfoFormEdit;
