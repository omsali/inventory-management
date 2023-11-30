const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pumps = require("./routes/pumps");
const spares = require('./routes/spares');

app.use('/api/v1', pumps);
app.use('/api/v1', spares);

module.exports = app;