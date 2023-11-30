const mongoose = require('mongoose');
const { Schema } = mongoose;

const SparesSchema = new Schema({
    pumpType: {
        type: String,
    },
    spareType: {
        type: String,
    },
    spareSize: {
        type: String,
    },
    moc: {
        type: String,
    },
    inwardQty: {
        type: Number,
    },
    inwardCust: {
        type: String,
    },
    outwardQty: {
        type: Number,
    },
    outwardCust: {
        type: String,
    }
});

module.exports = mongoose.model("spares", SparesSchema);
