const express = require('express');
const router = express.Router();
const User = require('../models/User')

router.get('/', async (req, res, next) => {
    try {
        const users = await User.get();
        return res.json({users});
    } catch (e) {
        console.log("ERROR FETCHING")
    }
});

router.post('/', async (req, res, next) => {
    try {
        const user = await User.create(req.body);
        return res.json({user});
    } catch (e) {
        
    }
});

router.patch('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const updatedUser = await User.update(id, req.body);
        return res.send(updatedUser);
    } catch (e) {
        console.log(e);
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await User.delete(id);
        return res.json(result)
    } catch (e) {
        console.log(e);
        console.log("foober")
    }
});

module.exports = router;