const mongoose = require('mongoose');

const {Schema} = mongoose;

const requiredString = {
    type: String,
    required: true
};

const requiredNumber = {
    type: Number,
    required: true
}

const logEntrySchema = new Schema({
    title: requiredString,
    date_visited: {type: Date, required:true },
    comment: String,
    rating: {
        type:Number,
        min:0,
        max:10,
        default:0
    },
    latitude: {
        ...requiredNumber,
        min: -90,
        max: 90
    },
    longitude: {
        ...requiredNumber,
        min: -180,
        max: 180
    },
    description: String,
    image_uri: String
}, {
    timestamps: true
})

const LogEntry = mongoose.model('LogEntry', logEntrySchema)

module.exports = LogEntry
