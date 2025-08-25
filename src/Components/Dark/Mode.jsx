// import React, { useEffect, useState } from 'react'
// import light from '../../assets/light.webp'
// import dark from '../../assets/dark.webp'
// import './Mode.css'

// const Mode = () => {
//     const [mode,setMode]=useState("dark-mode")

//     useEffect(()=>{
//         document.body.className=mode
//     },[mode])
//   return (
//     <div className='mode'>
//         <button onClick={()=>{
//             {mode=="dark-mode"? setMode("light-Mode"):setMode("dark-mode")}
//         }}>{mode==="dark-mode"?<img src={dark}></img>:<img src={light}></img>}</button>
//     </div>
//   )
// }

// export default Mode;



import React from 'react';
import light from '../../assets/light.webp';
import dark from '../../assets/dark.webp';
import './Mode.css';

const Mode = ({ mode, toggleMode }) => {
  return (
    <div className="mode">
      <button onClick={toggleMode}>
        {mode === 'dark-mode' ? <img src={dark} alt="dark" /> : <img src={light} alt="light" />}
      </button>
    </div>
  );
};

export default Mode;
