import React from "react";
import "./ButtonAct.css";

export const ButtonAct = ({ className, buttonName, onClick }) => {
  return (
    <div>
      <div className={className} onClick={onClick}>
        {buttonName}
      </div>
    </div>
  );
};
