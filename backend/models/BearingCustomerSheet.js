const mongoose = require('mongoose');
const { Schema } = mongoose;

const BearingCustomerSheetSchema = new Schema({
    customerName: {
        type: String,
    },
    bearingType: {
        type: String,
    },
    bearing: {
        type: String,
    },
    so: {
        type: String,
    },
    KSBPrice: {
        type: Number,
    },
    KSBInvoice: {
        type: String,
    },
    KSBInvoiceDate: {
        type: Date,
    },
    PPPrice: {
        type: Number,
        // required: true,
    },
    DueDate: {
        type: Date,
    },
    AllotedDate: {
        type: Date,
    },
})

module.exports = mongoose.model('bearingcustomersheet', BearingCustomerSheetSchema);