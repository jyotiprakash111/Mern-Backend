
require('dotenv').config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require('cookie-parser');
const cors = require("cors");

// My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");

{/* Db Connection*/ }
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
}).then(() => {
    console.log("DB CONNETED")
})
// .catch(console.log("Db Got Opps"))

{/*Middlewares*/ }
// app.use(bodyParser.json({ type: 'application/*+json' })) Updated One
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

{/* Routes */ }
app.use("/api", authRoutes);
app.use("/api", userRoutes);

{/*Port*/ }
const port = process.env.PORT || 8000;

{/**Starting As Server */ }
app.listen(port, () => {
    console.log(`This App is Running on ${port}`)
})