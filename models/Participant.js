const mongoose = require('mongoose');

const participantsSchema = new mongoose.Schema({
    meetingId: {
        type: String,
        required: true
    },  // Reference to the associated meeting

    email: {
        type: String,
        required: true
    },  // Email ID of the participant
});

const participantsModel = mongoose.model('participants', participantsSchema);

module.exports = participantsModel;