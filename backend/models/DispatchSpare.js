const mongoose = require('mongoose');
const { Schema } = mongoose;

const DispatchSparesSchema = new Schema({
    custName: {
        type: String,
        // required: true,
    },
    pumpType: {
        type: String,
        // required: true,
    },
    pumpBB: {
        type: String,
        // required: true,
    },
    pumpSize: {
        type: String,
        // required: true,
    },
    spareType: {
        type: String,
        // required: true,
    },
    spareSize: {
        type: String,
        // required: true,
    },
    moc: {
        type: String,
        // required: true,
    },
    qty: {
        type: Number,
    },
    PPInvoice: {
        type: String,
        // required: true,
    },
    PPInvoiceDate: {
        type: Date,
    },
    price: {
        type: Number,
        // required: true,
    }
});

module.exports = mongoose.model("dispatchspares", DispatchSparesSchema)