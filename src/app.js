const express = require('express');
const cors = require('cors');
const postRouter = require('./routers/postRouter');
const categoryRouter = require('./routers/categoryRouter');

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/posts', postRouter);
app.use('/api/categories', categoryRouter);

app.get('/', (req, res) => res.send(`Kinun server is running fine!`));

module.exports = app;
