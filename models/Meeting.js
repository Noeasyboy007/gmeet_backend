const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true,
        unique: true
    },
    googleMeetLink: {
        type: String
    }, // Optional: Full Google Meet link
    created_at: {
        type: Date,
        default: Date.now
    },
    title: {
        type: String,
        required: true
    },
    organizerEmail: {
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true
    },
    endTime: {
        type: Date,
        required: true
    },
});

const meetingModel = new mongoose.model('meeting', meetingSchema);

module.exports = meetingModel;