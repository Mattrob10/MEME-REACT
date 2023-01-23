import React from "react";
// import memesData from "../memesData";
const baseURL = "https://api.imgflip.com/get_memes"
export default function Meme(){

  // const [memeImage, setMemeImage] = React.useState("")


  const [meme, setMeme] = React.useState({
    topText: "",
    bottomText: "",
    randomImage: "http://i.imgflip.com/1bij.jpg" 
})
const [allMemes, setAllMemes] = React.useState([])

React.useEffect(() =>{
    fetch(baseURL)
        .then(res => res.json())
        .then(data => setAllMemes(data.data.memes))
}, [])
console.log(allMemes)
  function getMemeImage(){
    // alert("CLICKED")
    
    const randomNumber = Math.floor(Math.random() * allMemes.length)
    const url = allMemes[randomNumber].url
    setMeme(prevMeme => ({
      ...prevMeme,
      randomImage: url
  }))
    // alert(url)
  }
  
  function handleChange(event){
    const {name, value} = event.target
    setMeme(prevMeme => ({
      ...prevMeme,
      [name]: value
    }))
  }


  return (
    <main>
      <div className="form">
        <input type="text"
               className="form--input" 
               placeholder="top text"
               name="topText"
               value={meme.topText}
               onChange={handleChange}
        />
        <input type="text" 
               className="form--input" 
               placeholder="bottom text"
               name="bottomText"
               value={meme.bottomText}
               onChange={handleChange}
        />
        <button onClick={getMemeImage} 
                className="form--button">Get a new meme image 🖼
        </button>
      </div>
      <div className="meme">
      <img src={meme.randomImage} className="memeImg" />
      <h2 className="meme--text top">{meme.topText}</h2>
      <h2 className="meme--text bottom">{meme.bottomText}</h2>
      </div>
    </main>
  )
}