const mongoose = require('mongoose');
const { Schema } = mongoose;

const CustomerSheet = new Schema({
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
    },
    KSBPrice: {
        type: Number,
        required: true
    },
    KSBInvoice: {
        type: String,
        required: true
    },
    KSBInvoiceDate: {
        type: Date,
    },
    CustomerName: {
        type: String,
        required: true
    },
    PPPrice: {
        type: Number,
        required: true,
    },
    DueDate: {
        type: Date,
    },
    AllotedDate: {
        type: Date,
    },
});

module.exports = mongoose.model("customersheet", CustomerSheet);