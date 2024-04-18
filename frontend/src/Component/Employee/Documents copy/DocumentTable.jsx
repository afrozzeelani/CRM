import React, { useState, useEffect } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import { RingLoader } from "react-spinners";
import { css } from "@emotion/core";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { IoMdDownload } from "react-icons/io";
import {
  FaCamera,
  FaFileAudio,
  FaFileImage,
  FaRegFileImage,
  FaRegFilePdf
} from "react-icons/fa";
import { IoArrowBackCircle, IoEye } from "react-icons/io5";

const override = css`
  display: block;
  margin: 0 auto;
  margin-top: 45px;
  border-color: red;
`;

const DocumentTable = (props) => {
  const [showDownloadbtn, setShowDownloadbtn] = useState(null);
  const [visibleDocs, setVisibleDocs] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [files, setFiles] = useState([]);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await axios.get("http://localhost:4000/documents");
      setDocuments(response.data);
    } catch (error) {
      console.error("Error fetching documents:", error);
    }
  };

  const handleFileChange = (e) => {
    setFiles(e.target.files);
  };

  // Corrected function declaration
  const renderButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
  };

  // Corrected function declaration
  const renderEditButton = (params) => {
    console.log(params);
    if (props.back) {
      return <React.Fragment />;
    }
    return (
      <FontAwesomeIcon
        icon={faEdit}
        onClick={() => props.onEditDocument(params.data.data)}
      />
    );
  };

  return (
    <div id="table-outer-div-scroll">
      <h2 id="role-title">
        Uploaded Documents Details{" "}
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
        <Button variant="primary" id="add-button" onClick={props.onAddDocument}>
          <FontAwesomeIcon icon={faPlus} id="plus-icon" />
          Add Document
        </Button>
      )}
      {/* <div id="clear-both" /> <h2>Uploaded Documents</h2> */}

      {documents == null
        ? ""
        : documents.map((document, index) => (
            <div key={index}>
              <h3>{document.title}</h3>
              <h3>{document.number}</h3>
              <img
                // src={require(`../../../uploads/${document.files[0]}`)}
                src={
                  document?.files
                    ? document?.files
                    : "https://a.storyblok.com/f/191576/1200x800/215e59568f/round_profil_picture_after_.webp"
                }
                alt={`Preview of ${document.title}`}
                height={100}
                width={100}
              />
            </div>
          ))}
    </div>
  );
};

export default DocumentTable;

// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPlus, faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
// import { RingLoader } from "react-spinners";
// import { css } from "@emotion/core";
// import { Button } from "react-bootstrap";
// import { Link } from "react-router-dom";
// import { IoMdDownload } from "react-icons/io";
// import {
//   FaCamera,
//   FaFileAudio,
//   FaFileImage,
//   FaRegFileImage,
//   FaRegFilePdf
// } from "react-icons/fa";
// import { IoArrowBackCircle, IoEye } from "react-icons/io5";

// const override = css`
//   display: block;
//   margin: 0 auto;
//   margin-top: 45px;
//   border-color: red;
// `;

// const DocumentTable = (props) => {
//   const [showDownloadbtn, setShowDownloadbtn] = useState(null);
//   const [visibleDocs, setVisibleDocs] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [files, setFiles] = useState([]);

//   useEffect(() => {
//     fetchDocuments();
//   }, []);

//   const fetchDocuments = async () => {
//     try {
//       const response = await axios.get("http://localhost:4000/documents");
//       setDocuments(response.data);
//     } catch (error) {
//       console.error("Error fetching documents:", error);
//     }
//   };

//   const handleFileChange = (e) => {
//     setFiles(e.target.files);
//   };

//   // Corrected function declaration
//   const renderButton = (params) => {
//     console.log(params);
//     if (props.back) {
//       return <React.Fragment />;
//     }
//   };

//   // Corrected function declaration
//   const renderEditButton = (params) => {
//     console.log(params);
//     if (props.back) {
//       return <React.Fragment />;
//     }
//     return (
//       <FontAwesomeIcon
//         icon={faEdit}
//         onClick={() => props.onEditDocument(params.data.data)}
//       />
//     );
//   };

//   const renderFileIcon = (fileName) => {
//     if (fileName) {
//       const fileExtension = fileName.split(".").pop().toLowerCase();
//       switch (fileExtension) {
//         case "jpg":
//         case "jpeg":
//         case "png":
//         case "gif":
//           return <FaFileImage />;
//         case "pdf":
//           return <FaRegFilePdf />;
//         case "mp3":
//         case "wav":
//         case "ogg":
//           return <FaFileAudio />;
//         default:
//           return <FaRegFileImage />;
//       }
//     } else {
//       return null;
//     }
//   };

