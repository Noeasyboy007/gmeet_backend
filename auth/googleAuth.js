const dotenv = require('dotenv');
dotenv.config();

const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
);

// Function to generate the authentication URL
const getAuthUrl = () => {
    const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: ['https://www.googleapis.com/auth/calendar.readonly'],
    });
    return authUrl;
};

// Function to exchange authorization code for tokens
const getToken = async (code) => {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);
    return tokens;
};

// Function to set credentials using a refresh token
const setCredentials = (refreshToken) => {
    oauth2Client.setCredentials({ refresh_token: refreshToken });
};

module.exports = {
    oauth2Client,
    getAuthUrl,
    getToken,
    setCredentials,
};
