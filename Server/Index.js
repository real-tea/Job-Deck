const express = require("express");
const app = express();
// const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// API ROUTES
const applicantRoutes = require("./routes/applicantRoutes")
const recruiterRoutes = require("./routes/recruiterRoutes")

// DOTENV CONFIG
require('dotenv').config();

// ESSENTIAL MIDDLEWARES
app.use(cors());
app.use(express.json());

// DATABASE CONNECTION
mongoose.connect("mongodb+srv://Jon-deck:jaypeehacks@job-deck.dhnlj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Database connected.");
}).catch((err) => {
    console.log("Database error");
    console.log(err);
});


// APIS
app.use("/api/applicant", applicantRoutes);
app.use("/api/recruiter", recruiterRoutes);

const HOST = process.env.HOST || '0.0.0.0';
const PORT = process.env.PORT || 5000;


app.listen(PORT,HOST, () => {
    console.log("Server is running.");
});