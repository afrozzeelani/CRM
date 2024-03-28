import axios from "axios";
import React, { useState } from "react";
import BASE_URL from "../config/config";

const Settings = ({ setting, Setsetting }) => {
  const [logo, setLogo] = useState("");

  const hendleSubmit = (e) => {
    e.preventDefault();

    if (logo === "") {
      alert("upload image");
    } else {
      // Create a new FormData object
      let formData = new FormData();
      formData.append("profile", logo);
      // Create a config object with custom headers
      const config = {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      };

      axios
        .post(`${BASE_URL}/api/logo/`, formData, config)
        .then((res) => {
          Setsetting(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div
      className="bg-light rounded  ms-auto px-3 py-3 "
      style={{
        position: "fixed",
        right: "0",
        top: setting ? "55px" : "-100%",
        zIndex: "-1",
        transition: ""
      }}
    >
      <h3 className="h5 mb-4">UPLOAD LOGO</h3>
      <form onSubmit={hendleSubmit}>
        <input
          type="file"
          accept="/profile"
          className="form-control"
          onChange={(e) => setLogo(e.target.files[0])}
        />
        <input
          type="submit"
          value="Add"
          className="btn btn-primary btn-sm mt-4 px-4"
        />
      </form>
    </div>
  );
};

export default Settings;
