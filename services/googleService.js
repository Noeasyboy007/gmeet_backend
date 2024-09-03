const { google } = require('googleapis');

const oauth2Client = new google.auth.OAuth2(
  process.env.CLIENT_ID,
  process.env.CLIENT_SECRET,
  process.env.REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: process.env.REFRESH_TOKEN });

const calendar = google.calendar({ version: 'v3', auth: oauth2Client });

exports.getParticipants = async (meetingId) => {
  try {
    const res = await calendar.events.get({
      calendarId: 'primary',
      eventId: meetingId,
    });

    // Check if there are attendees (participants) in the event
    if (res.data.attendees && res.data.attendees.length > 0) {
      // Map through attendees and extract their email addresses
      const participants = res.data.attendees.map(attendee => attendee.email);
      return participants;
    } else {
      return [];
    }
  } catch (error) {
    console.error('Failed to fetch participants:', error);
    return [];
  }
};
