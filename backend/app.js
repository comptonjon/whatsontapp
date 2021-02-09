const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes')
const venueRoutes = require('./routes/venueRoutes')

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoutes);
app.use('/venues', venueRoutes);

app.get("/", (req, res) => {
    return res.send("connected");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

