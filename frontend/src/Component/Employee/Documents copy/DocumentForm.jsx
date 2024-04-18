import React, { useState } from "react";
import styled from "styled-components";
import { FiUploadCloud } from "react-icons/fi";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const DropArea = styled.div`
  background: url(https://wallpapers.com/images/featured/cxs6kmx3wgbnzz0x.jpg);
  background-position: center;
  background-size: cover;
  border: 2px dashed rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
  text-align: center;
  overflow: hidden;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.progress}%;
  height: 20px;
  background-color: #007bff;
  transition: width 0.3s ease-in-out;
`;

const DocumentUpdateForm = (props) => {
  const [progress, setProgress] = useState(0);
  const [fileDetails, setFileDetails] = useState(null);
  const [title, setTitle] = useState("");
  const [number, setNumber] = useState("");
  const [files, setFiles] = useState([]);

  const handleDocumentSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("number", number);
    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }
    try {
      await axios.post("http://localhost:4000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      });
      // Clear form fields and files after successful upload
      setTitle("");

      setNumber("");
      setFiles([]);
    } catch (error) {
      console.error("Error uploading document:", error);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    uploadFile(file);
  };

  const uploadFile = (file) => {
    // Set file details immediately
    const { name, size, type } = file;
    setFileDetails({ name, size, type });

    // Simulating file upload progress
    const interval = setInterval(() => {
      if (progress < 100) {
        setProgress((progress) => progress + 10);
      } else {
        clearInterval(interval);
      }
    }, 500);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    uploadFile(file);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div className="mt-3" style={{ minHeight: "28rem", maxHeight: "28rem" }}>
      <form
        style={{ height: "100%" }}
        action=""
        onSubmit={handleDocumentSubmit}
      >
        <div style={{ height: "100%" }} className="row container">
          <div
            style={{ height: "100%" }}
            className="col-12 d-flex gap-2 flex-column"
          >
            <div className="row">
              <div className="col-6">
                <label htmlFor="" className="fw-bold">
                  Document Title
                </label>
                <input
                  required
                  className="form-control w-100"
                  placeholder="Please Enter Document Title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>
              <div className="col-6">
                <label htmlFor="" className="fw-bold">
                  Document Number
                </label>
                <input
                  required
                  className="form-control w-100"
                  placeholder="Please Enter Document Number"
                  type="text"
                  value={number}
                  onChange={(e) => setNumber(e.target.value)}
                />
              </div>
            </div>
            {fileDetails && (
              <div className="row  gap-2">
                <div>
                  <label htmlFor="" className="fw-bold">
                    File Name
                  </label>
                  <input
                    className="form-control w-100"
                    value={fileDetails.name}
                    placeholder="Enter Document Title"
                    type="text"
                  />
                </div>
                <div className="row">
                  <div className="col-6">
                    <label htmlFor="" className="fw-bold">
                      File Size
                    </label>
                    <input
                      className="form-control w-100"
                      value={
                        (fileDetails.size / (1024 * 1024)).toFixed(2) + " MB"
                      }
                      placeholder="Enter Document Title"
                      type="text"
                    />
                  </div>
                  <div className="col-6">
                    <label htmlFor="" className="fw-bold">
                      File Type
                    </label>
                    <input
                      className="form-control w-100"
                      value={fileDetails.type}
                      placeholder="Enter Document Title"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            )}
            <div
              style={{ overflow: "hidden" }}
              className="my-2 position-relative rounded-2 d-flex"
            >
              <DropArea
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                style={{ cursor: "pointer" }}
                className="mx-auto w-100 d-flex flex-column justify-content-center align-items-center"
              >
                <input
                  onChange={handleFileChange}
                  className="rounded-5 opacity-0"
                  style={{
                    minHeight: "100%",
                    minWidth: "100%",
                    position: "absolute",
                    cursor: "pointer"
                  }}
                  type="file"
                  name=""
                  id=""
                />
                <FiUploadCloud
                  style={{ cursor: "pointer" }}
                  className="fs-1 text-primary"
                />
                <span
                  style={{ cursor: "pointer" }}
                  className="fw-bold text-primary"
                >
                  Drag file or Select file{" "}
                </span>
              </DropArea>
            </div>
            <button className="btn shadow">Upload</button>
            <Form.Group as={Row} id="form-cancel-button">
              <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
                <Button type="reset" onClick={props.onFormClose}>
                  cancel
                </Button>
              </Col>
            </Form.Group>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DocumentUpdateForm;

// import React from "react";
// import { Form, Button, Col, Row } from "react-bootstrap";
// import axios from "axios";

// const WorkExperienceForm = (props) => {
//   return (
//     <div>
//       <h2 id="role-form-title">Add WorkExperience Details</h2>
//       <div id="role-form-outer-div">
//         <Form id="form" onSubmit={props.onWorkExperienceSubmit}>
//           <Form.Group as={Row}>
//             <Form.Label column sm={2}>
//               Company Name
//             </Form.Label>
//             <Col sm={10} className="form-input">
//               <Form.Control type="Text" placeholder="CompanyName" required />
//             </Col>
//           </Form.Group>
//           <Form.Group as={Row}>
//             <Form.Label column sm={2}>
//               Designation
//             </Form.Label>
//             <Col sm={10} className="form-input">
//               <Form.Control type="Text" placeholder="Designation" required />
//             </Col>
//           </Form.Group>
//           <Form.Group as={Row}>
//             <Form.Label column sm={2}>
//               FromDate
//             </Form.Label>
//             <Col sm={10} className="form-input">
//               <Form.Control type="date" required />
//             </Col>
//           </Form.Group>
//           <Form.Group as={Row}>
//             <Form.Label column sm={2}>
//               ToDate
//             </Form.Label>
//             <Col sm={10} className="form-input">
//               <Form.Control type="date" placeholder="ToDate" required />
//             </Col>
//           </Form.Group>

//           <Form.Group as={Row} id="form-submit-button">
//             <Col sm={{ span: 10, offset: 2 }}>
//               <Button type="submit">Submit</Button>
//             </Col>
//           </Form.Group>
//           <Form.Group as={Row} id="form-cancel-button">
//             <Col sm={{ span: 10, offset: 2 }} id="form-cancel-button-inner">
//               <Button type="reset" onClick={props.onFormClose}>
//                 cancel
//               </Button>
//             </Col>
//           </Form.Group>
//         </Form>
//       </div>
//     </div>
//   );
// };

// export default WorkExperienceForm;
