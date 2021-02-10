const express = require('express');
const router = express.Router();
const jsonschema = require('jsonschema');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { SECRET_WAT_KEY } = require('../config');
 
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
        const user = await User.register(req.body);
        const token = jwt.sign(user, SECRET_WAT_KEY);
        return res.json({user, token});
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