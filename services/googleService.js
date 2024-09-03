const { google } = require('googleapis');
const { oauth2Client } = require('../auth/googleAuth');

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

// Function to get participants from a Google Calendar event
exports.getParticipants = async (eventId) => {
    try {
        const res = await calendar.events.get({
            calendarId: 'primary',
            eventId: eventId,
        });

        if (res.data.attendees && res.data.attendees.length > 0) {
            return res.data.attendees.map(attendee => attendee.email);
        } else {
            return [];
        }
    } catch (error) {
        console.error('Failed to fetch participants:', error);
        return [];
    }
};
