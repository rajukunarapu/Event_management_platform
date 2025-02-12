require('dotenv').config()
const connectDB = require('./config/db');
const app = require('./app');

connectDB();

modules.exports = app

app.listen(process.env.PORT, ()=>console.log(`Server running on ${process.env.PORT} port`))