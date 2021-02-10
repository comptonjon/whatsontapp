const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { ExpressError } = require('../expressError');
const { SECRET_WAT_KEY } = require('../config');


router.post('/register', async (req, res, next) => {
    try {
        const user = await User.register(req.body);
        const token = jwt.sign(user, SECRET_WAT_KEY);
        return res.json({user, token});
    } catch (e) {
        return next(e);
    }
});

router.post('/signin', async (req, res, next) => {
    try {
        const user = await User.authenticate(req.body);
        if (!user) {
            throw new ExpressError("User not found", 404);
        }
        const token = jwt.sign(user, SECRET_WAT_KEY);
        return res.json({user, token});
    } catch (e) {
        return next(e);
    }
});

module.exports = router;