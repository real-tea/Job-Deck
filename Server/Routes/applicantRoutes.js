const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const Applicant = require('../Models/applicant');
const Application = require('../Models/Application');

router.post("/auth",async(req,res)=>{
    const token = req.body.token
    try{
        const decode = jwt.verify(token,"easy_jobs_proj");
        const user = Applicant.findOne({_id : decode.id});
        return res.json({
        "tag" : true,
        "message" : "User Authenticated"
        });
        
    }
    catch(err){
        // console.log(err);
        return res.json({
            "tag" : false,
            "message" : err
        })
    }
})


router.post("/applicantdets",async(req , res)=>{
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


router.post("/signup" , async (req,res)=>{
    let {
        email,
        Password,
        Name,
        Experience,
        description
    } = req.body;

    const result = await Applicant.findOne({ email });
    if(result){
        return req.json({ "message" : "Applicant already exists", "tag" : false})
    }

    else{
        var hash = bcrypt.hashSync(Password , 8);
        Password = hash;
        const applicant = new Applicant({
            email,
            Password,
            Name,
            Experience,
            description
        })
        applicant.save(function(error , document){
            if(error){
                return res.json({
                    "message" : error,
                    "tag" : false
                }) 
            }
                return res.json({"message" : "Applicant Signed Up",
                                 "tag" : true})
            

        })
    }
})

router.post("/login", async (req, res) => {

    const obj = req.body;
    const result = await Applicant.findOne({ email: obj.email });
    if (result) {
        bcrypt.compare(req.body.Password, result.Password, function (err, hashed) {
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




router.post("/getapplication", async (req, res) => {

    const objId = req.body.id;

    let applications = await Application.find({ applicant_id: objId });
    if (applications.length > 0) {

        let obj = [];
        let len = applications.length;

        for (let i = 0; i < len; i++) {
            let temp = await JobPost.findOne({ _id: applications[i].jobpost_id });
            obj.push(temp);
        }

        return res.json({ "tag": true, "message": obj });
    }
    return res.json({ "tag": false });

})


router.post("/jobpost/applications", async (req, res) => {

    let applications = await Application.find({ jobpost_id: req.body.jobpost_id });
    let arr = [];
    let len = applications.length;
    for (let i = 0; i < len; i++) {
        let temp = await Applicant.find({ _id: applications[i].applicant_id });
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
    const { applicant_id,
        jobpost_id } = req.body;

    const application = new Application({
        applicant_id,
        jobpost_id
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
    Application.deleteOne({ applicant_id:applicant_id,
        jobpost_id:jobpost_id}, function (err) {
        if (err) {
            
            return res.json({ "message": "Some error occured try again", "tag": false })
        }
        else {
            return res.json({ "message": "Deleted", "tag": true })
        }
    });

})

module.exports = router;