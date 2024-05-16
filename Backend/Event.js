const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    eventimage: {
        type: String,
        required: true
    },
    eventname: {
        type: String,
        required: true
    },
    eventdetail: {
        type: String,
        required: true
    },
    eventtype: {
        type: String,
        required: true
    },
    artistimage: {
        type: String,
        required: true
    },
    artistname: {
        type: String,
        required: true
    },
    artistspotify: {
        type: String,
        required: true
    },
    locationname: {
        type: String,
        required: true
    },
    locationprovice: {
        type: String,
        required: true
    },
    locationcountry: {
        type: String,
        required: true
    },
    locationembed: {
        type: String,
        required: true
    },
    locationgooglemap: {
        type: String,
        required: true
    },
    locationlatitude: {
        type: String,
        required: true
    },
    locationlongitude: {
        type: String,
        required: true
    },
    startday: {
        type: String,
        required: true
    },
    startmonth: {
        type: String,
        required: true
    },
    startyear: {
        type: String,
        required: true
    },
    starthour: {
        type: String,
        required: true
    },
    startminute: {
        type: String,
        required: true
    },
    startsum: {
        type: String,
        required: true
    },
    endday: {
        type: String,
        required: true
    },
    endmonth: {
        type: String,
        required: true
    },
    endyear: {
        type: String,
        required: true
    },
    endhour: {
        type: String,
        required: true
    },
    endminute: {
        type: String,
        required: true
    },
    endsum: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

// Add a virtual property to format the createdAt date
EventSchema.virtual('formattedCreatedAt').get(function() {
    const options = {
        year: 'numeric',
        month: 'long', // Change to 'short', 'long', or 'numeric' as desired
        day: 'numeric',
        timeZone: 'Asia/Bangkok'
    };
    return this.createdAt.toLocaleDateString('en-US', options);
});

const UserModel = mongoose.model("events", EventSchema);

module.exports = UserModel;
