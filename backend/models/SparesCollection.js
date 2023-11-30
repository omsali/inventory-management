const mongoose = require('mongoose');
const { Schema } = mongoose;

const SparesCollectionSchema = new Schema({
    spareType: {
        type: String,
    },
    spareSize: {
        type: Array,
        default: [],
    },
    moc: {
        type: Array,
        default: [],
    }
});

module.exports = mongoose.model("sparescollection", SparesCollectionSchema);
