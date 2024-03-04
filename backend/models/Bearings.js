const mongoose = require('mongoose');
const { Schema } = mongoose;

const BearingSchema = new Schema ({
    bearingType: {
        type: String,
    },
    bearing: {
        type: String,
    },
    so: {
        type: String,
    },
    price: {
        type: Number,
    },
    KSBInvoice: {
        type: String,
    },
    KSBInvoiceDate: {
        type: String,
    },
})

module.exports = mongoose.model('bearings', BearingSchema)