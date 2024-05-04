const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add a virtual property to format the createdAt date
UserSchema.virtual('formattedCreatedAt').get(function() {
    const options = {
        year: 'numeric',
        month: 'long', // Change to 'short', 'long', or 'numeric' as desired
        day: 'numeric',
        timeZone: 'Asia/Bangkok'
    };
    return this.createdAt.toLocaleDateString('en-US', options);
});

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;
