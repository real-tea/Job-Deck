const mongoose=require('mongoose');
const Schema = mongoose.Schema;

const Application = new Schema({
    application_applicant_id:String,
    application_jobpost_id:String
});


module.exports = mongoose.model('Applications', Application); 