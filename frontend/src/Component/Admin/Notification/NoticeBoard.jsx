import React, { useEffect, useState, useContext } from 'react'
import { TiDeleteOutline } from "react-icons/ti";
import { AttendanceContext } from "../../../Context/AttendanceContext/AttendanceContext";
import axios from 'axios';
const NoticeBoard = () => {
    const [notice, setNotice] = useState([]);
    const {socket} = useContext(AttendanceContext);
    const id = localStorage.getItem("_id");
    const loadEmployeeData = () => {
        axios
          .get(`http://localhost:4000/api/particularEmployee/${id}`, {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          })
          .then((response) => {
           
         
            setNotice(response.data.Notice)
            
          })
          .catch((error) => {
            console.log(error);
          });
      };
      useEffect(()=>{
        loadEmployeeData()
      },[]);
      useEffect(() => {
        console.log('Socket:', socket?.id);
        if (socket) {
          socket.on("notice", (data) => {
           setNotice((prev)=>[data,...prev])
          });
          socket.on("noticeDelete", (data)=>{
            if(data){
                loadEmployeeData() 
            }
          })
        }
      }, [socket]);
    const  pdfHandler = (path)=>{
        window.open(
            `http://localhost:4000/${path}`,
            "_blank",
            "noreferrer"
          );
        // window.open(path, "_blank")
    }
    const deleteHandler=(id)=>{
        axios
          .post("http://localhost:4000/api/noticeDelete", {noticeId:id})
          .then((res) => {
       alert("Notice delete")
          })
          .catch((err) => {
            console.log(err);
          });
      
    }
  return (
    <div className="container box-shadow: 0 4px 10px 0 rgb(137 137 137 / 25%); mt-4 ">
      <div className="birthday">
        <h4 className="fw-bolder d-flex text-muted gap-0 text-center">
          Notice Board{" "}
          <span className="text-primary mx-2">
            ({notice.length})
          </span>
        </h4>
        <div
          className="mainbirth"
          style={{ maxWidth: "100%", overflowX: "auto" }}
        >
          {notice.length > 0 ? (
            <table className="table table-striped mt-3">
              <thead>
                <tr>
                  
                  <th className='cursor-pointer' style={{ width: "80%" }}>Notice</th>
                  <th style={{ width: "80%" }}>Action</th>
                </tr>
              </thead>
              <tbody>
              {notice.filter((val, i, ar) => ar.findIndex(item => item.noticeId === val.noticeId) === i).map((val) => (
  <tr key={val.noticeId} style={{ cursor: "pointer" }}>
    <td onClick={() => pdfHandler(val.attachments)}>{`${val.notice}`}</td>
    <td style={{ fontSize: "22px", color: "red", textAlign: "center" }}>
      <TiDeleteOutline onClick={() => deleteHandler(val.noticeId)} />
    </td>
  </tr>
))}
              </tbody>
            </table>
          ) : (
            <p>No Notice</p>
          )}
        </div>
      </div>
    </div>
  )
}

export default NoticeBoard
