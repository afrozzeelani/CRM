import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { Button } from "react-bootstrap";
import BASE_URL from "../config/config";

const DepartmentTable = ({ onAddDepartment, onEditDepartment }) => {
  const [departmentData, setDepartmentData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDepartmentData();
  }, []);

  const loadDepartmentData = () => {
    axios
      .get(`${BASE_URL}/api/department`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        const departmentObj = response.data;
        console.log("response", response.data);
        setDepartmentData(departmentObj);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onDepartmentDelete = (id) => {
    if (window.confirm("Are you sure to delete this record ?")) {
      axios
        .delete(`${BASE_URL}/api/department/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadDepartmentData();
        })
        .catch((err) => {
          console.log(err);
          console.log(err.response);
          if (err.response.status === 403) {
            window.alert(err.response.data);
          }
        });
    }
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-between aline-items-start mb-3">
        <div className="my-auto">
          <h3 className="fw-bold text-muted">Department Details</h3>
        </div>
        <Button
          className="my-auto"
          variant="primary shadow-sm"
          onClick={onAddDepartment}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Create Department
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th>Company</th>
            <th>Department</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {departmentData.map((item, index) => (
            <tr key={index}>
              <td className="text-capitalize fw-bold">
                {item.company[0].CompanyName}
              </td>
              <td className="text-capitalize fw-bold">{item.DepartmentName}</td>
              <td>
                <div className="d-flex wrap-nowrap justify-content-end gap-3">
                  <span
                    onClick={() => onEditDepartment(item)}
                    style={{ cursor: "pointer" }}
                    title="Update"
                    className="text-primary d-flex align-items-center gap-2 px-4 shadow-sm rounded-5"
                  >
                    <FontAwesomeIcon icon={faEdit} />
                    <span>Edit</span>
                  </span>
                  <span
                    onClick={() => onDepartmentDelete(item._id)}
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
      </table>
    </div>
  );
};

export default DepartmentTable;

// import React, { Component } from "react";
// import "./DepartmentTable.css";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";

// import { Button } from "react-bootstrap";
// import BASE_URL from "../config/config";

// class DepartmentTable extends Component {
//   state = {
//     departmentData: [],
//     loading: true
//   };
//   departmentObj = [];
//   rowDataT = [];

//   loadDepartmentData = () => {
//     axios
//       .get(`${BASE_URL}/api/department`, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//         this.departmentObj = response.data;
//         console.log("response", response.data);
//         this.setState({ departmentData: response.data });
//         this.setState({ loading: false });
//         this.rowDataT = [];

//         this.departmentObj.map((data) => {
//           let temp = {
//             data,
//             CompanyName: data["company"][0]["CompanyName"],
//             DepartmentName: data["DepartmentName"]
//           };

//           this.rowDataT.push(temp);
//         });
//         this.setState({ rowData: this.rowDataT });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onDepartmentDelete = (e) => {
//     console.log(e);
//     if (window.confirm("Are you sure to delete this record ? ") == true) {
//       axios
//         .delete(`${BASE_URL}/api/department/` + e, {
//           headers: {
//             authorization: localStorage.getItem("token") || ""
//           }
//         })
//         .then((res) => {
//           this.componentDidMount();
//         })
//         .catch((err) => {
//           console.log(err);
//           console.log(err.response);
//           if (err.response.status == 403) {
//             window.alert(err.response.data);
//           }
//         });
//     }
//   };
//   componentDidMount() {
//     this.loadDepartmentData();
//   }

//   renderButton(params) {
//     console.log(params);
//     return (
//       <FontAwesomeIcon
//         icon={faTrash}
//         onClick={() => this.onDepartmentDelete(params.data.data["_id"])}
//       />
//     );
//   }
//   renderEditButton(params) {
//     console.log(params);
//     return (
//       <FontAwesomeIcon
//         icon={faEdit}
//         onClick={() => this.props.onEditDepartment(params.data.data)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div className="p-4">
//         <div className="d-flex justify-between aline-items-start mb-3">
//           <div className=" my-auto">
//             <h3 className="fw-bold text-muted">Department Details</h3>
//           </div>

//           <Button
//             className="my-auto"
//             variant="primary shadow-sm"
//             onClick={this.props.onAddDepartment}
//           >
//             <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//             Create Department
//           </Button>
//         </div>
//         <table className="table">
//           <thead>
//             <th
//               style={{
//                 background: "var(--primaryDashColorDark)",
//                 color: "var(--primaryDashMenuColor)"
//               }}
//               className="py-1"
//             >
//               Company
//             </th>
//             <th
//               style={{
//                 background: "var(--primaryDashColorDark)",
//                 color: "var(--primaryDashMenuColor)"
//               }}
//               className="py-1"
//             >
//               Department
//             </th>
//             <th
//               style={{
//                 background: "var(--primaryDashColorDark)",
//                 color: "var(--primaryDashMenuColor)"
//               }}
//               className="py-1"
//             >
//               Action
//             </th>
//           </thead>

//           <tbody>
//             {this.state.departmentData.map((items, index) => (
//               <tr key={index}>
//                 <td className="text-capitalize fw-bold">
//                   {items["company"][0]["CompanyName"]}
//                 </td>
//                 <td className="text-capitalize fw-bold">
//                   {items.DepartmentName}
//                 </td>
//                 <td>
//                   <div className="d-flex wrap-nowrap justify-content-end gap-3">
//                     <span
//                       onClick={() => this.props.onEditDepartment(items)}
//                       style={{ cursor: "pointer" }}
//                       title="Update"
//                       className="text-primary d-flex align-items-center gap-2 px-4 shadow-sm rounded-5"
//                     >
//                       <FontAwesomeIcon icon={faEdit} />
//                       <span>Edit</span>
//                     </span>
//                     <span
//                       onClick={() => this.onDepartmentDelete(items["_id"])}
//                       style={{ cursor: "pointer" }}
//                       title="Delete"
//                       className="text-danger d-flex align-items-center gap-2 px-4 shadow-sm rounded-5"
//                     >
//                       <FontAwesomeIcon icon={faTrash} />
//                       <span>Delete</span>
//                     </span>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       // <div id="table-outer-div-scroll">
//       //   <h2 id="role-title">Department Details</h2>
//       //   <Button
//       //     variant="primary"
//       //     id="add-button"
//       //     onClick={this.props.onAddDepartment}
//       //   >
//       //     <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//       //     Add
//       //   </Button>

//       //   <div id="clear-both" />
//       //   {!this.state.loading ? (
//       //     <div
//       //       id="table-div"
//       //       className="ag-theme-balham"
//       //       //   style={
//       //       //     {
//       //       //     height: "500px",
//       //       //     width: "100%"
//       //       //   }
//       //       // }
//       //     >
//       //       <AgGridReact
//       //         columnDefs={this.state.columnDefs}
//       //         defaultColDef={this.state.defaultColDef}
//       //         columnTypes={this.state.columnTypes}
//       //         rowData={this.state.rowData}
//       //         // floatingFilter={true}
//       //         // onGridReady={this.onGridReady}
//       //         pagination={true}
//       //         paginationPageSize={10}
//       //         getRowHeight={this.state.getRowHeight}
//       //       />
//       //     </div>
//       //   ) : (
//       //     <div id="loading-bar">
//       //       <RingLoader
//       //         css={override}
//       //         sizeUnit={"px"}
//       //         size={50}
//       //         color={"#0000ff"}
//       //         loading={true}
//       //       />
//       //     </div>
//       //   )}
//       //
//       // </div>
//     );
//   }
// }

// export default DepartmentTable;
