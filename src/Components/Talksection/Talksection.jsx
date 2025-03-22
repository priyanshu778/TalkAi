import React, { useContext, useState } from "react";
import "./Talksection.css";
import Mode from "../Dark/Mode";
import sendimg from "../../assets/send.webp";
import { contextData } from "../../Context/UserContext";
import robot from "../../assets/robot.png";
import user from "../../assets/user.png";

const Talksection = () => {
  let { sent, input, setInput, showResult, resultData, recentPrompt, loading } =
    useContext(contextData);

  return (
    <div className="talksection">
      <div className="top-section">
        {!showResult ? (
          <div className="heading">
            <span className="fade-in">HELLO PRIYANSHU</span>
            <span className="slide-in">I'm Your TalkAi</span>
            <span className="zoom-in">What can I help You ... ?</span>
          </div>
        ) : (
          <div className="result">
            <div className="userbox">
              <img src={user} alt="" />
              <p>{recentPrompt}</p>
            </div>
            <div className="aibox">
              <img src={robot} alt="" />
              {loading ? (
                <div className="load">
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                  <hr />
                </div>
              ) : (
                <p>{resultData}</p>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="buttom-section">
        <input
          type="text"
          placeholder="Write prompt here"
          onChange={(event) => setInput(event.target.value)}
          value={input}
        />
        {input?<button
          id="sentbtn"
          onClick={() => {
            sent(input);
          }}
        >
          <img src={sendimg} alt="" />
        </button>:null}
         
        <Mode />
      </div>
    </div>
  );
};

export default Talksection;
