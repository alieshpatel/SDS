import express from 'express';
import Payment from '../models/Payment.js';
import Maintenance from '../models/Maintenance.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const payments = await Payment.find({}).populate('houseId maintenanceId');
    res.json(payments);
});

router.post('/', async (req, res) => {
    try {
        let finalReceiptNumber = req.body.receiptNumber;
        if (!finalReceiptNumber) {
            let maxNum = 0;
            const allPayments = await Payment.find({}, 'receiptNumber');
            allPayments.forEach(p => {
                if (p.receiptNumber && !isNaN(p.receiptNumber)) {
                    const num = parseInt(p.receiptNumber, 10);
                    if (num > maxNum) maxNum = num;
                }
            });
            finalReceiptNumber = (maxNum + 1).toString();
        }

        const newPayment = new Payment({ ...req.body, receiptNumber: finalReceiptNumber });
        await newPayment.save();

        if (req.body.items && req.body.items.length > 0 && req.body.autoCreateDues) {
            for (let item of req.body.items) {
                let period = item.details;
                if (!period) {
                   period = String(new Date().getFullYear()) + '-' + String(new Date().getMonth() + 1).padStart(2, '0');
                }
                const [y] = period.split(/[-\s]/);
                let year = new Date().getFullYear();
                if (y && !isNaN(parseInt(y))) year = parseInt(y);

                const newMaint = new Maintenance({
                    houseId: req.body.houseId,
                    month: period,
                    year: year,
                    amount: item.amount,
                    paidAmount: item.amount,
                    subject: item.dueType,
                    status: req.body.isHistorical ? 'Paid' : 'Paid', // Custom receipts issued by admin are Paid immediately
                    adminApproved: true,
                    paymentMode: req.body.paymentMode,
                    transactionDate: req.body.date || Date.now()
                });
                await newMaint.save();
            }
        }

        if (req.body.maintenanceId) {
            const maint = await Maintenance.findById(req.body.maintenanceId);
            if (maint) {
                maint.paidAmount += req.body.amount;
                maint.pendingAmount = maint.amount - maint.paidAmount;
                if (maint.pendingAmount <= 0) {
                    maint.status = 'Paid';
                }
                if (req.body.paymentMode) {
                    maint.paymentMode = req.body.paymentMode;
                }
                if (req.body.chequeDetails) {
                    maint.chequeDetails = req.body.chequeDetails;
                }
                await maint.save();
            }
        }
        res.status(201).json(newPayment);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
