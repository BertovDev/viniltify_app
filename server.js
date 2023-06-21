require('dotenv').config();
const express = require("express")
const cors = require("cors")
const bodyParser = require("body-parser")
const path = require("path")
const axios = require("axios")

const app = express()

const PORT = process.env.PORT || 3001;

app.use(express.static(path.resolve(__dirname, "./client/build")))
app.use(cors())
app.use(bodyParser.json())

const options = {
    method: 'GET',
    url: 'https://shazam.p.rapidapi.com/search',
    params: {term: 'red hot chilli peppers', locale: 'en-US', offset: '0', limit: '5'},
    headers: {
      'X-RapidAPI-Key': 'a35e69861fmshb29a9931dd32468p1c65c8jsn5764d4fcb43e',
      'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
    }
  };
  
  axios.request(options).then(function (response) {
      console.log(response.data.tracks.hits[0].track.hub);
  }).catch(function (error) {
      console.error(error);
  });


app.get("*",(req,res) => {
    res.sendFile(path.resolve(__dirname,"./client/build","index.html"))
})

app.listen(PORT)