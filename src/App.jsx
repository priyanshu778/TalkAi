import React from "react";
import Sidebar from "./Components/Sidebar/Sidebar";
import Talksection from "./Components/Talksection/Talksection";
import Sepration from "./Components/Sepration/Sepration";


function App() {
  return (
    <div className="container">
      <Sidebar />
      <Sepration/>
        
      <Talksection />
    </div>
  );
}

export default App;
