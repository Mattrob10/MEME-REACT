import React from 'react';
import MemesList from './MemesList';
import { v4 as uuidv4 } from 'uuid';

const baseURL = 'https://api.imgflip.com/get_memes';
export default function Meme() {
  const [meme, setMeme] = React.useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
    id: '',
  });
  const [allMemes, setAllMemes] = React.useState([]);
  const [savedMemes, setSavedMemes] = React.useState([]);

  React.useEffect(() => {
    fetch(baseURL)
      .then((res) => res.json())
      .then((data) => setAllMemes(data.data.memes));
  }, []);

  //Grabs random Meme Image from API
  function getMemeImage() {
    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
  }

  //Handles intial Meme input for top and bottom text
  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
      id: uuidv4(),
    }));
  }

  //Handles save for the initial Meme and then removes the input values for top/bottom text
  function handleSave() {
    setSavedMemes((prevMemes) => {
      return [...prevMemes, meme];
    });
    setMeme({
      topText: '',
      bottomText: '',
      randomImage: 'http://i.imgflip.com/1bij.jpg',
      id: '',
    });
  }

  //Maps over our Saved Memes state and then renders the MemesList components accordingly
  const addMeme = savedMemes.map((meme) => {
    return (
      <MemesList
        key={uuidv4()}
        {...meme}
        removeMeme={removeMeme}
        updateMeme={updateMeme}
      />
    );
  });

  //Filters over our existing Memes array and removes the targeted ID
  function removeMeme(id) {
    setSavedMemes((currMemes) => {
      return currMemes.filter((memes) => memes.id !== id);
    });
  }

  //Handles the editing of the targeted Meme and then updates the values
  function updateMeme(id, newText) {
    setSavedMemes((prevMemes) => {
      return prevMemes.map((meme) => {
        if (meme.id === id) {
          return {
            ...meme,
            topText: newText.topText,
            bottomText: newText.bottomText,
          };
        } else {
          return meme;
        }
      });
    });
  }

  //This our "form."
  return (
    <main>
      <div className='form'>
        <input
          type='text'
          className='form--input'
          placeholder='top text'
          name='topText'
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type='text'
          className='form--input'
          placeholder='bottom text'
          name='bottomText'
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className='form--button'>
          Get a new meme image 🖼
        </button>
        <button onClick={handleSave} id='save-button'>
          Save
        </button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} className='memeImg' />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
      <div className='meme-wrapper'>{addMeme}</div>
    </main>
  );
}

