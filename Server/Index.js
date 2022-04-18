const express = require('express')

const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

require('dotenv')

const port = 8080

const DB = process.env.DATABASE;

//connection to db:

mongoose.connect(DB,{useNewUrlParser : true , useUnifiedTopology : true}).then(()=>{
    console.log("Database Connected")
}).catch((err)=>{
    console.log("Database Connected")
    console.log(err);
})

const applicantRoutes = require("./Routes/applicantRoutes");
const recruiterRoutes = require("./Routes/recruiterRoutes");


app.use("/api/applicant",applicantRoutes);
app.use("/api/recruiter",recruiterRoutes);

app.listen(8080, ()=>{
    console.log("Server running");
})