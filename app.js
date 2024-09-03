const express = require('express');

const colors = require('colors');

const dotenv = require('dotenv');

const connectDB = require('./config/db');

const meetingRoutes = require('./routes/meeting.Routes');

dotenv.config();
const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());


app.use('/api', meetingRoutes);

app.listen(PORT, async () => {
    console.log(`Server Started ap PORT ${PORT}`.bgBlue);
    await connectDB();
});
