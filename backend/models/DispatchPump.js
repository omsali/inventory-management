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
        type: String,
        required: true
    },
    seal: {
        type: String,
        required: true
    },
    customerName: {
        type: String,
        required: true
    },
    KSBPrice: {
        type: Number,
        required: true
    },
    PPPrice: {
        type: Number,
        // required: true
    },
    PPInvoice: {
        type: String,
        required: true
    },
    AllotedDate: {
        type: Date,
    },
    DueDate: {
        type: Date,
    },
    KSBInvoiceDate: {
        type: Date,
    },
    PPInvoiceDate: {
        type: Date,
    }
});

module.exports = mongoose.model("dispatchpumps", DispatchPumpsSchema);