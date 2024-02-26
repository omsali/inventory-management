const express = require('express');
const router = express.Router();
const MOU = require('../models/MOU');
const DispatchedPumps = require('../models/DispatchPump');

const updateQuarterSellQty = async () => {
    try {
        const dispatchedPumps = await DispatchedPumps.find({});

        const mouData = await MOU.find({});

        for (const mou of mouData) {
            const quarterSellQty = [0, 0, 0, 0];

            dispatchedPumps.forEach((pump) => {
                if (pump.pumpType === mou.pumpType) {
                    const sellMonth = pump.PPInvoiceDate.getMonth() + 1; 
                    const sellYear = pump.PPInvoiceDate.getFullYear();

                    const quarter = getQuarter(sellMonth);

                    if (quarter === mou.quarterNumber && sellYear === mou.year) {
                        quarterSellQty[quarter - 1]++;
                    }
                }
            });

            mou.quarters.forEach((quarter, index) => {
                quarter.quarterSellQty = quarterSellQty[index];
            });

            await mou.save();
        }
        console.log('Quarter sell quantities updated successfully');
    } catch (error) {
        console.error('Error updating quarter sell quantities:', error);
    }
};

const addMOU = async (req, res) => {
    try {
        const mou = await MOU.create(req.body)
        res.status(201).json({
            success: true,
            mou,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateMOU = async (req, res) => {
    try {
        const { pumpType, totalQty, quarters } = req.body;
        const id = req.params.id

        const newMOU = {}
        if (pumpType) { newMOU.pumpType = pumpType}
        if (totalQty) { newMOU.totalQty = totalQty}
        if (quarters) { newMOU.quarters = quarters}

        let mou = await MOU.findById(id);

        if (!mou) {
            res.status(404).send("mou not found")
        }

        mou = await MOU.findByIdAndUpdate(id, { $set: newMOU }, { new: true })
        res.status(201).json({
            success: true,
            mou,
        });



    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


// const getMOU = async (req, res) => {
//     try {
//         await updateQuarterSellQty();
//         const existingMOU = await MOU.find({});

//         if (existingMOU) {
//             res.status(200).json({ success: true, message: 'MOU updated successfully', pumpTypes: existingMOU });
//         } else {
//             res.status(404).json({ success: false, message: 'MOU not  found' });
//         }
//     } catch (error) {
//         console.error('Error:', error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
// };

const getMOU = async (req, res) => {
    try {
        await updateQuarterSellQty();        
        const existingMOU = await MOU.find({});

        if (existingMOU) {
            res.status(200).json({ success: true, message: 'MOU updated successfully', pumpTypes: existingMOU });
        } else {
            res.status(404).json({ success: false, message: 'MOU not found' });
        }
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


const deleteMOU = async (req, res) => {
    try {
        const id = req.params.id;

        let mou = await MOU.findById(id);

        if(!mou) {
            res.send("MOU not found")
        } else {
            mou = await MOU.findByIdAndDelete(id)
            res.status(201).json({
                success: true,
                mou
            })
        }


    } catch (error) {
        res.send(error.message)
    }
}


const getQuarter = (month) => {
    return Math.floor((month - 1) / 3) + 1;
};






router.route("/addmou").post(addMOU)
router.route("/updatemou/:id").put(updateMOU)
router.route("/getmou").get(getMOU)
router.route("/deletemou/:id").delete(deleteMOU)
// router.route("/updatequartersell").get(updateQuarterSellQty)

module.exports = router;
