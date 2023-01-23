import React from 'react';

export default function memesList(props) {
  return (
    <div className="wrapper">
      <div className="meme">
        <img src={props.randomImage} className="memeImg" />
        <h2 className="meme--text top">{props.topText}</h2>
        <h2 className="meme--text bottom">{props.bottomText}</h2>
        {/* create div for buttons */}
        <div></div>
      </div>
    </div>
  );
}

//create container for buttons
