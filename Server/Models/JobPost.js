const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const JobPost = new Schema({
    recruiter_id : {
        type :String ,
        required : true
    },
    type : {
        type :String ,
        required : true
    },   
    mode : {
        type :String ,
        required : true
    },
    location : {
        type :String ,
        required : true
    },    
    company_name : {
        type :String ,
        required : true
    },
    duration : {
        type :String ,
        required : true
    },
    role : {
        type :String ,
        required : true
    },
    pay : {
        type :String ,
        required : true
    },
    description : {
        type :String ,
        required : true
    },
    experience : {
        type :String ,
        required : true
    },
});

module.exports = mongoose.model('JobPost',JobPost);