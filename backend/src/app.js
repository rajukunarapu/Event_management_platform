const express = require("express");
const authRoutes = require("./routes/authRoutes");
const userRoutes = require('./routes/userRoutes')
const cors = require("cors");
// const cookieparser = require('cookie-parser')

const app = express();

// app.use(cookieparser())
app.use(express.json());

const corsConfig = {
    orgin : `${process.env.FRONTEND_URL}`,
    credentials: true,
    methods : ["GET", "POST", "PUT", "DELETE"]
};

app.options("",cors(corsConfig))

app.use(cors(corsConfig));

app.use('/auth', authRoutes);
app.use('/user',userRoutes);

module.exports = app;
