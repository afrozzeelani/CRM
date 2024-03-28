import React, { Component } from "react";
import "./PositionTable.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
import BASE_URL from "../config/config";
import {
  Form,
  Button,
  Col,
  Row,
  Table,
  Dropdown,
  DropdownButton
} from "react-bootstrap";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

class PositionTable extends Component {
  state = {
    positionData: [],
    loading: true,
    totalPositions: 0,
    rowData: [],

    getRowHeight: function (params) {
      return 35;
    }
  };
  positionObj = [];
  rowDataT = [];

  loadPositionData = () => {
    axios
      .get(`${BASE_URL}/api/position`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        this.positionObj = response.data;
        console.log("response", response.data);
        this.setState({ positionData: response.data });
        this.setState({ loading: false });
        this.rowDataT = [];

        this.positionObj.map((data) => {
          let temp = {
            data,
            CompanyName: data["company"][0]["CompanyName"],
            PositionName: data["PositionName"]
          };

          this.rowDataT.push(temp);
        });
        // this.setState({ totalPositions: response.data.length });
        this.props.updateTotalPositions(response.data.length); // Update this line
      })
      .catch((error) => {
        console.log(error);
      });
  };

  onPositionDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record ? ") == true) {
      axios
        .delete(`${BASE_URL}/api/position/` + e, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          this.componentDidMount();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status == 403) {
            window.alert(err.response.data);
          }
        });
    }
  };
  componentDidMount() {
    this.loadPositionData();
  }
  renderButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() => this.onPositionDelete(params.data.data["_id"])}
      />
    );
  }
  renderEditButton(params) {
    console.log(params);
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => this.props.onEditPosition(params.data.data)}
      />
    );
  }

  render() {
    return (
      <div
        style={{ height: "100vh", width: "100%", scrollbarWidth: "thin" }}
        className="p-4"
      >
        <div className="d-flex justify-between mb-3">
          <div>
            <h2 className="fw-bold text-muted my-auto">Position Details</h2>
          </div>
          <Button
            className="my-auto shadow-sm"
            variant="primary"
            onClick={this.props.onAddPosition}
          >
            <FontAwesomeIcon icon={faPlus} id="plus-icon" />
            Create Position
          </Button>
        </div>
        <div id="clear-both" />
        <Table className="table">
          <thead>
            <tr>
              <th
                style={{
                  background: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)"
                }}
                className="py-1"
              >
                Company
              </th>
              <th
                style={{
                  background: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)"
                }}
                className="py-1"
              >
                Position
              </th>
              <th
                style={{
                  background: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)",
                  textAlign: "center"
                }}
                className="py-1"
              >
                {" "}
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {this.positionObj.map((data, index) => (
              <tr key={index}>
                <td className="text-capitalize fw-bold">
                  {data["company"][0]["CompanyName"]}
                </td>
                <td className="text-capitalize fw-bold">
                  {data["PositionName"]}
                </td>

                <td>
                  <div className="d-flex wrap-nowrap justify-content-end gap-3">
                    <span
                      onClick={() => this.props.onEditPosition(data)}
                      style={{ cursor: "pointer" }}
                      title="Update"
                      className="text-primary d-flex align-items-center gap-2 px-4 shadow-sm rounded-5"
                    >
                      <FontAwesomeIcon icon={faEdit} />
                      <span>Edit</span>
                    </span>
                    <span
                      onClick={() => this.onPositionDelete(data["_id"])}
                      style={{ cursor: "pointer" }}
                      title="Delete"
                      className="text-danger d-flex align-items-center gap-2 px-4 shadow-sm rounded-5"
                    >
                      <FontAwesomeIcon icon={faTrash} />
                      <span>Delete</span>
                    </span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}

export default PositionTable;
