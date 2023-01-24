import React from 'react';

function MemesList({
  topText,
  bottomText,
  randomImage,
  removeMeme,
  id,
  updateMeme,
}) {
  //This allows for conditional rendering of the save and edit buttons as well as allowing the user to edit top and bottom text
  const [isEditable, setIsEditable] = React.useState(false);
  //Sets the intitial state to the values passed in from props and will also update if the user inputs new values
  const [memeTopBottom, setMemeTopBottom] = React.useState({
    topText: topText,
    bottomText: bottomText,
  });

  //This targets our top text on edit and then updates upon save
  function handleTopText(e) {
    setMemeTopBottom({ ...memeTopBottom, topText: e.target.innerText });
    console.log(memeTopBottom);
  }

  //This targets our bottom text on edit and then updates upon save
  function handleBottomText(e) {
    setMemeTopBottom({ ...memeTopBottom, bottomText: e.target.innerText });
  }

  //Toggles our isEditable state
  function handleEdit() {
    setIsEditable(true);
  }

  //Saves the edited values and then passes them into our upDateMeme function in the Meme component
  function handleSave() {
    setIsEditable(false);
    updateMeme(id, memeTopBottom);
  }

  return (
    <div className='wrapper'>
      <div className='meme-wrapper'>
        <div className='new-meme'>
          <img src={randomImage} className='memeImg' />
          <h2
            className='meme--text top'
            onInput={handleTopText}
            contentEditable={isEditable}
          >
            {topText}
          </h2>
          <h2
            className='meme--text bottom'
            onInput={handleBottomText}
            contentEditable={isEditable}
          >
            {bottomText}
          </h2>
          <div className='meme-buttons'>
            {isEditable ? (
              <button onClick={handleSave} id='save-button-two'>
                <i className='fa-solid fa-save'></i>
              </button>
            ) : (
              <button onClick={handleEdit} id='edit-button'>
                <i className='fa-solid fa-pen-to-square'></i>
              </button>
            )}
            <button onClick={() => removeMeme(id)} id='delete-button'>
              <i className='fa-solid fa-trash-can'></i>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MemesList;
