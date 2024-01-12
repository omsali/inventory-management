const express = require('express');
const router = express.Router();
const Pump = require("../models/pumps");
const DispatchPump = require("../models/DispatchPump");
const PumpsCollection = require('../models/PumpsCollection');
const { format } = require('date-fns');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const CustomerSheet = require('../models/CustomerSheet');


// Controllers

//From PUMPS

// const validatePump = async (req, res) => {
//     try {
//         const { so } = req.query;
//         const data = await Pump.find({ so: so })
//         if(data.length > 0){
//             return res.status(11000).json({
//                 success: true,
//                 data,
//             });
//         }
//         else{
//             return res.status(201).send()
//         }
//     } catch (error) {
//         res.status(500).send(error);
//     }
// }

const addPump = async (req, res) => {
    try {
        const pump = await Pump.create(req.body);
        res.status(201).json({
            success: true,
            pump,
        });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).json({
                success: false,
                error: "Duplicate entry detected"
            })
        } else {
            res.status(500).json({
                success: false,
                error: "Internal server error"
            })
        }
    }
};

const getAllPumps = async (req, res) => {
    try {
        const pumps = await Pump.find({});
        if (!pumps) {
            return res.status(404).send('Pump not found');
        }
        res.status(201).json({
            success: true,
            pumps,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};
const getPumps = async (req, res) => {
    try {
        const { pType, pSize, pMOC } = req.query;
        const data = await Pump.find({ pumpType: pType, pumpSize: pSize, moc: pMOC });
        if (!data) {
            return res.status(404).send('Pump data not found');
        }
        // res.status(201).json({
        //     success: true,
        //     data,
        // });
        res.status(201).json(data);
    } catch (error) {
        res.status(500).send(error);
    }
};

const updatePump = async (req, res) => {
    try {
        const { pumpType, pumpSize, moc, seal, so, price, invoice, invoiceDate } = req.body;

        const newPump = {};
        if (pumpType) { newPump.pumpType = pumpType };
        if (pumpSize) { newPump.pumpSize = pumpSize };
        if (moc) { newPump.moc = moc };
        if (seal) { newPump.seal = seal };
        if (price) { newPump.price = price };
        if (invoice) { newPump.KSBInvoice = invoice };
        if (invoiceDate) { newPump.KSBInvoiceDate = invoiceDate };

        const id = req.params.id;
        let pump = await Pump.findById(id);

        if (!pump) {
            return res.status(404).send("Pump not found");
        }

        pump = await Pump.findByIdAndUpdate(id, { $set: newPump }, { new: true })
        res.status(201).json({
            success: true,
            pump,
        });
        // res.json({ pump });
    } catch (error) {
        res.status(500).send(error);
    }
};

const dispatchPump = async (req, res) => {
    try {
        const dispatchPump = await DispatchPump.create(req.body);
        res.status(201).json({
            success: true,
            dispatchPump,
        });
    } catch (error) {
        res.status(500).send(error);
    }
}

const deletePump = async (req, res) => {
    try {
        const id = req.params.id;
        let pumpData = await CustomerSheet.findById(id);
        if (!pumpData) {
            return res.status(404).send('Pump data not found');
        }
        pumpData = await CustomerSheet.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message: "Pump Dispatched" 
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}
// From CustomerSheet

const updateCustSheet = async (req, res) => {
    try {
        const { CustomerName, PPPrice, DueDate } = req.body;

        const newPump = {};
        if (CustomerName) { newPump.CustomerName = CustomerName };
        if (PPPrice) { newPump.PPPrice = PPPrice };
        if (DueDate) { newPump.DueDate = DueDate };

        const id = req.params.id;
        let pump = await CustomerSheet.findById(id);
        console.log(pump);

        if (!pump) {
            return res.status(404).send("Pump not found");
        }

        pump = await CustomerSheet.findByIdAndUpdate(id, { $set: newPump }, { new: true })
        res.status(201).json({
            success: true,
            pump,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const custDispatch = async (req, res) => {
    try {
        const custDispatchPump = await CustomerSheet.create(req.body);
        res.status(201).json({
            success: true,
            custDispatchPump,
        });
    } catch (error) {
        res.status(500).send(error);
    }
} 

const deleteInstock = async (req, res) => {
    try {
        const id = req.params.id;
        let pumpData = await Pump.findById(id);
        if (!pumpData) {
            return res.status(404).send('Pump data not found');
        }
        pumpData = await Pump.findByIdAndDelete(id);
        res.status(200).json({ 
            success: true,
            message: "Pump added to customer book sheet" 
        })
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllPumpsFromCustSheet = async (req, res) => {
    try {
        const pumps = await CustomerSheet.find({});
        if (!pumps) {
            return res.status(404).send('Pump not found');
        }
        res.status(201).json({
            success: true,
            pumps,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

// From PUMPSCOLLECTION
const getPumpFromCollection = async (req, res) => {
    try {
        const pumps = await PumpsCollection.find({});
        if (!pumps) {
            return res.status(404).send('Pump not found');
        }
        res.status(201).json({
            success: true,
            pumps,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const getPumpById = async (req, res) => {
    try {
        const id = req.params.id;
        const pumpData = await PumpsCollection.findById(id);
        if (!pumpData) {
            return res.status(404).send('Pump data not found');
        }
        res.status(201).json({
            success: true,
            pumpData,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

//From DISPATCHPUMPS
const getDispatchPumps = async (req, res) => {
    try {
        const pumps = await DispatchPump.find({});
        if (!pumps) {
            return res.status(404).send('Pump not found');
        }
        res.status(201).json({
            success: true,
            pumps,
        });
    } catch (error) {
        res.status(500).send(error);
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

const downloadPumpsCSV = async (req, res) => {
    try {
        const pumps = await Pump.find({});

        if (pumps.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Instock-Pumps-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'pumpType', title: 'Pump Type' },
                { id: 'pumpSize', title: 'Pump Size' },
                { id: 'moc', title: 'MOC' },
                { id: 'so', title: 'So. no' },
                { id: 'seal', title: 'Sealing' },
                { id: 'KSBInvoice', title: 'KSB Invoice' },
                { id: 'price', title: 'Price' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
            ],
        });

        const csvData = pumps.map((pump) => ({
            pumpType: pump.pumpType,
            pumpSize: pump.pumpSize,
            moc: pump.moc,
            so: pump.so,
            seal: pump.seal,
            KSBInvoice: pump.KSBInvoice,
            price: formatPrice(pump.price),
            KSBInvoiceDate: formatDate(pump.KSBInvoiceDate)
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
        const pumps = await DispatchPump.find({});

        if (pumps.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Dispatched-Pumps-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'customerName', title: 'Customer Name' },
                { id: 'pumpType', title: 'Pump Type' },
                { id: 'pumpSize', title: 'Pump Size' },
                { id: 'moc', title: 'MOC' },
                { id: 'so', title: 'So. no' },
                { id: 'seal', title: 'Sealing' },
                { id: 'PPSSInvoice', title: 'PPSS Invoice' },
                { id: 'KSBPrice', title: 'KSB Price' },
                { id: 'PPPrice', title: 'PPSS Price' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
                { id: 'PPSSInvoiceDate', title: 'PPSS Invoice Date' },
            ],
        });

        const csvData = pumps.map((pump) => ({
            customerName: pump.customerName,
            pumpType: pump.pumpType,
            pumpSize: pump.pumpSize,
            moc: pump.moc,
            so: pump.so,
            seal: pump.seal,
            PPSSInvoice: pump.PPInvoice,
            KSBPrice: formatPrice(pump.KSBPrice),
            PPPrice: formatPrice(pump.PPPrice),
            KSBInvoiceDate: formatDate(pump.KSBInvoiceDate),
            PPSSInvoiceDate: formatDate(pump.PPInvoiceDate)
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
const downloadCustSheetCSV = async (req, res) => {
    try {
        const pumps = await CustomerSheet.find({});

        if (pumps.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Customer-Sheet-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'CustomerName', title: 'Customer Name' },
                { id: 'pumpType', title: 'Pump Type' },
                { id: 'pumpSize', title: 'Pump Size' },
                { id: 'moc', title: 'MOC' },
                { id: 'so', title: 'So. no' },
                { id: 'seal', title: 'Sealing' },
                { id: 'KSBInvoice', title: 'KSB Invoice' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
                { id: 'DueDate', title: 'Alloted Date' },
                { id: 'KSBPrice', title: 'KSB Price' },
                { id: 'PPPrice', title: 'PPSS Price' },
            ],
        });

        const csvData = pumps.map((pump) => ({
            CustomerName: pump.CustomerName,
            pumpType: pump.pumpType,
            pumpSize: pump.pumpSize,
            moc: pump.moc,
            so: pump.so,
            seal: pump.seal,
            KSBInvoice: pump.KSBInvoice,
            KSBInvoiceDate: formatDate(pump.KSBInvoiceDate),
            DueDate: formatDate(pump.DueDate),
            KSBPrice: formatPrice(pump.KSBPrice),
            PPPrice: formatPrice(pump.PPPrice),
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



// Add pump
// router.route('/validatepump').get(validatePump);
router.route('/addpump').post(addPump);
router.route('/getpumps').get(getPumps);
router.route('/getallpumps').get(getAllPumps);
router.route('/updatepump/:id').put(updatePump);
router.route('/dispatchpump/:id').delete(deletePump);
router.route('/dispatchpump').post(dispatchPump);
router.route('/updatecustsheet/:id').put(updateCustSheet);
router.route('/getallpumpscust').get(getAllPumpsFromCustSheet);
router.route('/deleteInstock/:id').delete(deleteInstock);
router.route('/customerdispatch').post(custDispatch);
router.route('/dispatchedpumps').get(getDispatchPumps);
router.route('/allpumps').get(getPumpFromCollection);
router.route('/allpumps/:id').get(getPumpById);
router.route('/download-csv').get(downloadPumpsCSV);
router.route('/downloadDP-csv').get(downloadDispatchPumpsCSV);
router.route('/downloadCBS-csv').get(downloadCustSheetCSV);

module.exports = router;
