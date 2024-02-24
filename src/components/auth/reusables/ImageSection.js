import React from "react";
import BackgroundImage from "../../../assets/images/art.png";
import classes from "./ImageSection.module.css";

const ImageSection = () => {
  return (
    <div className={classes.imageSection}>
      <img src={BackgroundImage} alt="art.png" />
      <h1 className={classes.heading}>Welcome Aboard My Friend</h1>
      <h2 className={classes.subheading}>
        Just a couple of clicks and we can start!
      </h2>
    </div>
  );
};

export default ImageSection;
