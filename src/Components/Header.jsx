import React from "react";
import troll from '../assets/troll-face.png'


export default function Header(){
  return (
    <div className="nav">
      <img src={troll} className="troll"></img>
      <h2 className="header-title">Meme Generator</h2>
      {/* want to redo header so they have links to scroll down.   */}
      <h4 className="header-project">Home</h4>
    </div>
  )
}