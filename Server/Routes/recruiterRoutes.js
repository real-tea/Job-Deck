const express = require("express"); //
const router = express.Router();

const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt");

const Recruiter = require("../Models/Recruiter");
const JobPost = require("../Models/JobPost")

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

    let { Email, 
          Password,
          Name} = req.body;

    const result = await Recruiter.findOne({ Email });

    if (result) {
        return res.json({ "message": "recruiter already exists", "tag": false })
    }
    else {
        var hash = bcrypt.hashSync(Password, 8);
        Password = hash;
        const recruiter = new Recruiter({
            Name,
            Email,
            Password
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
    const result = await Recruiter.findOne({ Email: obj.Email });
    if (result) {
        bcrypt.compare(req.body.recruiter_password, result.recruiter_password, function (err, hashed) {
            if (hashed === true) {
                const token = jwt.sign({ _id: result._id }, 'easy_jobs_proj');
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

    let jobsposted = await JobPost.find({ recruiter_id: objId });
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
        recruiter_id,
        type,
        mode,
        location,
        company_name,
        duration,
        role,
        pay,
        job_description,
        experience
    } = req.body;

    const jobpost = new JobPost({
        recruiter_id,
        type,
        mode,
        location,
        company_name,
        duration,
        role,
        pay,
        job_description,
        experience
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
        recruiter_id,
        type,
        mode,
        location,
        company_name,
        duration,
        role,
        pay,
        job_description,
        experience
    } = req.body;


    const jobpost = await JobPost.findOne({ _id });

    jobpost.recruiter_id = recruiter_id;
    jobpost.type = type;
    jobpost.mode = mode;
    jobpost.location = location;
    jobpost.company_name = company_name;
    jobpost.duration = duration;
    jobpost.role = role;
    jobpost.pay = pay;
    jobpost.job_description = job_description;
    jobpost.experience = experience;

    jobpost.save(function(error , document){
        if(error){
            console.log(error);
            return res.json({
                "message" : err,
                "tag" : false
            })
        }
        console.log(document);
        return res.json({
            "message" : "job updated succesfully",
            "tag" : tue
        })
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