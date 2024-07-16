import React, { Component } from "react";
import "./About.css";
import profile_pic from "../assets/PG_Profile-Pic.png";

export default class About extends Component {
  render() {
    return (
      <div>
        <div className="split left">
          <div className="centered">
            <img
              className="profile_image"
              src={profile_pic}
              alt="Profile Pic"
            />
          </div>
        </div>
        <div className="split right">
          <div className="centered">
            <div className="name_title">Your Name</div>
            <div className="brief_description">
              Tell us about yourself in a few sentences. Tell us your interests
              and say a fun fact about yourself.
            </div>
          </div>
        </div>
      </div>
    );
  }
}
