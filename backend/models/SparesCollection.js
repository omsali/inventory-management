const mongoose = require('mongoose');
const { Schema } = mongoose;

const SparesCollectionSchema = new Schema({
    pumpType: {
        type: String,
        required: true,
    },
    pumpSize: {
        type: Array,
        default: [],
    },
    spareType: {
        type: Array,
        default: [],
    },
    moc: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("sparescollection", SparesCollectionSchema);