//   return (
//     <div id="table-outer-div-scroll">
//       <h2 id="role-title">
//         Uploaded Documents Details{" "}
//         {props.back
//           ? "of " + props.data["FirstName"] + " " + props.data["LastName"]
//           : ""}
//       </h2>
//       {props.back ? (
//         <Link to="/hr/employee">
//           <Button variant="primary" id="add-button">
//             Back
//           </Button>
//         </Link>
//       ) : (
//         <Button variant="primary" id="add-button" onClick={props.onAddDocument}>
//           <FontAwesomeIcon icon={faPlus} id="plus-icon" />
//           Add Document
//         </Button>
//       )}

//       {documents == null
//         ? ""
//         : documents.map((document, index) => (
//             <div key={index}>
//               <h3>{document.title}</h3>
//               <h3>{document.number}</h3>
//               {document.files && (
//                 <div>
//                   {document.files.map((file, fileIndex) => (
//                     <div key={fileIndex}>
//                       {renderFileIcon(file)}
//                       <img
//                         src={file}
//                         alt={`Preview of ${document.title}`}
//                         height={100}
//                         width={100}
//                       />
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           ))}
//     </div>
//   );
// };

// export default DocumentTable;

{
  /* {documents == null
        ? ""
        : documents.map((data) => {
            return (
              <img
                src={require(`../../../uploads/${data.files[0]}`)}
                height={150}
                width={150}
              />
            );
          })}
      <div
        style={{
          overflow: "hidden auto",
          height: "27rem",
          scrollbarWidth: "thin"
        }}
      >
        <div className="row mx-2 pb-3 column-gap-4 row-gap-4">
          {documents.reverse().map((data, index) => (
            <div
              key={index}
              onMouseEnter={() => setShowDownloadbtn("name")}
              onMouseLeave={() => setShowDownloadbtn(null)}
              className="d-flex flex-column gap-2 rounded px-2 py-1 shadow"
              style={{ height: "190px", width: "250px" }}
            >
              <div
                style={{
                  height: "150px",
                  width: "100%",
                  overflow: "hidden",
                  background: `url(${data.docURL})`,
                  backgroundPosition: "center",
                  backgroundSize: "cover",
                  opacity: "85%",
                  boxShadow: "0 0 10px 1px rgba(192, 185, 185, 0.758) inset"
                }}
                className="bg-primary m-auto position-relative "
              >
                <div
                  style={{
                    height: "100%",
                    width: "100%",
                    position: "absolute",
                    top: "0",
                    left: "0",
                    background: "rgba(0,0,0,.4)",
                    display: showDownloadbtn ? "flex" : "none",
                    justifyContent: "center",
                    alignItems: "center",
                    gap: "1rem"
                  }}
                >
                  <a
                    target="_blank"
                    href={data.docURL}
                    style={{ height: "40px", width: "40px" }}
                    className="btn p-0 btn bg-white text-primary shadow d-flex"
                  >
                    <IoEye className="m-auto fs-4" />
                  </a>
                  <a
                    download={data.docURL}
                    href={data.docURL}
                    style={{ height: "40px", width: "40px" }}
                    className="btn p-0 btn bg-white text-primary shadow d-flex"
                  >
                    <IoMdDownload className="m-auto fs-4" />
                  </a>
                </div>
                <div
                  style={{
                    height: "30px",
                    width: "30px",
                    position: "absolute",
                    bottom: "0",
                    right: "0",
                    opacity: "100%"
                  }}
                  className="bg-white d-flex shadow-sm text-danger"
                >
                  {data.docURL.toLowerCase().endsWith(".pdf") && (
                    <FaRegFilePdf className="m-auto fs-3 text-black" />
                  )}
                  {(data.docURL.toLowerCase().endsWith(".jpeg") ||
                    data.docURL.toLowerCase().endsWith(".jpg")) && (
                    <FaFileImage className="m-auto fs-3" />
                  )}
                  {data.docURL.toLowerCase().endsWith(".png") && (
                    <FaRegFileImage className="m-auto fs-3" />
                  )}
                  {data.docURL.toLowerCase().endsWith(".mp3") && (
                    <FaFileAudio className="m-auto fs-3" />
                  )}
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p
                  style={{ fontSize: ".9rem" }}
                  className="text-muted fw-bold m-0"
                >
                  {data.docTitle}
                </p>{" "}
                <p
                  style={{ fontSize: ".7rem" }}
                  className="text-primary fw-bold m-0"
                >
                  {data.docSize} MB
                </p>
              </div>
            </div>
          ))}
        </div>
      </div> */
}
