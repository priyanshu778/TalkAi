 



import React, { useContext, useState } from "react";
import './Sidebar.css';
import hamburger from '../../assets/hamberg.png';
import history from '../../assets/history.webp';
import add from '../../assets/add.webp';
import { contextData } from "../../Context/UserContext";

function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { sent, prevPrompt, newChat } = useContext(contextData);

  const handlePreviousPrompt = (prompt) => {
    sent(prompt);
  };

  return (
    <div className={`sidebar ${isExpanded ? "expanded" : ""}`}>
      {/* Hamburger Button */}
      <img
        src={hamburger}
        alt="Menu"
        className="hamburger"
        onClick={() => setIsExpanded(prev => !prev)}
      />

      {/* Add New Chat Button */}
      <div className="sidebar-item add" onClick={newChat}>
        <img src={add} alt="Add" />
        {isExpanded && <p>New Chat</p>}
      </div>

      {/* Previous Prompt History */}
      {prevPrompt.map((item, index) => (
        <div
          key={index}
          className="sidebar-item history"
          onClick={() => handlePreviousPrompt(item)}
        >
          <img src={history} alt="History" />
          {isExpanded && <p>{item.length > 20 ? item.slice(0, 20) + "..." : item}</p>}
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
