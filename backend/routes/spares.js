const express = require('express');
const router = express.Router();
const Spare = require('../models/Spares');
const Sparescollection = require('../models/SparesCollection');
const { format } = require('date-fns');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');



const addSpare = async (req, res) => {
    try {
        const { pumpType, pumpSize, spareType, moc, qty, KSBInvoice, KSBInvoiceDate, price } = req.body;
        if (!pumpType || !spareType || !pumpSize || !moc || !qty || !KSBInvoice || !price) {
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

const getSpares = async (req, res) => {
    try {
        const spares = await Spare.find({});
        if (spares.length === 0) {
            return res.status(404).json({ success: false, message: "Spare data not found" })
        }
        res.status(201).json({
            success: true,
            spares,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in getting spares data from spares data"
        });
    }
}

// const getSpare = async (req, res) => {
//     try {
//         const { pumpType, pumpSize, spareType, moc } = req.query;
//         const filter = {
//             pumpType: pumpType,
//             pumpSize: pumpSize,
//             spareType: spareType,
//             moc: moc,
//         }
//         const data = await Spare.find(filter);
//         if (!data) {
//             return res.status(404).send('Spare data not found');
//         }
//         res.status(201).json({
//             success: true,
//             data,
//         });
//     } catch (error) {
//         res.status(500).send(error);
//     }
// };

const updateSpare = async (req, res) => {
    try {
        const { newqty, invoice, date, price } = req.body;

        const newSpare = {};
        if (newqty) { newSpare.qty = newqty };
        if (invoice) { newSpare.KSBInvoice = invoice };
        if (date) { newSpare.KSBInvoiceDate = date };
        if (price) { newSpare.price = price };

        const id = req.params.id;
        let spare = await Spare.findById(id);

        if (!spare) {
            return res.status(404).send("Spare not found");
        }
        spare = await Spare.findByIdAndUpdate(id, { $set: newSpare }, { new: true })
        res.status(201).json({
            success: true,
            spare
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in updating the existing spare"
        });
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
        res.status(500).json({
            success: false,
            message: "Error in deleting spare"
        });
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
        res.status(500).json({
            success: false,
            message: "Error in getting spares data from the collection"
        });
    }
};

const currentDate = format(new Date(), 'dd-MM-yyyy');

const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${year}/${month}/${day}`;
};

const downloadSparesCSV = async (req, res) => {
    try {
        const spares = await Spare.find({});

        if (spares.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Instock-Spares-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'pumpType', title: 'Pump Type' },
                { id: 'pumpSize', title: 'Pump Size' },
                { id: 'spareType', title: 'Spare Type' },
                { id: 'moc', title: 'MOC' },
                { id: 'qty', title: 'Quantity' },
                { id: 'KSBInvoice', title: 'KSB Invoice' },
                { id: 'price', title: 'Price' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
            ],
        });

        const csvData = spares.map((spare) => ({
            pumpType: spare.pumpType,
            pumpSize: spare.pumpSize,
            spareType: spare.spareType,
            moc: spare.moc,
            qty: spare.qty,
            KSBInvoice: spare.KSBInvoice,
            price: formatPrice(spare.price),
            KSBInvoiceDate: formatDate(spare.KSBInvoiceDate)
        }));

        csvWriter.writeRecords(csvData)
            .then(() => {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
                const fileStream = fs.createReadStream(fileName);
                fileStream.pipe(res);
            });
    } catch (error) {
        res.status(500).send(error);
    }
}

router.route('/addspare').post(addSpare);
router.route('/getspares').get(getSpares);
router.route('/updatespare/:id').put(updateSpare);
router.route('/dispatchspare').delete(deleteSpare);
router.route('/allspares').get(getSpareFromCollection);
router.route('/downloadspares-csv').get(downloadSparesCSV);

module.exports = router;
