const mongoose = require("mongoose");
const schema = mongoose.Schema

const Application = new schema({
    applicantid : String,
    applicant_jobpostid : String
});

module.exports = mongoose.model("Applications" , Application)