const mongoose = require('mongoose');
const { Schema } = mongoose;

const MOUSchema = new Schema({
    // pumpTypes: [
    //     {
    //         pumpType: {
    //             type: String,
    //             required: true
    //         },
    //         totalQty: {
    //             type: Number,
    //             required: true
    //         },
    //         sellQty: [
    //             {
    //                 first: {
    //                     type: Number,
    //                 },
    //                 second: {
    //                     type: Number,
    //                 },
    //                 third: {
    //                     type: Number,
    //                 },
    //                 fourth: {
    //                     type: Number,
    //                 }
    //             }
    //         ],
    //         quaters: [
    //             {
    //                 first: {
    //                     type: Number,
    //                 },
    //                 second: {
    //                     type: Number,
    //                 },
    //                 third: {
    //                     type: Number,
    //                 },
    //                 fourth: {
    //                     type: Number,
    //                 }
    //             }
    //         ]
    //     }
    // ]
    // pumpTypes: [
    //     {
            pumpType: { type: String },
            totalQty: { type: Number },
            quarters: [
                {
                    quarterNumber: { type: Number},
                    quarterTarget: { type: Number},
                    quarterSellQty: { type: Number, default: 0 }
                }
            ]
    //     }
    // ]
});

module.exports = mongoose.model("mou", MOUSchema)