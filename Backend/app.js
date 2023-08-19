const express = require('express');
const app = express();
const morgan = require('morgan');
const cors = require('cors');
app.use(morgan('dev'));
require('dotenv').config();
app.use(cors());

require('./db/mongodb'); // to connect to database

//Learner module routing
const taskRoute = require('./routes/taskRoute');
app.use('/api', taskRoute);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running in PORT ${PORT}`);
});