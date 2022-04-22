const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const JobPost = new Schema({
    jobpost_recruiter_id:String,
    jobpost_type:String,
    jobpost_mode:String,
    jobpost_location:String,
    jobpost_company_name:String,
    jobpost_duration:String,
    jobpost_role:String,
    jobpost_pay:String,
    jobpost_job_description:String,
    jobpost_experience:String
});


module.exports = mongoose.model('JobPosts', JobPost); 