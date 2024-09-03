const mongoose = require('mongoose');

const meetingSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true,
        unique: true
    },
    googleMeetLink: {
        type: String,
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

const Meeting = mongoose.model('Meeting', meetingSchema);

module.exports = Meeting;
