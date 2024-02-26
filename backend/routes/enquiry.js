const express = require('express');
const router = express.Router();
const SpareQtn = require('../models/SpareQtn');

// const addQtn = async (req, res) => {
//     try{
//         const { qtnno, parts } = req.body;
//         console.log(req.body)
//         let qtn = await SpareQtn.find({qtnno: qtnno});
//         if(!qtn || qtn.length === 0) {
//             qtn = await SpareQtn.create(req.body);

//             res.status(200).json({
//                 success: true,
//                 qtn
//             });
//             return;
//         } else {
//             qtn.parts.push(parts[0]);
//             await SpareQtn.save();
//             const newList = SpareQtn.parts;
//             res.status(200).json({ success: true, newList });
//         }
//     } catch ( error ) {
//         res.send(error.message);
//     }
// }

const addQtn = async (req, res) => {
    try {
        const { qtnno, parts } = req.body;

        let qtn = await SpareQtn.findOne({ qtnno: qtnno });

        if (!qtn) {
            qtn = await SpareQtn.create(req.body);
            qtn.finalVal = parseInt(qtn.finalVal) + parseInt(parts[0].totalVal);
            qtn.totalQty = parseInt(qtn.totalQty) + parseInt(parts[0].qty);
            await qtn.save();
            res.status(201).json({ success: true, qtn });
        } else {
            qtn.parts.push(parts[0]); // Assuming you want to add only the first part
            qtn.finalVal = parseInt(qtn.finalVal) + (parseInt(parts[0].totalVal) * parseInt(parts[0].qty));
            qtn.totalQty = parseInt(qtn.totalQty) + parseInt(parts[0].qty);
            await qtn.save();
            // const newList = qtn.parts;
            res.status(201).json({ success: true, qtn });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getQtnParts = async (req, res) => {
    try{
        const { qtnno } = req.query;
        const qtn = await SpareQtn.find({ qtnno: qtnno })

        res.status(200).json({
            success: true,
            qtn
        })
    } catch (error) {

    }
}
const getAllSparesQtn = async (req, res) => {
    try{
        const qtn = await SpareQtn.find({})

        res.status(200).json({
            success: true,
            qtn
        })
    } catch (error) {

    }
}

// const addPart = async (req, res) => {
//     try{
//         let part = await SpareQtn.find({qtnno: req.body.qtnno});

//         if(!part){
//             res.send("Quotation not present");
//         } else {
//             SpareQtn.parts.push(req.body.parts[0]);
//             await SpareQtn.save();
//             const newList = SpareQtn.parts;
//             res.status(200).json({ success: true, newList });
//         }
//     } catch (error) {
//         res.send(error.message)
//     }
// }


router.route('/addqtn').post(addQtn);
router.route('/getqtnparts').get(getQtnParts);
router.route('/getallsparesqtn').get(getAllSparesQtn);

module.exports = router;