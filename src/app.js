const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.json());
app.use(cors());
app.get('/', (req, res) => res.send(`Kinun server is running fine!`));

module.exports = app;
