const mongoose = require('mongoose');
const { Schema } = mongoose;

const SparesSchema = new Schema({
    pumpType: {
        type: String,
        required: true,
    },
    pumpSize: {
        type: String,
        required: true,
    },
    spareType: {
        type: String,
        required: true,
    },
    moc: {
        type: String,
        required: true,
    },
    qty: {
        type: Number,
    },
    KSBInvoice: {
        type: String,
        required: true,
    },
    KSBInvoiceDate: {
        type: Date,
    },
    price: {
        type: Number,
        required: true,
    }
});

module.exports = mongoose.model("spares", SparesSchema);
