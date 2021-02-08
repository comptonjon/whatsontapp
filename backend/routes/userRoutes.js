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

module.exports = router;