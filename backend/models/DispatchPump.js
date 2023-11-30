const mongoose = require('mongoose');
const { Schema } = mongoose;

const DispatchPumpsSchema = new Schema({
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
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    PPInvoice: {
        type: String,
        required: true
    },
    PPInvoiceDate: {
        type: Date,
        // required: true

    }
});

module.exports = mongoose.model("dispatchpumps", DispatchPumpsSchema);