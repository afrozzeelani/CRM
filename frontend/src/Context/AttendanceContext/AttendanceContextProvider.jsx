import React, { useState, useMemo } from "react";
import { AttendanceContext } from "./AttendanceContext";
import { io } from "socket.io-client";
import BASE_URL from "../../Pages/config/config";

const AttendanceContextProvider = ({ children }) => {
  const socket = useMemo(() => {
    return io(`${BASE_URL}`);
  }, []);
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState("");
  const [attencenceID, setAttencenceID] = useState("");
  const [message, setMessage] = useState("");
  const [emailInput, setEmailInput] = useState("");

  return (
    <AttendanceContext.Provider
      value={{
        socket,
        emailInput,
        setEmailInput,
        employees,
        setEmployees,
        selectedEmployee,
        setSelectedEmployee,
        attencenceID,
        setAttencenceID,
        message,
        setMessage
      }}
    >
      {children}
    </AttendanceContext.Provider>
  );
};

export default AttendanceContextProvider;
