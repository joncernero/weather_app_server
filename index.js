require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { default: axios } = require('axios');
const { application } = require('express');
const app = express();

const APIURL = 'https://api.openweathermap.org';

app.options('*', cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.get('/getWeather', cors(), async (req, res) => {
  const response = await axios.get(
    `${APIURL}/data/2.5/onecall?lat=${req.query.latitude}&lon=${req.query.longitude}&appid=${process.env.REACT_APP_API_KEY}`,
    {
      method: 'GET',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
      credentials: 'same-origin',
    }
  );
  const data = response.data;
  res.json(data);
});

app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
);
