const mongoose = require('mongoose');
const { Schema } = mongoose;

const SpareQtnSchema = new Schema({
    qtnno: { type: String, required: true },
    custName: { type: String, required: true },
    coPerson: { type: String, required: true },
    cono: { type: Number, required: true },
    coEmail: { type: String },
    parts: [{
        partName: { type: String, },
        pumpModel: { type: String, },
        partNo: { type: Number, },
        moc: { type: String, },
        delTime: { type: String, },
        totalVal: { type: Number, },
        qty: { type: Number, },
        unit: { type: String, },
    }],
    finalVal: { type: Number, default: 0 },
    totalQty: { type: Number, default: 0 },
    mailDate: { type: Date,  },
    desc: { type: String, default: "" },
    poDate: { type: Date, },
    followup: { type: String, default: "" },
    remark: { type: String, default: "" }
});

module.exports = mongoose.model("spareqtn", SpareQtnSchema);