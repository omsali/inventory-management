const mongoose = require('mongoose');
const { Schema } = mongoose;

const DispatchBearingSchema = new Schema ({
    bearingType: {
        type: String,
    },
    bearing: {
        type: String,
    },
    so: {
        type: String,
    },
    customerName: {
        type: String,
        // required: true
    },
    KSBPrice: {
        type: Number,
        // required: true
    },
    PPPrice: {
        type: Number,
        // required: true
    },
    PPInvoice: {
        type: String,
        // required: true
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
    },
});

module.exports = mongoose.model('dispatchbearing', DispatchBearingSchema);