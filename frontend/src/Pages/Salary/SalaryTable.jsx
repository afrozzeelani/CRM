import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import "./SalaryTable.css";
import { LuSearch } from "react-icons/lu";
import { GrFormPrevious } from "react-icons/gr";
import { RxCaretSort } from "react-icons/rx";
import { MdNearbyError } from "react-icons/md";
import BASE_URL from "../config/config";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const AdminSalaryTable = (props) => {
  const [salaryData, setSalaryData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortField, setSortField] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(8);

  const loadSalaryData = () => {
    axios
      .get(`${BASE_URL}/api/salary`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        const salaryObj = response.data;
        console.log("response", response.data);
        setSalaryData(response.data);
        setLoading(false);

        const rowDataT = salaryObj.map((data) => ({
          data,
          EmployeeName: `${data["FirstName"]} ${data["LastName"]}`,
          PositionName: data["position"][0]["PositionName"],
          BasicSalary: data["salary"][0]["BasicSalary"],
          BankName: data["salary"][0]["BankName"],
          AccountNo: data["salary"][0]["AccountNo"],
          AccountHolderName: data["salary"][0]["AccountHolderName"],
          IFSCcode: data["salary"][0]["IFSCcode"],
          TaxDeduction: data["salary"][0]["TaxDeduction"]
        }));

        setSalaryData(rowDataT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onSalaryDelete = (e) => {
    console.log(e);
    if (window.confirm("Are you sure to delete this record? ")) {
      axios
        .delete(`${BASE_URL}/api/salary/${e}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadSalaryData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    loadSalaryData();
  }, []);

  const handleSort = (field) => {
    setSortField(field);
    setSortOrder((prevOrder) =>
      sortField === field ? (prevOrder === "asc" ? "desc" : "asc") : "asc"
    );
  };

  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const renderSortIcon = (field) => {
    if (sortField === field) {
      return sortOrder === "asc" ? "▴" : "▾";
    }
    return null;
  };

  const sortedAndFilteredData = salaryData
    .slice()
    .filter((item) =>
      item.EmployeeName.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortField) {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (typeof aValue === "string" && typeof bValue === "string") {
          return sortOrder === "asc"
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        } else {
          return sortOrder === "asc" ? aValue - bValue : bValue - aValue;
        }
      }
      return 0;
    });

  const handlePaginationNext = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePaginationPrev = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  // Calculate index of the last and first item for pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = sortedAndFilteredData.slice(
    indexOfFirstItem,
    indexOfLastItem
  );

  // Generate array of page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil(sortedAndFilteredData.length / itemsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }

  return (
    <div>
      <div className=" row mx-auto bg-light shadow-sm mb-3 py-1">
        <div className=" my-auto d-flex justify-content-between">
          <h5 className="fw-bold my-auto text-uppercase text-muted">
            Salary Details
          </h5>

          <div className="d-flex gap-2 justify-content-between py-1">
            <Button
              className="my-auto d-flex gap-1 my-auto"
              id="add-button"
              onClick={props.onAddSalary}
            >
              + <span className="d-none d-sm-block">Add Salary</span>
            </Button>
            <div className="searchholder p-0 d-flex  position-relative">
              <input
                style={{
                  height: "100%",
                  width: "100%",
                  paddingLeft: "15%"
                }}
                className="form-control pr-0 border border-primary border-2"
                type="text"
                placeholder="Search by name"
                value={searchQuery}
                onChange={handleSearchInputChange}
              />
              <LuSearch
                style={{ position: "absolute", top: "30%", left: "5%" }}
              />
            </div>
          </div>
        </div>
      </div>

      <div id="clear-both" />
      {!loading ? (
        <div className="row m-auto">
          <div style={{ height: "75vh", overflow: "auto", width: "100%" }}>
            <div style={{ height: "95%", overflow: "scroll" }}>
              {" "}
              <table className="table">
                <thead>
                  <tr style={{ position: "sticky", top: "0", zIndex: "3" }}>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      onClick={() => handleSort("EmployeeName")}
                    >
                      <RxCaretSort />
                      Name {renderSortIcon("EmployeeName")}
                    </th>

                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("BasicSalary")}
                    >
                      Designation {renderSortIcon("BasicSalary")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      onClick={() => handleSort("BasicSalary")}
                    >
                      <RxCaretSort />
                      Salary {renderSortIcon("BasicSalary")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("BankName")}
                    >
                      Bank Name {renderSortIcon("BankName")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("AccountNo")}
                    >
                      Account No {renderSortIcon("AccountNo")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("AccountHolderName")}
                    >
                      Account Holder Name {renderSortIcon("AccountHolderName")}
                    </th>

                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("IFSCcode")}
                    >
                      IFSC Code {renderSortIcon("IFSCcode")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)",
                        cursor: "pointer",
                        whiteSpace: "pre"
                      }}
                      className="py-2"
                      // onClick={() => handleSort("TaxDeduction")}
                    >
                      Tax Deduction {renderSortIcon("TaxDeduction")}
                    </th>
                    <th
                      style={{
                        background: "var(--primaryDashColorDark)",
                        color: "var(--primaryDashMenuColor)"
                      }}
                      className="py-2 text-center"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {currentItems.length > 0 ? (
                    currentItems.map((item, index) => (
                      <tr key={index}>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-capitalize "
                        >
                          <div className="d-flex flex-nowrap gap-2 ">
                            <div style={{ height: "40px", width: "40px" }}>
                              <img
                                style={{
                                  height: "100%",
                                  width: "100%",
                                  borderRadius: "50%",
                                  overflow: "hidden",
                                  objectFit: "cover"
                                }}
                                src={
                                  item?.data?.profile?.image_url
                                    ? item?.data?.profile?.image_url
                                    : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                                }
                                alt=""
                              />
                            </div>
                            <span className="my-auto fw-bold text-muted">
                              {" "}
                              {item.EmployeeName}
                            </span>
                          </div>
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                        >
                          {item.PositionName}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-primary fw-bold"
                        >
                          {item.BasicSalary}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-uppercase  "
                        >
                          {item.BankName}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-uppercase "
                        >
                          {item.AccountNo}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-capitalize "
                        >
                          {item.AccountHolderName}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className="text-uppercase "
                        >
                          {item.IFSCcode}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className=""
                        >
                          {item.TaxDeduction}
                        </td>
                        <td
                          style={{ verticalAlign: "middle", whiteSpace: "pre" }}
                          className=""
                        >
                          <div className="d-flex  gap-3 justify-content-around">
                            <FontAwesomeIcon
                              className="text-danger"
                              icon={faTrash}
                              onClick={() => onSalaryDelete(item.data._id)}
                            />
                            <FontAwesomeIcon
                              className="text-primary"
                              icon={faEdit}
                              onClick={() => props.onEditSalary(item.data)}
                            />
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <div
                      style={{
                        height: "30vh",
                        width: "94%",
                        position: "absolute"
                      }}
                      className="d-flex flex-column justify-content-center align-items-center gap-1"
                    >
                      <span className="fw-bolder " style={{ fontSize: "2rem" }}>
                        <MdNearbyError
                          className="text-danger"
                          style={{ fontSize: "2.3rem" }}
                        />{" "}
                        OOPS!
                      </span>
                      <h6 className="p-0 m-0">Record not found.</h6>
                    </div>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div
            style={{ position: "stickey", bottom: "1%" }}
            className="container-fluid bg-light p-2 d-flex justify-content-between"
          >
            <Button
              className="d-flex gap-2"
              onClick={handlePaginationPrev}
              disabled={currentPage === 1}
            >
              <GrFormPrevious className="my-auto " /> Previous
            </Button>
            <div className="pagination d-flex flex-nowrap gap-2">
              {pageNumbers.map((number) => (
                <Button
                  key={number}
                  style={{
                    backgroundColor:
                      currentPage === number ? "active" : "white",
                    border: "none",
                    color: "gray",
                    boxShadow: "0 0 5px 1px rgba(226, 223, 223,1)"
                  }}
                  onClick={() => setCurrentPage(number)}
                  className={currentPage === number ? "active" : ""}
                >
                  {number}
                </Button>
              ))}
            </div>
            <Button
              onClick={handlePaginationNext}
              className="d-flex gap-3"
              disabled={indexOfLastItem >= sortedAndFilteredData.length}
            >
              <span className="">Next</span>{" "}
              <GrFormPrevious
                className="my-auto"
                style={{ rotate: "180deg" }}
              />
            </Button>
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

export default AdminSalaryTable;
