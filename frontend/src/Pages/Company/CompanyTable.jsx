import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import BASE_URL from "../config/config";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminCompanyTable = (props) => {
  const [companyData, setCompanyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompanyData();
  }, []);

  const loadCompanyData = () => {
    axios
      .get(`${BASE_URL}/api/company`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        setCompanyData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCompanyDelete = (id) => {
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/company/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadCompanyData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-between aline-items-start mb-3">
        <h4 className="fw-bold text-muted">Company Details</h4>
        <Button
          className="my-auto"
          variant="primary shadow-sm"
          onClick={props.onAddCompany}
        >
          <FontAwesomeIcon icon={faPlus} className="me-2" />
          Create Company
        </Button>
      </div>

      {!loading ? (
        <div
          className="pr-5 pr-sm-0"
          style={{ height: "70vh", overflow: "auto", maxWidth: "95%" }}
        >
          <table className="table">
            <thead>
              <tr>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Company Name
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Address
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Country
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  State
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  City
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Postal Code
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Website
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Email
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Contact Person
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Contact No
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Fax No
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Pan No
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  GST No
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  CIN No
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Edit
                </th>
                <th
                  style={{
                    background: "var(--primaryDashColorDark)",
                    color: "var(--primaryDashMenuColor)",
                    whiteSpace: "pre"
                  }}
                >
                  Delete
                </th>
              </tr>
            </thead>
            <tbody>
              {companyData.map((item, index) => (
                <tr key={index}>
                  <td
                    style={{ whiteSpace: "pre" }}
                    className="text-capitalize fw-bold text-primary"
                  >
                    {item.CompanyName}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase ">
                    {item.Address}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase ">
                    {item.city[0].state[0].country[0].CountryName}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase ">
                    {item.city[0].state[0].StateName}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase ">
                    {item.city[0].CityName}
                  </td>
                  <td style={{ whiteSpace: "pre" }}>{item.PostalCode}</td>
                  <td style={{ whiteSpace: "pre" }}>{item.Website}</td>
                  <td style={{ whiteSpace: "pre" }}>{item.Email}</td>
                  <td style={{ whiteSpace: "pre" }}>{item.ContactPerson}</td>
                  <td style={{ whiteSpace: "pre" }}>{item.ContactNo}</td>
                  <td style={{ whiteSpace: "pre" }}>{item.FaxNo}</td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase">
                    {item.PanNo}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase">
                    {item.GSTNo}
                  </td>
                  <td style={{ whiteSpace: "pre" }} className="text-uppercase">
                    {item.CINNo}
                  </td>
                  <td style={{ whiteSpace: "pre" }}>
                    <FontAwesomeIcon
                      icon={faEdit}
                      onClick={() => props.onEditCompany(item)}
                    />
                  </td>
                  <td style={{ whiteSpace: "pre" }}>
                    <FontAwesomeIcon
                      icon={faTrash}
                      onClick={() => onCompanyDelete(item._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="d-flex justify-content-center">
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

export default AdminCompanyTable;
