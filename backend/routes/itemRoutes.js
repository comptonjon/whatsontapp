const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

router.get('/', async (req, res, next) => {
    try {
        const items = await Item.get();
        return res.json({items});
    } catch (e) {
        return next(e);
    }
});

router.get('/:id', async (req, res, next) => {
    const {id} = req.params;
    try {
        const items = await Item.get(id);
        return res.json({items});
    } catch (e) {
        return next(e);
    }
});

router.post('/', async (req, res, next) => {
    try {
        const item = await Item.create(req.body);
        return res.status(201).json({item});
    } catch (e) {
        return next(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const item = await Item.update(id, req.body);
        return res.json({item});
    } catch (e) {
        console.log(e);
        return next(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        await Item.delete(id);
        return res.json({ message: "deleted"});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;