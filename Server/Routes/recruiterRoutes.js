const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
var bcrypt = require('bcryptjs');

const Recruiter = require("../models/Recruiter");
const JobPost = require("../models/JobPost");

router.post("/auth", async (req, res) => {
    const token = req.body.token;
    try {
        const decoded = jwt.verify(token, "easy_jobs_proj");
        const user = Recruiter.findOne({ _id: decoded.id });
        return res.json({
            "tag": true,
            "message": "Authenticated user"
        });
    }
    catch (error) {
        console.log(error);
        return res.json({
            "tag": false,
            "message": "Not Atuhenticated Recruiter"
        });
    }
})

router.post("/signup", async (req, res) => {

    let { recruiter_email,
        recruiter_password,
        recruiter_name } = req.body;

    const result = await Recruiter.findOne({ recruiter_email });

    if (result) {
        return res.json({ "message": "recruiter already exists", "tag": false })
    }
    else {
        var hash = bcrypt.hashSync(recruiter_password, 8);
        recruiter_password = hash;
        const recruiter = new Recruiter({
            recruiter_email,
            recruiter_password,
            recruiter_name
        })
        recruiter.save(function (error, document) {
            if (error) {
                console.error(error)
                return res.json({ "message": "try again", "tag": false })
            }
            //console.log(document);
            return res.json({ "message": "recruiter SignUp Success", tag: true })
        })
    }

})

router.post("/login", async (req, res) => {

    const obj = req.body;
    const result = await Recruiter.findOne({ recruiter_email: obj.recruiter_email });
    if (result) {
        bcrypt.compare(req.body.recruiter_password, result.recruiter_password, function (err, hashed) {
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

router.post("/getjobsposted", async (req, res) => {

    const objId = req.body.id;

    let jobsposted = await JobPost.find({ jobpost_recruiter_id: objId });
    if (jobsposted.length > 0) {

        let obj = jobsposted;

        return res.json({ "tag": true, "message": obj });
    }
    return res.json({ "tag": false });

})

router.get("/alljobposts", async (req, res) => {

    let jobsposted = await JobPost.find();
    if (jobsposted.length > 0) {
        let obj = jobsposted;
        return res.json({ "tag": true, "message": obj });
    }
    return res.json({ "tag": false, message: "No job posts" });
})

router.post("/jobpost", async (req, res) => {
    let {
        jobpost_recruiter_id,
        jobpost_type,
        jobpost_mode,
        jobpost_location,
        jobpost_company_name,
        jobpost_duration,
        jobpost_role,
        jobpost_pay,
        jobpost_job_description,
        jobpost_experience
    } = req.body;

    const jobpost = new JobPost({
        jobpost_recruiter_id,
        jobpost_type,
        jobpost_mode,
        jobpost_location,
        jobpost_company_name,
        jobpost_duration,
        jobpost_role,
        jobpost_pay,
        jobpost_job_description,
        jobpost_experience
    })
    jobpost.save(function (error, document) {
        if (error) {
            console.error(error)
            return res.json({ "message": "try again", "tag": false })
        }
        //console.log(document);
        return res.json({ "message": "Job posted successfully", tag: true })
    })
})

router.put("/jobpost", async (req, res) => {
    let {
        _id,
        jobpost_recruiter_id,
        jobpost_type,
        jobpost_mode,
        jobpost_location,
        jobpost_company_name,
        jobpost_duration,
        jobpost_role,
        jobpost_pay,
        jobpost_job_description,
        jobpost_experience
    } = req.body;

    const jobpost = await JobPost.findOne({ _id });


    jobpost.jobpost_recruiter_id = jobpost_recruiter_id;
    jobpost.jobpost_type = jobpost_type;
    jobpost.jobpost_mode = jobpost_mode;
    jobpost.jobpost_location = jobpost_location;
    jobpost.jobpost_company_name = jobpost_company_name;
    jobpost.jobpost_duration = jobpost_duration;
    jobpost.jobpost_role = jobpost_role;
    jobpost.jobpost_pay = jobpost_pay;
    jobpost.jobpost_job_description = jobpost_job_description;
    jobpost.jobpost_experience = jobpost_experience;


    jobpost.save(function (error, document) {
        if (error) {
            console.error(error)
            return res.json({ "message": "try again", "tag": false })
        }
        //console.log(document);
        return res.json({ "message": "Jop updated successfully", tag: true })
    })
})

router.delete("/jobpost", async (req, res) => {
    const { _id } = req.body;

    JobPost.deleteOne({ _id }, function (err) {
        if (err) {
            //console.log(err);
            return res.json({ "message": "Some error occured try again", "tag": false })
        }
        else {
            return res.json({ "message": "Deleted", "tag": true })
        }
    });
})

router.post("/recruiterdets", async (req, res) => {
    const id = req.body.id;
    let recruiter = {};
    recruiter = await Recruiter.findOne({ _id: id });
    if (recruiter) {
        return res.json({
            "message": recruiter,
            "tag": true
        })
    }
    return res.json({
        "message": recruiter,
        "tag": false
    })
})

module.exports = router;