const express = require('express');
const router = express.Router();
const jsonschema = require('jsonschema');
const Venue = require('../models/Venue')

router.get('/', async (req, res, next) => {
    try {
        const venues = await Venue.get();
        return res.json({venues});
    } catch (e) {
        console.log("ERROR FETCHING")
    }
});

router.post('/', async (req, res, next) => {
    try {
        const venue = await Venue.create(req.body);
        return res.status(201).json({venue});
    } catch (e) {
        console.log(e);
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedVenue = await Venue.update(id, req.body);
        return res.json({venue: updatedVenue});
    } catch (e) {
        console.log(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await Venue.delete(id);
        return res.json(result)
    } catch (e) {
        console.log(e);
    }
});

module.exports = router;