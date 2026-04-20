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
        // Find highest existing numeric receipt number
        const lastPayment = await Payment.findOne({}).sort({ createdAt: -1 });
        let newReceiptNumber = "1";
        
        // Let's get all payments to parse max receiptNumber safely
        const allPayments = await Payment.find({}, 'receiptNumber');
        let maxNum = 0;
        allPayments.forEach(p => {
            if (p.receiptNumber && !isNaN(p.receiptNumber)) {
                const num = parseInt(p.receiptNumber, 10);
                if (num > maxNum) {
                    maxNum = num;
                }
            }
        });
        newReceiptNumber = (maxNum + 1).toString();

        const newPayment = new Payment({ ...req.body, receiptNumber: newReceiptNumber });
        await newPayment.save();

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
