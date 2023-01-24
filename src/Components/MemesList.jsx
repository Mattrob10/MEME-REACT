import React from 'react';

function MemesList({ topText, bottomText, randomImage, removeMeme, id }) {
  return (
    <div className='wrapper'>
      <div className='meme'>
        <img src={randomImage} className='memeImg' />
        <h2 className='meme--text top'>{topText}</h2>
        <h2 className='meme--text bottom'>{bottomText}</h2>
        <button onClick={() => removeMeme(id)}>Delete</button>
      </div>
    </div>
  );
}

export default MemesList;
