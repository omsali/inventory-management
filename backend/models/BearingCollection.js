const mongoose = require('mongoose');
const { Schema } = mongoose;

const BearingCollectionSchema = new Schema ({
    bearingType: {
        type: String,
    },
    bearing: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("bearingcollection", BearingCollectionSchema);