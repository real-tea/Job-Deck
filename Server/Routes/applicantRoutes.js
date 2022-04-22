const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

const Applicant = require("../models/Applicant");
const Application = require("../models/Application");
const JobPost = require("../models/JobPost");

router.post("/auth", async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, "easy_jobs_proj");
        const user = Applicant.findOne({ _id: decoded.id });
        return res.json({
            "tag": true,
            "message": "Authenticated user"
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            "tag": false,
            "message": "Not Atuhenticated Applicant"
        });
    }
})

router.post("/applicantdets", async (req, res) => {
    const id = req.body.id;
    let applicant = {};
    applicant = await Applicant.findOne({ _id: id });
    if (applicant) {
        return res.json({
            "message": applicant,
            "tag": true
        })
    }
    return res.json({
        "message": applicant,
        "tag": false
    })
})

router.post("/signup", async (req, res) => {

    let { applicant_email,
        applicant_password,
        applicant_name, applicant_experience,
        applicant_description } = req.body;

    const result = await Applicant.findOne({ applicant_email });

    if (result) {
        return res.json({ "message": "Applicant already exists", "tag": false })
    }
    else {
        var hash = bcrypt.hashSync(applicant_password, 8);
        applicant_password = hash;
        const applicant = new Applicant({
            applicant_email,
            applicant_password,
            applicant_name,
            applicant_experience,
            applicant_description
        })
        applicant.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "Applicant SignUp Success", tag: true })
        })
    }

})

router.post("/login", async (req, res) => {

    const obj = req.body;
    const result = await Applicant.findOne({ applicant_email: obj.applicant_email });
    if (result) {
        bcrypt.compare(req.body.applicant_password, result.applicant_password, function (err, hashed) {
            if (hashed === true) {
                const token = jwt.sign({ id: result._id }, 'easy_jobs_proj');
                return res.json({ "message": "Login success", "token": token, "tag": true })
            }
            else {
                return res.json({ "message": "Login failed", "tag": false })
            }
        });
    }
    else {
        return res.json({ "message": "Login failed", "tag": false })
    }

})

router.post("/getapplication", async (req, res) => {

    const objId = req.body.id;

    let applications = await Application.find({ application_applicant_id: objId });
    if (applications.length > 0) {

        let obj = [];
        let len = applications.length;

        for (let i = 0; i < len; i++) {
            let temp = await JobPost.findOne({ _id: applications[i].application_jobpost_id });
            obj.push(temp);
        }

        return res.json({ "tag": true, "message": obj });
    }
    return res.json({ "tag": false });

})

router.post("/jobpost/applications", async (req, res) => {

    let applications = await Application.find({ application_jobpost_id: req.body.application_jobpost_id });
    let arr = [];
    let len = applications.length;
    for (let i = 0; i < len; i++) {
        let temp = await Applicant.find({ _id: applications[i].application_applicant_id });
        arr.push(temp);
    }
    if (arr.length > 0) {
        return res.json({
            "message": arr,
            "tag": true
        })
    }
    return res.json({
        "message": "No applicant found",
        "tag": false
    })
})

router.post("/application", async (req, res) => {
    const { application_applicant_id,
        application_jobpost_id } = req.body;

    const application = new Application({
        application_applicant_id,
        application_jobpost_id
    })
    application.save(function (error, document) {
        if (error) {
            console.error(error)
            return res.json({ "message": "try again", "tag": false })
        }
        //console.log(document);
        return res.json({ "message": "Aplication Submitted successfully", tag: true })
    })

})

router.delete("/application", async (req, res) => {    
    const {jobpost_id,
        applicant_id}=req.body;
    Application.deleteOne({ application_applicant_id:applicant_id,
        application_jobpost_id:jobpost_id}, function (err) {
        if (err) {
            
            return res.json({ "message": "Some error occured try again", "tag": false })
        }
        else {
            return res.json({ "message": "Deleted", "tag": true })
        }
    });

})

module.exports = router;