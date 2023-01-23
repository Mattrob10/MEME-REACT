import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MemesList from './MemesList';
import { v4 as uuidv4 } from 'uuid';

const baseURL = 'https://api.imgflip.com/get_memes';
export default function Meme() {
  // const [memeImage, setMemeImage] = React.useState("")

  const [meme, setMeme] = useState({
    topText: '',
    bottomText: '',
    randomImage: 'http://i.imgflip.com/1bij.jpg',
  });
  const [allMemes, setAllMemes] = useState([]);
  const [memesList, setMemesList] = useState([]);

  useEffect(() => {
    async function getMemes() {
      const res = await axios
        .get('https://api.imgflip.com/get_memes')
        .then((res) => setAllMemes(res.data.data.memes));
    }
    getMemes();
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
    }));
  }

  const generate = memesList.map((item, index) => {
    return <MemesList key={index} {...memesList} />;
  });

  function handleSubmit(e) {
    e.preventDefault();
    const newMeme = { ...meme };
    newMeme.id = uuidv4();
    setMemesList((prevMemesList) => [...prevMemesList, newMeme]);
    console.log(memesList);
  }

  return (
    <main>
      <div className="form">
        <input
          type="text"
          className="form--input"
          placeholder="top text"
          name="topText"
          value={meme.topText}
          onChange={handleChange}
        />
        <input
          type="text"
          className="form--input"
          placeholder="bottom text"
          name="bottomText"
          value={meme.bottomText}
          onChange={handleChange}
        />
        <button onClick={getMemeImage} className="form--button">
          Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
        <img src={meme.randomImage} className="memeImg" />
        <h2 className="meme--text top">{meme.topText}</h2>
        <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
      <button onClick={handleSubmit}>submit</button>
      <div>{generate}</div>
    </main>
  );
}
