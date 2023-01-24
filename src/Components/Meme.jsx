import React from 'react';
import MemesList from './MemesList';
import { v4 as uuidv4 } from 'uuid';
// import memesData from "../memesData";
const baseURL = 'https://api.imgflip.com/get_memes';
export default function Meme() {
  // const [memeImage, setMemeImage] = React.useState("")

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
  function getMemeImage() {
    // alert("CLICKED")

    const randomNumber = Math.floor(Math.random() * allMemes.length);
    const url = allMemes[randomNumber].url;
    setMeme((prevMeme) => ({
      ...prevMeme,
      randomImage: url,
    }));
    // alert(url)
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setMeme((prevMeme) => ({
      ...prevMeme,
      [name]: value,
      id: uuidv4(),
    }));
  }

  function handleSave() {
    setSavedMemes((prevMemes) => {
      return [...prevMemes, meme];
    });
  }

  const addMeme = savedMemes.map((meme) => {
    return <MemesList key={uuidv4()} {...meme} removeMeme={removeMeme} />;
  });

  //Not working properly
  function removeMeme(savedMemes) {
    setSavedMemes((currMemes) => {
      return currMemes.filter((memes) => memes.id === savedMemes);
    });
  }

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
        <button onClick={handleSave}>Save</button>
      </div>
      <div className='meme'>
        <img src={meme.randomImage} className='memeImg' />
        <h2 className='meme--text top'>{meme.topText}</h2>
        <h2 className='meme--text bottom'>{meme.bottomText}</h2>
      </div>
      {addMeme}
    </main>
  );
}
