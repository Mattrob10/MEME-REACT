import React from 'react';

function MemesList({ topText, bottomText, randomImage, removeMeme, id }) {
  return (
    <div className='wrapper'>
      <div className='meme-wrapper'>
        <div className='new-meme'>
          <img src={randomImage} className='memeImg' />
          <h2 className='meme--text top'>{topText}</h2>
          <h2 className='meme--text bottom'>{bottomText}</h2>

          <div className='meme-buttons'>
            {/* created edit btn but not the funtion of editMeme */}
            <button onClick={() => editMeme(id)} id='edit-button'>
              <i class='fa-solid fa-pen-to-square'></i>
            </button>
            <button onClick={() => removeMeme(id)} id='delete-button'>
              <i class='fa-solid fa-trash-can'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemesList;
