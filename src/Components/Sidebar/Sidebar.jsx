import React, { useContext, useState } from "react";
import './Sidebar.css'
import hamburger from '../../assets/hamberg.png'
import history from '../../assets/history.webp'
import add from '../../assets/add.webp'
import { contextData } from "../../Context/UserContext";

function Sidebar(){
    const [full,setFull]=useState(false)
    const {sent,prevPrompt,newChat}=useContext(contextData)

    async function loadPrev(prompt){
        sent(prompt)
    }

    return(
        <div className="sidebar">
            <img src={hamburger} alt="" className="hamburger" onClick={()=>{
                setFull(prev=>!prev);
                 
            }}/>
            <div className="add" onClick={()=>{
                newChat()
            }}>
                <img src={add} alt="" />
                {full?<p>Add item</p>:null} 
            </div>
            {prevPrompt.map((item,index)=>{
                return(
                    <div className="history" key={index} onClick={()=>{
                        loadPrev(item)
                    }}>
                    <img src={history} alt=""  />
                    {full? <p>{item.slice(0,10)+"..."}</p>:null}
                </div>
                )
            })}
             
            
        </div>
    )
}

export default Sidebar