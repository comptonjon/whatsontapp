const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoutes')

const app = express();

app.use(morgan("dev"));
app.use('/users', userRoutes);

app.get("/", (req, res) => {
    return res.send("connected");
})

app.listen(3000, () => {
    console.log("Listening on port 3000");
})

