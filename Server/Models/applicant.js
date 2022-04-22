const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const Applicant = new Schema({
    applicant_email:String,
    applicant_password:String,
    applicant_name:String,
    applicant_experience:String,
    applicant_description:String
});


module.exports = mongoose.model('Applicants', Applicant); 