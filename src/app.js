const express = require('express');
const cors = require('cors');
const postRouter = require('./routers/postRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/posts', postRouter);

app.get('/', (req, res) => res.send(`Kinun server is running fine!`));

module.exports = app;
