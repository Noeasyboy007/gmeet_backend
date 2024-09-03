const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const meetingRoutes = require('./routes/meetingRoutes');
const googleAuth = require('./auth/googleAuth');

dotenv.config();
const PORT = 8000;

const app = express();

app.use(express.json());

// Routes
app.use('/api', meetingRoutes);

// OAuth2 route for user consent
app.get('/auth', (req, res) => {
    const authUrl = googleAuth.getAuthUrl();
    res.redirect(authUrl);
});

// OAuth2 callback route
app.get('/oauth2callback', async (req, res) => {
    const code = req.query.code;
    try {
        const tokens = await googleAuth.getToken(code);
        console.log('Refresh Token:', tokens.refresh_token);
        res.send('Authorization successful! Check the console for your refresh token.');
    } catch (error) {
        console.error('Error retrieving access token:', error);
        res.status(500).send('Error retrieving access token');
    }
});

app.listen(PORT, async () => {
    console.log(`Server started on PORT ${PORT}`.bgBlue);
    await connectDB();
});
