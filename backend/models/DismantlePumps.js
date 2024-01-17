const mongoose = require('mongoose');
const { Schema } = mongoose;

const DismantlePumpSchema = new Schema({
    pumpType: {
        type: String,
        required: true
    },
    pumpSize: {
        type: String,
        required: true
    },
    moc: {
        type: String,
        required: true
    },
    so: {
        type: String,
        required: true
    },
    seal: {
        type: String,
        required: true
    },
    dismantleParts: {
        type: Array,
        default: []
    }
});

module.exports = mongoose.model("dismantlepumps", DismantlePumpSchema)

