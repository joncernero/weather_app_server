require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();

const APIURL = 'https://api.openweathermap.org';

var allowCrossDomain = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', process.env.FRONTENDURL);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, Content-Length, X-Requested-With'
  );
  next();
};

app.use(allowCrossDomain);
app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/', (req, res) => {
  res.json('hi');
});

app.get('/getWeather', async (req, res) => {
  const response = await axios.get(
    `${APIURL}/data/2.5/onecall?lat=${req.query.latitude}&lon=${req.query.longitude}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = response.data;
  res.json(data);
});

app.post('/postWeather', async (req, res) => {
  const response = await axios.post(
    `${APIURL}/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = response.data;
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
