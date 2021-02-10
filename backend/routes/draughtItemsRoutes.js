const express = require('express');
const router = express.Router();
const ExpressError = require('../expressError');
const DraughtItem = require('../models/DraughtItems');

router.get('/', async (req, res, next) => {
    try {
        const draughtItems = await DraughtItem.get();
        return res.json({draughtItems});
    } catch (e) {
        return next(e);
    }
    
});

router.post('/', async (req, res, next) => {
    try {
        const draughtItem = await DraughtItem.create(req.body);
        return res.status(201).json({draughtItem});
    } catch (e) {
        return next(e);
    }
})

module.exports = router;