const Meeting = require('../models/Meeting');
const Participant = require('../models/Participant');
const googleService = require('../services/googleService');

exports.saveMeetingData = async (req, res) => {
  try {
    const { googleMeetLink, title, organizerEmail, startTime, endTime } = req.body;

    // Extract the meeting ID from the Google Meet link
    const meetingId = googleMeetLink.split('/').pop();

    const meeting = new Meeting({
      meetingId,
      googleMeetLink,
      title,
      organizerEmail,
      startTime,
      endTime,
    });

    await meeting.save();

    // Fetch participants using the Google Calendar API
    const participants = await googleService.getParticipants(meetingId);

    // Store participants' emails in the database
    for (const email of participants) {
      const participant = new Participant({ meetingId, email });
      await participant.save();
    }

    res.status(200).json({ message: 'Meeting and participants saved successfully' });
  } catch (error) {
    console.error('Error saving meeting data:', error);
    res.status(500).json({ message: 'Failed to save meeting data', error });
  }
};

// module.exports = saveMeetingData;