const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Applicant = require('../Models/applicant');


router.post("/auth",async(req,res)=>{
    const token = req.body.token
    
})