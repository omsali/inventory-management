const express = require('express');
const router = express.Router();
const Spare = require('../models/Spares');
const Sparescollection = require('../models/SparesCollection');

const addSpare = async (req, res) => {
    try {
        const { pumpType, spareType, spareSize, moc } = req.body;
        if (!pumpType || !spareType || !spareSize || !moc) {
            return res.status(400).json({ success: false, message: 'Required fields are missing.' });
        }
        const spare = await Spare.create(req.body);
        
        res.status(201).json({
            success: true,
            spare,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getSpare = async (req, res) => {
    try {
        const { pType, sType, sSize, sMOC } = req.body;
        const data = await Spare.find({ pumpType: pType, spareType: sType, spareSize: sSize, moc: sMOC });
        if (!data) {
            return res.status(404).send('Spare data not found');
        }
        res.status(201).json({
            success: true,
            data,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateSpare = async (req, res) => {
    try {
        const { inwardQty, outwardQty, inwardCust, outwardCust } = req.body;

        const newSpare = {};
        if (inwardQty) { newSpare.inwardQty = inwardQty };
        if (outwardQty) { newSpare.outwardQty = outwardQty };
        if (inwardCust) { newSpare.inwardCust = inwardCust };
        if (outwardCust) { newSpare.outwardCust = outwardCust };

        const id = req.params.id;
        let spare = await Spare.findById(id);

        if (!spare) {
            return res.status(404).send("Pump not found");
        }

        spare = await Spare.findByIdAndUpdate(id, { $set: newSpare }, { new: true })
        res.json({ spare });
    } catch (error) {
        res.status(500).send(error);
    }
};

const deleteSpare = async (req, res) => {
    try {
        const id = req.params.id;
        const spareData = await Spare.findById(id);
        if (!spareData) {
            return res.status(404).send('Spare data not found');
        }
        spareData = await Spare.findByIdAndDelete(id);
        res.json({ sucess: "Spare Dispatched" })
    } catch (error) {
        res.status(500).send(error);
    }
};

const getSpareFromCollection = async (req, res) => {
    try {
        const spares = await Sparescollection.find({});
        if (!spares) {
            return res.status(404).send('Spare not found');
        }
        res.status(201).json({
            success: true,
            spares,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

router.route('/addspare').post(addSpare);
router.route('/getspare').get(getSpare);
router.route('/updatespare').put(updateSpare);
router.route('/dispatchspare').delete(deleteSpare);
router.route('/allspares').get(getSpareFromCollection);

module.exports = router;
