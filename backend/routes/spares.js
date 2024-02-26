const express = require('express');
const router = express.Router();
const Spare = require('../models/Spares');
const Sparescollection = require('../models/SparesCollection');
const { format } = require('date-fns');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const DispatchSpare = require('../models/DispatchSpare');



const addSpare = async (req, res) => {
    try {
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
        // const { newqty, invoice, date, price } = req.body;

        const newSpare = {};
        if (req.body.pumpType) { newSpare.pumpType = req.body.pumpType };
        if (req.body.pumpBB) { newSpare.pumpBB = req.body.pumpBB };
        if (req.body.pumpSize) { newSpare.pumpSize = req.body.pumpSize };
        if (req.body.spareType) { newSpare.spareType = req.body.spareType };
        if (req.body.moc) { newSpare.moc = req.body.moc };
        if (req.body.so) { newSpare.so = req.body.so };
        if (req.body.newqty) { newSpare.qty = req.body.newqty };
        if (req.body.invoice) { newSpare.KSBInvoice = req.body.invoice };
        if (req.body.date) { newSpare.KSBInvoiceDate = req.body.date };
        if (req.body.price) { newSpare.price = req.body.price };

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

const dispatchSpare = async (req, res) => {
    try {
        const dispatchSpare = await DispatchSpare.create(req.body);
        res.status(201).json({
            success: true,
            dispatchSpare,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const deleteSpare = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const spareData = await Spare.findById(id);
        if (!spareData) {
            return res.status(404).send('Spare data not found');
        }
        spareData = await Spare.findByIdAndDelete(id);
        res.status(500).json({
            success: true,
            message: "Deleted sucessfully",
            spareData
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error in deleting spare"
        });
    }
};

//From DISPATCHSPARES
const getDispatchSpare = async (req, res) => {
    try {
        const spares = await DispatchSpare.find({});
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

const addSpareTypeToCollection = async (req, res) => {
    try {
        const { spareType } = req.body;
        const collection = await Sparescollection.findOne();

        if (!collection) {
            res.status(404).json({ message: 'Collection not found' });
            return;
        }
        let uniq = true;
        collection.spareTypes.map((spare) => {
            if (spare.includes(spareType)) {
                uniq = false;
            }
        })

        if (uniq) {
            collection.spareTypes.push(spareType);
            await collection.save();
            const newList = collection.spareTypes;
            res.status(200).json({ success: true, newList });
        } else {
            const newList = collection.spareTypes;
            res.status(400).json({ success: false, newList });
        }

    } catch {
        res.status(500).json({
            success: false,
            message: "Error in adding spares type to the collection"
        });
    }
}

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
                { id: 'so', title: 'SO NO' },
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
            so: spare.so,
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

const downloadDispatchPumpsCSV = async (req, res) => {
    try {
        const spares = await DispatchSpare.find({});

        if (spares.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Dispatched-Spares-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'custName', title: 'Customer Name' },
                { id: 'pumpType', title: 'Pump Type' },
                { id: 'pumpSize', title: 'Pump Size' },
                { id: 'spareType', title: 'Spare Type' },
                { id: 'moc', title: 'MOC' },
                { id: 'so', title: 'So NO' },
                { id: 'qty', title: 'Quantity' },
                { id: 'PPSSInvoice', title: 'PPSS Invoice' },
                { id: 'price', title: 'Price' },
                { id: 'PPSSInvoiceDate', title: 'PPSS Invoice Date' },
            ],
        });

        const csvData = spares.map((spare) => ({
            custName: spare.custName,
            pumpType: spare.pumpType,
            pumpSize: spare.pumpSize,
            spareType: spare.spareType,
            moc: spare.moc,
            so: spare.so,
            qty: spare.qty,
            PPSSInvoice: spare.PPInvoice,
            price: formatPrice(spare.price),
            PPSSInvoiceDate: formatDate(spare.PPInvoiceDate)
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
router.route('/addsparetype').put(addSpareTypeToCollection);
router.route('/getspares').get(getSpares);
router.route('/updatespare/:id').put(updateSpare);
router.route('/dispatchspare').post(dispatchSpare);
router.route('/dispatch/:id').delete(deleteSpare);
router.route('/dispatchedspares').get(getDispatchSpare);
router.route('/allspares').get(getSpareFromCollection);
router.route('/downloadspares-csv').get(downloadSparesCSV);
router.route('/downloaddispatchedspares-csv').get(downloadDispatchPumpsCSV);

module.exports = router;
