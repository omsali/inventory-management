const mongoose = require('mongoose');
const { Schema } = mongoose;

const PumpsCollectionSchema = new Schema({
    pumpType: String,
    pumpSize: {
        type: Array,
        default: [],
    },
    moc: {
        type: Array,
        default: [],
    },
});

module.exports = mongoose.model("pumpscollection", PumpsCollectionSchema);
