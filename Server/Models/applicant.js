const mongoose = require('mongoose'); //
const schema = mongoose.Schema;


const Applicant = new schema({
    Name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true
    },
    Password : {
        type : String,
        required : true
    },
    Experience : {
        type : String,
        required : true
    },
    description : {
        type : String,
        required : true
    },

});

module.exports = mongoose.model("Applicant" , Applicant);