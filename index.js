require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const app = express();

const APIURL = 'https://api.openweathermap.org';

var whitelist = [
  'https://jac-my-weatherclient.herokuapp.com',
  'http://localhost:3000',
];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

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

app.get('/getWeather/', async (req, res) => {
  const response = await axios.get(
    `${APIURL}/data/2.5/onecall?lat=${req.query.latitude}&lon=${req.query.longitude}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = response.data;
  res.json(data);
});

app.post('/postWeather', cors(), async (req, res) => {
  const response = await axios.post(
    `${APIURL}/data/2.5/onecall?lat=${req.body.latitude}&lon=${req.body.longitude}&appid=${process.env.REACT_APP_API_KEY}`
  );
  const data = response.data;
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
