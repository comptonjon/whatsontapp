const express = require('express');
const morgan = require('morgan');
const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const venueRoutes = require('./routes/venueRoutes');
const itemRoutes = require('./routes/itemRoutes');
const draughtItemRoutes = require('./routes/draughtItemsRoutes');
const { ExpressError } = require('./expressError');

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/auth', authRoutes);
app.use('/users', userRoutes);
app.use('/venues', venueRoutes);
app.use('/items', itemRoutes);
app.use('/draughts', draughtItemRoutes);

app.use((req, res, next) => {
    return next(new ExpressError("Page not found", 404));
});

app.use((error, req, res, next) => {
    if (process.env.NODE_ENV !== "test") console.error(error.stack);
    const code = error.code || 500;
    const message = error.msg;
    return res.status(code).json({error : { message, code }});
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

