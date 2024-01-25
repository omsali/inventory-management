const mongoose = require('mongoose');
const { Schema } = mongoose;

const OrderListSchema =  new Schema({
    pumpType: {
        type: String,
        // required: true
    },
    pumpSize: {
        type: String,
        // required: true
    },
    moc: {
        type: String,
        // required: true
    },
});

module.exports = mongoose.model("orderlist", OrderListSchema)