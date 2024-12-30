import React from "react";
import MaintananceImage from "../assets/images/maintanance.jpg";

const MaintananceScreen = () => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <img src={MaintananceImage} alt="Maintanance" />
    </div>
  );
};

export default MaintananceScreen;