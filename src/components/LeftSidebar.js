import React from "react";
import "./index.css";
import { Form } from "react-bootstrap";
import board from "../images/board.png";
import list from "../images/list.png";
import sun from "../images/sun.png";
import moon from "../images/moon.png";

function LeftSidebar(props) {
  // Setting View Style (board / list)
  const [boardStyleIcon, setBoardStyleIcon] = React.useState(
    "visibility-visible"
  );
  const [listStyleIcon, setListStyleIcon] = React.useState("visibility-hidden");

  const handleViewStyleSwitch = () => {
    if (boardStyleIcon === "visibility-visible") {
      setBoardStyleIcon("visibility-hidden");
      setListStyleIcon("visibility-visible");
      props.viewStyle();
    } else {
      setListStyleIcon("visibility-hidden");
      setBoardStyleIcon("visibility-visible");
      props.viewStyle();
    }
  };

  // Setting Contrast (light / dark)
  const [lightIcon, setlightIcon] = React.useState("visibility-visible");
  const [darkIcon, setDarkIcon] = React.useState("visibility-hidden");

  const handleContrastSwitch = () => {
    if (lightIcon === "visibility-visible") {
      setlightIcon("visibility-hidden");
      setDarkIcon("visibility-visible");
      props.contrast();
    } else {
      setDarkIcon("visibility-hidden");
      setlightIcon("visibility-visible");
      props.contrast();
    }
  };

  const iconStyle = {
    width: "60px",
    height: "60px",
  };

  const divStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: "20px",
  };

  const switchStyle = {
    marginTop: "8px",
    marginRight: "15px",
    marginLeft: "15px",
  };

  return (
    <div id={props.leftSidebarcContrast}>
      <div id="leftContainer">
        <h1>
          Settings:
          <hr />
        </h1>
        <h4>View Style</h4>
        <div style={divStyle}>
          <img
            src={list}
            id={listStyleIcon}
            style={iconStyle}
            alt="list-icon"
          />
          <Form.Check
            type="switch"
            id="view-style-switch"
            label=""
            style={switchStyle}
            onChange={handleViewStyleSwitch}
          />
          <img
            src={board}
            id={boardStyleIcon}
            style={{ width: "45px", height: "45px" }}
            alt="board-icon"
          />
        </div>

        <h4>
          <hr />
          Contrast
        </h4>
        <div style={divStyle}>
          <img src={sun} id={lightIcon} style={iconStyle} alt="sun-icon" />
          <Form.Check
            type="switch"
            id="contrast-switch"
            label=""
            style={switchStyle}
            onChange={handleContrastSwitch}
          />
          <img src={moon} id={darkIcon} style={iconStyle} alt="moon-icon" />
        </div>
      </div>
    </div>
  );
}

export default LeftSidebar;
