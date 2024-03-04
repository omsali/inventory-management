const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const pumps = require("./routes/pumps");
const spares = require('./routes/spares');
const auth = require('./routes/auth');
const mou = require('./routes/mou')
const enquiry = require('./routes/enquiry')
const bearings = require('./routes/bearing')

app.use('/api/v1', pumps);
app.use('/api/v1', spares);
app.use('/api/v1', auth);
app.use('/api/v1', mou);
app.use('/api/v1', enquiry);
app.use('/api/v1', bearings)

module.exports = app;