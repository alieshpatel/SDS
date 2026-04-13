import express from 'express';
import ReligiousFund from '../models/ReligiousFund.js';

const router = express.Router();

router.get('/', async (req, res) => {
    const funds = await ReligiousFund.find({}).populate('memberId');
    res.json(funds);
});

router.get('/my/:clerkUserId', async (req, res) => {
    try {
        const House = (await import('../models/House.js')).default;
        const house = await House.findOne({ clerkUserId: req.params.clerkUserId });
        if (!house) return res.json([]);
        
        const funds = await ReligiousFund.find({ memberId: house._id }).populate('memberId');
        res.json(funds);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

router.post('/', async (req, res) => {
    try {
        const payload = { ...req.body };
        if (payload.isHistorical && payload.transactionDate) {
            payload.date = new Date(payload.transactionDate);
        }
        const newFundRecord = new ReligiousFund(payload);
        await newFundRecord.save();
        res.status(201).json(newFundRecord);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
});

export default router;
