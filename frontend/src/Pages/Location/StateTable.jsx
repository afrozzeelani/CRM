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

const StateTable = (props) => {
  const [stateData, setStateData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [rowData, setRowData] = useState([]);

  const loadStateData = () => {
    axios
      .get(`${BASE_URL}/api/state`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        const stateObj = response.data;
        setStateData(stateObj);
        setLoading(false);
        const rowDataT = stateObj.map((data) => ({
          data,
          CountryName: data["country"][0]["CountryName"],
          StateName: data["StateName"]
        }));
        setRowData(rowDataT);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onStateDelete = (id) => {
    if (window.confirm("Are you sure to delete this record?")) {
      axios
        .delete(`${BASE_URL}/api/state/${id}`, {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        })
        .then((res) => {
          loadStateData();
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

  useEffect(() => {
    loadStateData();
  }, []);

  const renderButton = (params) => (
    <FontAwesomeIcon
      icon={faTrash}
      onClick={() => onStateDelete(params.data.data["_id"])}
    />
  );

  const renderEditButton = (params) => (
    <FontAwesomeIcon
      icon={faEdit}
      onClick={() => props.onEditState(params.data.data)}
    />
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-between aline-items-start mb-3">
        <div className=" my-auto">
          <h3 className="fw-bold text-muted">State Details</h3>
          <p>You can create new state and view all state details here!</p>
        </div>

        <Button
          variant="primary"
          className="my-auto"
          id="add-button"
          onClick={props.onAddState}
        >
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add new State
        </Button>
      </div>

      <div id="clear-both"></div>

      {!loading ? (
        <table className="table">
          <thead>
            <tr>
              <th
                style={{
                  background: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)"
                }}
              >
                Country
              </th>
              <th
                style={{
                  background: "var(--primaryDashColorDark)",
                  color: "var(--primaryDashMenuColor)"
                }}
              >
                State
              </th>
            </tr>
          </thead>
          <tbody>
            {stateData.map((items, index) => (
              <tr key={index}>
                <td className="text-uppercase">
                  {items.country[0].CountryName}
                </td>
                <td className="text-uppercase">{items.StateName}</td>
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
    </div>
  );
};

export default StateTable;

// import React, { Component } from "react";
// import "./StateTable.css";
// import axios from "axios";
// // import { HashRouter as Router, Route, Link } from "react-router-dom";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { RingLoader } from "react-spinners";
// import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
// import BASE_URL from "../config/config";

// // var FontAwesome = require('react-fontawesome');
// import "ag-grid-community/dist/styles/ag-grid.css";
// import "ag-grid-community/dist/styles/ag-theme-balham.css";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;
// class StateTable extends Component {
//   state = {
//     stateData: [],
//     loading: true,
//     rowData: []
//   };

//   // stateDataArray;
//   loadStateData = () => {
//     axios
//       .get(`${BASE_URL}/api/state`, {
//         headers: {
//           authorization: localStorage.getItem("token") || ""
//         }
//       })
//       .then((response) => {
//         // if(response.data.length==0){this.stateObj=["temp"];}
//         // else{
//         this.stateObj = response.data;
//         // }
//         console.log("response", response.data);
//         this.setState({ stateData: response.data });
//         this.setState({ loading: false });
//         this.rowDataT = [];

//         this.stateObj.map((data) => {
//           let temp = {
//             data,
//             CountryName: data["country"][0]["CountryName"],
//             StateName: data["StateName"]
//           };

//           this.rowDataT.push(temp);
//         });
//         this.setState({ rowData: this.rowDataT });
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   };

//   onStateDelete = (e) => {
//     console.log(e);
//     // let body= "ID=" + e;
//     if (window.confirm("Are you sure to delete this record ? ") == true) {
//       axios
//         .delete(`${BASE_URL}/api/state/` + e, {
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
//     this.loadStateData();
//   }
//   renderButton(params) {
//     console.log(params);
//     return (
//       <FontAwesomeIcon
//         icon={faTrash}
//         onClick={() => this.onStateDelete(params.data.data["_id"])}
//       />
//     );
//   }
//   renderEditButton(params) {
//     console.log(params);
//     return (
//       <FontAwesomeIcon
//         icon={faEdit}
//         onClick={() => this.props.onEditState(params.data.data)}
//       />
//     );
//   }

//   render() {
//     return (
//       <div className="p-4">
//         <div className="d-flex justify-between aline-items-start mb-3">
//           <div className=" my-auto">
//             <h3 className="fw-bold text-muted">State Details</h3>
//             <p>You can create new state and view all state details here !</p>
//           </div>

//           <Button
//             variant="primary"
//             className="my-auto"
//             id="add-button"
//             onClick={this.props.onAddState}
//           >
//             <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//             Add new State
//           </Button>
//         </div>

//         <div id="clear-both"></div>

//         {!this.state.loading ? (
//           <table className="table">
//             <thead>
//               <tr>
//                 <th
//                   style={{
//                     background: "var(--primaryDashColorDark)",
//                     color: "var(--primaryDashMenuColor)"
//                   }}
//                 >
//                   Country
//                 </th>
//                 <th
//                   style={{
//                     background: "var(--primaryDashColorDark)",
//                     color: "var(--primaryDashMenuColor)"
//                   }}
//                 >
//                   State
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               {this.state.stateData.map((items, index) => (
//                 <tr key={index}>
//                   <td className="text-uppercase">
//                     {items.country[0].CountryName}
//                   </td>
//                   <td className="text-uppercase">{items.StateName}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         ) : (
//           <div id="loading-bar">
//             <RingLoader
//               css={override}
//               sizeUnit={"px"}
//               size={50}
//               color={"#0000ff"}
//               loading={true}
//             />
//           </div>
//         )}
//       </div>
//     );
//   }
// }

// export default StateTable;
