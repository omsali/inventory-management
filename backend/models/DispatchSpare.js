const mongoose = require('mongoose');
const { Schema } = mongoose;

const DispatchSparesSchema = new Schema({
    pumpType: {
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