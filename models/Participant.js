const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
});

const Participant = mongoose.model('Participant', participantSchema);

module.exports = Participant;
