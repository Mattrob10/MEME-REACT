import React from "react";
import troll from '../assets/troll-face.png'


export default function Header(){
  return (
    <div className="nav">
      <img src={troll} className="troll"></img>
      <h2 className="header-title">Meme Generator</h2>
      <h4 className="header-project">React Course - Project 3</h4>
    </div>
  )
}