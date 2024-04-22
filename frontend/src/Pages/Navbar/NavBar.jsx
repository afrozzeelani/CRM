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
import { FaBell } from "react-icons/fa6";
import { LuMenu } from "react-icons/lu";

import BASE_URL from "../config/config";
import { Toaster, toast } from "react-hot-toast";
const NavBar = (props) => {
  const [activeProfile, setActiveProfile] = useState(null);
  const history = useHistory();
  const location = useLocation().pathname.split("/")[1];
  const [notification, setNotification] = useState([]);
  const [employeeData, setEmployeeData] = useState("");
  const [notiToggle, setNotiToggle] = useState(false);
  const { socket } = useContext(AttendanceContext);
  const [loginNoti, setLoginNoti] = useState(true); //this is only for hr and admin to block employee login notification.
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
    console.log("hello");
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
        const {
          message,
          status,
          path,
          taskId,
          managerEmail,
          hrEmail,
          messageBy,
          profile
        } = data;

        const data1 = {
          message,
          status,
          path,
          taskId,
          managerEmail,
          hrEmail,
          messageBy,
          profile
        };
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
          messageBy,
          profile,
          managerEmail
        } = data;
        if (location === "employee") {
          const data1 = {
            message,
            status,
            path,
            taskId,
            messageBy,
            profile,
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
            messageBy,
            profile,
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
            messageBy,
            profile,
            employeeEmail,
            managerEmail
          };
          setNotification((prev) => [data1, ...prev]);
          pushNotification(data1.message);
        }
      });
    }
  }, [socket]);
  const handleUserLogin = (data) => {
    const showNotification = (data) => {
      if (data) {
        const { message } = data;
        toast.success(message, {
          duration: 2000,
          position: "top-right",
          style: {
            color: "green",
            backgroundColor: "white",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            zIndex: "9999"
          },
          toastClassName: "custom-toast"
        });
      }
    };
    if (loginNoti) {
      showNotification(data);
    }
  };
  const handleUserLogout = (data) => {
    const showNotification = (data) => {
      if (data) {
        const { message } = data;
        toast.error(message, {
          duration: 2000,
          position: "top-right",
          style: {
            color: "white",
            backgroundColor: "red",
            boxShadow: "0px 2px 10px rgba(0, 0, 0, 0.1)",
            borderRadius: "4px",
            zIndex: "9999"
          },
          toastClassName: "custom-toast"
        });
      }
    };

    if (loginNoti) {
      showNotification(data);
    }
  };

  useEffect(() => {
    socket.on("userLogin", handleUserLogin);
    socket.on("userLogout", handleUserLogout);
    return () => {
      socket.off("userLogin", handleUserLogin);
      socket.off("userLogout", handleUserLogout);
    };
  }, []);

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
            onMouseEnter={() => setNotiToggle("name")}
            onMouseLeave={() => setNotiToggle(false)}
          >
            <div
              className="notilenghth bg-warning text-muted fw-bold"
              style={{
                display: uniqueNotification.length <= 0 ? "none" : "flex",
                height: "fit-content",
                width: "fit-content",
                minWidth: "18px",
                position: "absolute",
                top: "-30%",
                right: "-35%",
                borderRadius: "50% 50% 50% 0",
                objectFit: "cover",
                fontSize: ".8rem",
                padding: "0 .1rem"
              }}
            >
              {notification.length > 0 && uniqueNotification.length > 0 && (
                <span className="m-auto">{uniqueNotification.length}</span>
              )}
            </div>
            <div className="position-relative">
              <FaBell className="fs-5 text-primary" />
              {notiToggle && notification.length > 0 && (
                <div
                  style={{
                    position: "absolute",
                    right: ".5rem",
                    top: "100%",
                    minWidth: "230px",
                    zIndex: "10000",
                    maxWidth: "250px",
                    borderRadius: "20px 0 20px 20px",
                    display: notiToggle == "name" ? "flex" : "none"
                  }}
                  className="border border-muted border-1 flex-column gap-1 w-100 bg-white align-items-center gap-2 justify-content-between  p-2  shadow"
                >
                  {notiToggle &&
                    notification
                      .slice(0, 10)
                      .filter(
                        (val, i, ar) =>
                          ar.findIndex((item) => item.taskId === val.taskId) ===
                          i
                      )
                      .map((val, i) => {
                        return (
                          <div className="d-flex align-items-center justify-content-between w-100">
                            <div className="d-flex align-items-center gap-2">
                              <div
                                style={{
                                  height: "30px",
                                  width: "30px",
                                  overflow: "hidden"
                                }}
                              >
                                <img
                                  style={{
                                    height: "100%",
                                    width: "100%",
                                    objectFit: "cover",
                                    overflow: "hidden",
                                    borderRadius: "50%"
                                  }}
                                  src="https://tse3.mm.bing.net/th?id=OIP.-d8GY5axNJZYoXsNOUJ4iwAAAA&pid=Api&P=0&h=180"
                                  alt=""
                                />
                              </div>
                              <div>
                                <p
                                  style={{ fontSize: ".75rem" }}
                                  className="p-0 m-0 w-100 text-muted fw-bold"
                                >
                                  New Task Received
                                </p>
                                <p
                                  style={{ fontSize: ".80rem" }}
                                  className="p-0 m-0 w-100"
                                >
                                  {val.message}
                                </p>
                              </div>
                            </div>
                            <div className="d-flex align-items-center gap-1">
                              <span
                                style={{ fontSize: ".80rem" }}
                                className="btn py-1 py-0 px-1 rounded-5 text-white  w-100 fw-bold bg-danger"
                                onClick={(e) => (
                                  notificationDeleteHandler(val.taskId),
                                  e.stopPropagation()
                                )}
                              >
                                x
                              </span>
                            </div>
                          </div>
                        );
                      })}
                </div>
              )}
            </div>
            {/* {notification.length > 0 && uniqueNotification.length > 0 && <p style={{ height: '1.3rem', width: '1.3rem', display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'absolute', top: '-35%', right: '-30%', borderRadius: '50% 50% 50% 0', scale: '.7' }} className="bg-primary text-white fw-bold">{uniqueNotification.length}</p>} */}
            {/* {notiToggle && ( */}
            {/* <span className='notification-list'> */}
            {/* {notiToggle && notification.slice(0, 10).filter((val, i, ar) => ar.findIndex(item => item.taskId === val.taskId) === i).map((val, i) => {
                return <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.1rem' }} className={val.status === "unseen" ? "new" : "old"}><h6 style={{ fontSize: "0.9rem" }} onClick={val.status === "unseen" ? () => notificationHandler(val.taskId, val.path) : () => history.push(`/${location}/${val.path}`)}>{val.message}</h6><IoMdClose onClick={(e) => (notificationDeleteHandler(val.taskId), e.stopPropagation())} style={{ cursor: "pointer" }} className="closing" /></span>
              })}

              {notiToggle && notification.length > 0 && <h4 className="viewAll" onClick={clearAllHandler}>Clear All</h4>} */}

            {/* <span style={{ position: 'absolute', right: "0", top: '2rem', zIndex: '2001', minWidth: '230px', maxWidth: '250px' }} className='notification-list bg-white'>
                {notiToggle && notification.slice(0, 10).filter((val, i, ar) => ar.findIndex(item => item.taskId === val.taskId) === i).map((val, i) => {
                  return <span style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '.1rem' }} className={val.status === "unseen" ? "new" : "old"}><h6 style={{ fontSize: "0.9rem" }} onClick={val.status === "unseen" ? () => notificationHandler(val.taskId, val.path) : () => history.push(`/${location}/${val.path}`)}>{val.message}</h6><IoMdClose onClick={(e) => (notificationDeleteHandler(val.taskId), e.stopPropagation())} style={{ cursor: "pointer" }} className="closing" /></span>
                })}

                {notiToggle && notification.length > 0 && <h4 className="viewAll" onClick={clearAllHandler}>Clear All</h4>}

              </span> */}

            {/* </span> */}
            {/* )} */}
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
