const express = require('express');
const router = express.Router();
const { format } = require('date-fns');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const fs = require('fs');
const BearingCollection = require('../models/BearingCollection');
const Bearing = require('../models/Bearings');
const DispatchBearing = require('../models/DispatchBearing')
const BearingCustomerSheet = require('../models/BearingCustomerSheet')

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

const addBearing = async (req, res) => {
    try {
        const bearing = await Bearing.create(req.body);

        res.status(200).json({
            success: true,
            bearing,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getBearings = async (req, res) => {
    try {
        const bearings = await BearingCollection.find({});
        res.status(200).json({
            success: true,
            bearings,
        })
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllBearing = async (req, res) => {
    try {
        const bearing = await Bearing.find({});
        if (!bearing) {
            return res.status(404).send('Bearing not found');
        }
        res.status(201).json({
            success: true,
            bearing,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const updateBearing = async (req, res) => {
    try {
        const { bearingType, so, price, invoice, invoiceDate } = req.body;

        const newBearing = {};
        if (bearingType) { newBearing.bearingType = bearingType };
        if (req.body.bearing) { newBearing.bearing = req.body.bearing };
        if (so) { newBearing.so = so };
        if (price) { newBearing.price = price };
        if (invoice) { newBearing.KSBInvoice = invoice };
        if (invoiceDate) { newBearing.KSBInvoiceDate = invoiceDate };

        const id = req.params.id;
        let bearing = await Bearing.findById(id);

        if (!bearing) {
            return res.status(404).send("Bearing not found");
        }

        bearing = await Bearing.findByIdAndUpdate(id, { $set: newBearing }, { new: true })
        res.status(201).json({
            success: true,
            bearing,
        });
        // res.json({ bearing });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const dispatchBearing = async (req, res) => {
    try {
        const dispatchBearing = await DispatchBearing.create(req.body);
        res.status(201).json({
            success: true,
            dispatchBearing,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteBearing = async (req, res) => {
    try {
        const id = req.params.id;
        let bearingData = await Bearing.findById(id);
        if (!bearingData) {
            return res.status(404).send('Bearing data not found');
        } else {
            bearingData = await Bearing.findByIdAndDelete(id);
            res.status(200).json({
                success: true,
                message: "Bearing Dispatched"
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getAllBearingsFromCustSheet = async (req, res) => {
    try {
        const bearings = await BearingCustomerSheet.find({});
        if (!bearings) {
            return res.status(404).send('Bearing not found');
        }
        res.status(201).json({
            success: true,
            bearings,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const updateCustSheet = async (req, res) => {
    try {
        const { customerName, PPPrice, DueDate } = req.body;

        const newBearing = {};
        if (customerName) { newBearing.customerName = customerName };
        if (PPPrice) { newBearing.PPPrice = PPPrice };
        if (DueDate) { newBearing.DueDate = DueDate };

        const id = req.params.id;
        let bearing = await BearingCustomerSheet.findById(id);
        console.log(bearing);

        if (!bearing) {
            return res.status(404).send("Bearing not found");
        }

        bearing = await BearingCustomerSheet.findByIdAndUpdate(id, { $set: newBearing }, { new: true })
        res.status(201).json({
            success: true,
            bearing,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
};

const custDispatch = async (req, res) => {
    try {
        const custDispatchBearing = await BearingCustomerSheet.create(req.body);
        res.status(201).json({
            success: true,
            custDispatchBearing,
        });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const deleteCustBearing = async (req, res) => {
    try {
        const id = req.params.id;
        let bearingData = await BearingCustomerSheet.findById(id);
        if (!bearingData) {
            return res.status(404).send('Bearing data not found');
        } else {
            bearingData = await BearingCustomerSheet.findByIdAndDelete(id);
            res.status(200).json({
                success: true,
                message: "Bearing Dispatched"
            })
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
}

const getDispatchBearings = async (req, res) => {
    try {
        const bearings = await DispatchBearing.find({});
        if (!bearings) {
            return res.status(404).send('Bearing not found');
        }
        res.status(201).json({
            success: true,
            bearings,
        });
    } catch (error) {
        res.status(500).send(error);
    }
};

const downloadBearingsCSV = async (req, res) => {
    try {
        const bearings = await Bearing.find({});

        if (bearings.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Instock-Bearings-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'bearingType', title: 'Bearing Type' },
                { id: 'bearing', title: 'Bearing' },
                { id: 'so', title: 'So. no' },
                { id: 'KSBInvoice', title: 'KSB Invoice' },
                { id: 'price', title: 'Price' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
            ],
        });

        const csvData = bearings.map((bearing) => ({
            bearingType: bearing.bearingType,
            bearing: `"${bearing.bearing}"`,
            so: bearing.so,
            KSBInvoice: bearing.KSBInvoice,
            price: formatPrice(bearing.price),
            KSBInvoiceDate: formatDate(bearing.KSBInvoiceDate)
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
const downloadDispatchBearingsCSV = async (req, res) => {
    try {
        const bearings = await DispatchBearing.find({});

        if (bearings.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Dispatched-Bearings-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'customerName', title: 'Customer Name' },
                { id: 'bearingType', title: 'Bearing Type' },
                { id: 'bearing', title: 'Bearing ' },
                { id: 'so', title: 'So. no' },
                { id: 'PPSSInvoice', title: 'PPSS Invoice' },
                { id: 'KSBPrice', title: 'KSB Price' },
                { id: 'PPPrice', title: 'PPSS Price' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
                { id: 'PPSSInvoiceDate', title: 'PPSS Invoice Date' },
            ],
        });

        const csvData = bearings.map((bearing) => ({
            customerName: bearing.customerName,
            bearingType: bearing.bearingType,
            bearing: bearing.bearing,
            so: bearing.so,
            PPSSInvoice: bearing.PPInvoice,
            KSBPrice: formatPrice(bearing.KSBPrice),
            PPPrice: formatPrice(bearing.PPPrice),
            KSBInvoiceDate: formatDate(bearing.KSBInvoiceDate),
            PPSSInvoiceDate: formatDate(bearing.PPInvoiceDate)
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
        const bearings = await BearingCustomerSheet.find({});

        if (bearings.length === 0) {
            return res.status(404).send('No data available to export.');
        }

        const fileName = `Bearing-Customer-Sheet-${currentDate}.csv`;

        const csvWriter = createCsvWriter({
            path: fileName,
            header: [
                { id: 'customerName', title: 'Customer Name' },
                { id: 'bearingType', title: 'Bearing Type' },
                { id: 'bearing', title: 'Bearing ' },
                { id: 'so', title: 'So. no' },
                { id: 'KSBInvoice', title: 'KSB Invoice' },
                { id: 'KSBInvoiceDate', title: 'KSB Invoice Date' },
                { id: 'DueDate', title: 'Due Date' },
                { id: 'AllotedDate', title: 'Book Date' },
                { id: 'KSBPrice', title: 'KSB Price' },
                { id: 'PPPrice', title: 'PPSS Price' },
            ],
        });

        const csvData = bearings.map((bearing) => ({
            customerName: bearing.customerName,
            bearingType: bearing.bearingType,
            bearing: bearing.bearing,
            so: bearing.so,
            KSBInvoice: bearing.KSBInvoice,
            KSBInvoiceDate: formatDate(bearing.KSBInvoiceDate),
            DueDate: formatDate(bearing.DueDate),
            AllotedDate: formatDate(bearing.AllotedDate),
            KSBPrice: formatPrice(bearing.KSBPrice),
            PPPrice: formatPrice(bearing.PPPrice),
        }));

        csvWriter.writeRecords(csvData)
            .then(() => {
                res.setHeader('Content-Type', 'text/csv');
                res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
                const fileStream = fs.createReadStream(fileName);
                fileStream.pipe(res);
            });
    } catch (error) {
        res.status(500).send(error.message);
    }
}

router.route("/addbearing").post(addBearing);
router.route("/allbearings").get(getBearings);
router.route("/getallbearings").get(getAllBearing);
router.route('/updatebearing/:id').put(updateBearing);
router.route('/deletebearing/:id').delete(deleteBearing);
router.route('/dispatchbearing').post(dispatchBearing);

router.route('/dispatchedbearings').get(getDispatchBearings);

router.route("/getallcustbearings").get(getAllBearingsFromCustSheet);
router.route('/updatebearingcustsheet/:id').put(updateCustSheet);
router.route('/bearingcustomerdispatch').post(custDispatch);
router.route('/deletecustbearing/:id').delete(deleteCustBearing);

router.route('/downloadB-csv').get(downloadBearingsCSV);
router.route('/downloadBDP-csv').get(downloadDispatchBearingsCSV);
router.route('/downloadBCBS-csv').get(downloadCustSheetCSV);


module.exports = router;