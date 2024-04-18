import React, { useState, useContext, useEffect } from "react";
import { Navbar } from "react-bootstrap";
import axios from "axios";
import Logo from "../../img/logo.png";
import "./NavBar.css";
import { LuBell } from "react-icons/lu";
import { IoMdClose } from "react-icons/io";
// import Switch from "react-switch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import { AttendanceContext } from "../../Context/AttendanceContext/AttendanceContext";
import { useHistory } from "react-router-dom";
import addNotification from "react-push-notification";
import { useLocation } from "react-router-dom/cjs/react-router-dom";
import BASE_URL from "../config/config";

const NavBar = (props) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const history = useHistory();
  const location = useLocation().pathname.split("/")[1];
  const [notification, setNotification] = useState([]);
  const [setEmployeeData] = useState("");
  const [notiToggle, setNotiToggle] = useState(false);
  const { socket } = useContext(AttendanceContext);

  const id = localStorage.getItem("_id");
  const email = localStorage.getItem("Email");
  const pushNotification = (taskName) => {
    addNotification({
      title: "Kasper",
      subtitle: taskName,
      duration: 4000,
      icon: Logo,
      native: true
    });
  };
  const loadEmployeeData = () => {
    axios
      .get(`${BASE_URL}/api/particularEmployee/${id}`, {
        headers: {
          authorization: localStorage.getItem("token") || ""
        }
      })
      .then((response) => {
        console.log(response.data.Notification);
        setEmployeeData(response.data);
        setNotification(response.data.Notification);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    loadEmployeeData();
  }, []);
  const notificationDeleteHandler = (id) => {
    axios
      .post(
        `${BASE_URL}/api/notificationDeleteHandler/${id}`,
        { email },
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((response) => {
        console.log(response);
        setEmployeeData(response.data.result);
        setNotification(response.data.result.Notification);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const notificationHandler = (id, path) => {
    console.log(id);
    axios
      .post(
        `${BASE_URL}/api/notificationStatusUpdate/${id}`,
        { email },
        {
          headers: {
            authorization: localStorage.getItem("token") || ""
          }
        }
      )
      .then((response) => {
        setEmployeeData(response.data.result);
        setNotification(response.data.result.Notification);
        history.push(`/${location}/${path}`);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handleNotificationRequest = () => {
    // Check if the browser supports notifications
    if ("Notification" in window) {
      Notification.requestPermission().then((permission) => {
        if (permission === "granted") {
          // Permission granted, you can now trigger notifications
          console.log("Notification permission granted");
        }
      });
    }
  };
  useEffect(() => {
    // console.log('Socket:', socket.id);
    socket.emit("userConnected", { email });
    handleNotificationRequest();
    if (socket) {
      socket.on("taskNotificationReceived", (data) => {
        console.log(data.Account);
        if (data.Account === 4) {
          if (data.managerEmail === email) {
            setNotification((prev) => [data, ...prev]);
            pushNotification(data.message);
          }
        } else if (data.Account === 2 || data.Account === 3) {
          console.log(data);
          let emp = data.employeesEmail.filter((val) => {
            return val === email && val !== data.senderMail;
          });
          if (emp.length > 0) {
            setNotification((prev) => [data, ...prev]);
            pushNotification(data.message);
          }
        } else if (data.Account === 1) {
          console.log(data);
          if (data.adminMail === email) {
            setNotification((prev) => [data, ...prev]);
            pushNotification(data.message);
          }
        }
      });
      socket.on("notificationPageUpdate", (data) => {
        if (data) {
          loadEmployeeData();
        }
      });
      socket.on("leaveNotificationReceived", (data) => {
        const { message, status, path, taskId, managerEmail, hrEmail } = data;

        const data1 = { message, status, path, taskId, managerEmail, hrEmail };
        setNotification((prev) => [data1, ...prev]);
        pushNotification(data1.message);
      });
      socket.on("leaveManagerStatusNotificationReceived", (data) => {
        const {
          message,
          status,
          path,
          taskId,
          employeeEmail,
          hrEmail,
          managerEmail
        } = data;
        if (location === "employee") {
          const data1 = {
            message,
            status,
            path,
            taskId,
            employeeEmail,
            hrEmail
          };
          setNotification((prev) => [data1, ...prev]);
          pushNotification(data1.message);
        } else if (location === "hr") {
          const data1 = {
            message,
            status,
            path,
            taskId,
            employeeEmail,
            hrEmail
          };
          setNotification((prev) => [data1, ...prev]);
          pushNotification(data1.message);
        } else if (location === "manager") {
          const data1 = {
            message,
            status,
            path,
            taskId,
            employeeEmail,
            managerEmail
          };
          setNotification((prev) => [data1, ...prev]);
          pushNotification(data1.message);
        }
      });
    }
  }, [socket]);
  const clearAllHandler = () => {
    if (notification.length > 0) {
      axios
        .post(
          `${BASE_URL}/api/selectedNotificationDelete`,
          { email },
          {
            headers: {
              authorization: localStorage.getItem("token") || ""
            }
          }
        )
        .then((response) => {
          console.log(response);
          setNotification(response.data.result.Notification);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  let uniqueNotification = notification.filter((val, index, arr) => {
    return (
      val.status === "unseen" &&
      arr.findIndex((item) => item.taskId === val.taskId) === index
    );
  });

  return (
    <div
      className="shadow-sm px-2 py-1 bg-white"
      style={{ height: "fit-content" }}
    >
      <nav className="d-flex aline-items-center justify-content-between">
        <Navbar.Brand className="my-auto" style={{ width: "120px" }}>
          <img style={{ width: "100%" }} src={Logo} alt="" />
        </Navbar.Brand>
        <div className="ml-auto my-auto d-flex align-items-center gap-3">
          <div
            className="position-relative"
            onClick={() => setNotiToggle(!notiToggle)}
          >
            <LuBell className="fs-4" />
            {notification.length > 0 && uniqueNotification.length > 0 && (
              <p
                style={{
                  height: "1.3rem",
                  width: "1.3rem",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  position: "absolute",
                  top: "-35%",
                  right: "-30%",
                  borderRadius: "50% 50% 50% 0",
                  scale: ".7"
                }}
                className="bg-primary text-white fw-bold"
              >
                {uniqueNotification.length}
              </p>
            )}
            {notiToggle && (
              <span className="notification-list">
                {notiToggle &&
                  notification
                    .slice(0, 10)
                    .filter(
                      (val, i, ar) =>
                        ar.findIndex((item) => item.taskId === val.taskId) === i
                    )
                    .map((val, i) => {
                      return (
                        <span
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            gap: ".1rem"
                          }}
                          className={val.status === "unseen" ? "new" : "old"}
                        >
                          <h6
                            style={{ fontSize: "0.9rem" }}
                            onClick={
                              val.status === "unseen"
                                ? () =>
                                    notificationHandler(val.taskId, val.path)
                                : () => history.push(`/${location}/${val.path}`)
                            }
                          >
                            {val.message}
                          </h6>
                          <IoMdClose
                            onClick={(e) => (
                              notificationDeleteHandler(val.taskId),
                              e.stopPropagation()
                            )}
                            style={{ cursor: "pointer" }}
                            className="closing"
                          />
                        </span>
                      );
                    })}

                {notiToggle && notification.length > 0 && (
                  <h4 className="viewAll" onClick={clearAllHandler}>
                    Clear All
                  </h4>
                )}
              </span>
            )}
          </div>
          <span className="navbar-right-content my-auto d-flex  fw-bold">
            <div
              onMouseEnter={() => setActiveProfile("name")}
              onMouseLeave={() => setActiveProfile(null)}
              style={{
                height: "45px",
                width: "45px",
                border: "1px solid blue",
                borderRadius: "50%",
                position: "relative"
              }}
            >
              <img
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                  border: "1px solid red",
                  borderRadius: "50%"
                }}
                src="https://www.pngitem.com/pimgs/m/394-3947057_circular-profile-picture-png-transparent-png.png"
                alt=""
              />

              <div
                className="bg-white shadow pb-3 pt-1 px-3 flex-column gap-3"
                style={{
                  position: "absolute",
                  zIndex: "100",
                  width: "fit-content",
                  right: "0",
                  top: "90%",
                  display: activeProfile === "name" ? "flex" : "none"
                }}
              >
                <span>
                  {" "}
                  <p className="m-0 p-0">
                    Hello{" "}
                    <span className="text-capitalize m-0 p-0 text-primary">
                      {props.loginInfo["Name"]}
                    </span>{" "}
                  </p>
                  <p
                    style={{ fontSize: ".9rem" }}
                    className="m-0 text-muted p-0"
                  >
                    {props.loginInfo["Email"]}
                  </p>
                </span>
                <p>Profile</p>
                <button
                  onClick={props.onLogout}
                  style={{ cursor: "pointer" }}
                  className="btn w-100 p-0 m-0 border-0 d-flex justify-content-between aline-items-center navbar-right-content"
                >
                  Logout
                  <FontAwesomeIcon
                    className="my-auto fs-6 text-muted"
                    icon={faSignOutAlt}
                  />
                </button>
              </div>
            </div>
            <span className="text-muted"></span>
          </span>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
