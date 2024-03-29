import React, { useState, useEffect } from "react";
import axios from "axios";
import "./FamilyInfoTable.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import BASE_URL from "../../../Pages/config/config";
import InnerDashContainer from "../../InnerDashContainer";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const FamilyInfoTable = (props) => {
  const [familyInfoData, setFamilyInfoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const familyInfoObj = [];

  const loadFamilyInfoData = () => {
    axios
      .get(`${BASE_URL}/api/family-info/` + localStorage.getItem("_id"), {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        familyInfoObj.push(response.data);
        console.log("response", response.data);
        setFamilyInfoData(response.data);
        setLoading(false);
        const tempRowData = response.data.familyInfo.map((data) => ({
          data,
          Name: data["Name"],
          Relationship: data["Relationship"],
          DOB: data["DOB"].slice(0, 10),
          Occupation: data["Occupation"]
        }));
        setRowData(tempRowData);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onFamilyInfoDelete = (e1, e2) => {
    console.log(e1, e2);
    if (window.confirm("Are you sure to delete this record? ") === true) {
      axios
        .delete(`${BASE_URL}/api/family-info/` + e1 + "/" + e2, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadFamilyInfoData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadFamilyInfoData();
  }, []);

  const renderButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faTrash}
        onClick={() =>
          onFamilyInfoDelete(props.data["_id"], params.data.data["_id"])
        }
      />
    );
  };

  const renderEditButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditFamilyInfo(params.data.data)}
      />
    );
  };

  return (
    <InnerDashContainer>
      <h2 id="role-title">
        Employee Family Details{" "}
        {props.back
          ? "of " + props.data["FirstName"] + " " + props.data["LastName"]
          : ""}
      </h2>

      {props.back ? (
        <Link to="/hr/employee">
          <Button variant="primary" id="add-button">
            Back
          </Button>
        </Link>
      ) : (
        <Button
          variant="primary"
          id="add-button"
          onClick={props.onAddFamilyInfo}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add
        </Button>
      )}

      <div id="clear-both" />

      {!loading ? (
        <table className="table table-striped">
          <thead>
            <tr>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Name
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Relationship
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                DOB
              </th>
              <th
                style={{
                  background: "linear-gradient(165deg, #700B97, 90%, #C84B31)",
                  color: "white"
                }}
              >
                Occupation
              </th>
            </tr>
          </thead>
          <tbody>
            {rowData.map((items, index) => (
              <tr key={index}>
                <td className="text-uppercase">{items.Name}</td>
                <td className="text-uppercase">{items.Relationship}</td>
                <td className="text-uppercase">{items.DOB}</td>
                <td className="text-uppercase">{items.Occupation}</td>
                {/* <td>
                  {" "}
                  <button
                    onClick={() => props.onEditFamilyInfo(items.data)}
                    style={{
                      zIndex: "1",
                      cursor: "pointer"
                    }}
                    className="btn"
                  >
                    <FaRegEdit className="fs-4 text-primary bg-white p-1 rounded-5" />
                  </button>
                </td> */}
              </tr>
            ))}
          </tbody>
        </table>
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
    </InnerDashContainer>
  );
};

export default FamilyInfoTable;
