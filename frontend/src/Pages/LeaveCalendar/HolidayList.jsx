import React, { useEffect, useState } from "react";
import axios from "axios";
import { GiIndianPalace, GiPartyPopper } from "react-icons/gi"; // Importing necessary icons
import { PiBankBold } from "react-icons/pi";

function HolidayList() {
  const [holidaysData, setHolidaysData] = useState([]);
  const [isListVisible, setListVisibility] = useState(true);

  const toggleListVisibility = () => {
    setListVisibility(!isListVisible);
  };

  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/holidays");

        if (response.status === 200) {
          const data = response.data;
          setHolidaysData(data);
        } else {
          console.error("Failed to fetch holiday data:", response.statusText);
        }
      } catch (error) {
        console.error("Error fetching holiday data:", error);
      }
    };

    fetchHolidays();
  }, []);

  const getHolidayIcons = (holidayType) => {
    switch (holidayType) {
      case "National Holiday":
        return (
          <span
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px"
            }}
            className="rounded-5 bg-danger text-white"
          >
            <GiIndianPalace />
          </span>
        );
      case "Restricted Holiday":
        return (
          <span
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px"
            }}
            className="rounded-5 bg-primary text-white"
          >
            <GiPartyPopper />
          </span>
        );
      case "Gazetted Holiday":
        return (
          <span
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px"
            }}
            className="rounded-5 bg-warning text-white"
          >
            <PiBankBold />
          </span>
        );
      default:
        return (
          <span
            style={{
              height: "40px",
              width: "40px",
              display: "flex",
              margin: "auto",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "30px"
            }}
            className="rounded-5 bg-danger text-white"
          >
            <GiIndianPalace />
          </span>
        );
    }
  };

  return (
    <div className="container">
      <div className="birthday shadow position-relative">
        <div>
          <h5
            style={{
              position: "sticky",
              top: "0",
              zIndex: "5",
              backgroundColor: "var(--primaryDashColorDark)",
              color: "var(--primaryDashMenuColor)"
            }}
            className="fw-bolder pb-3 px-3 pt-3 d-flex justify-content-between gap-0 text-center"
          >
            Holiday List
          </h5>
          <div>
            {holidaysData.map((holiday, index) => (
              <div className="row p-2" key={index}>
                <span className="col-3 border-0 text-center">
                  {getHolidayIcons(holiday.holidayType)}
                </span>
                <span className="col-5 border-0 fw-bold text-muted">
                  {holiday.holidayName}
                </span>
                <span
                  style={{ whiteSpace: "pre" }}
                  className="col-3 border-0 fw-bold text-primary"
                >{`${holiday.holidayDate}-${holiday.holidayMonth}-${holiday.holidayYear}`}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HolidayList;
