require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const { application } = require('express');
const app = express();

const APIURL = 'https://api.openweathermap.org';

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

const issue2options = {
  origin: '*',
  method: ['POST'],
  credentials: true,
  preflightContinue: true,
  maxAge: 3600,
};

app.options('/postWeather', cors(issue2options));
app.post('/postWeather', cors(issue2options), async (req, res) => {
  const response = await axios.post(
    `${APIURL}/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = response.data;
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
