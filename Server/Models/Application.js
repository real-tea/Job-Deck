const mongoose = require("mongoose");
const schema = mongoose.Schema

const Application = new schema({
    applicant_id : String,
    jobpost_id : String
});

module.exports = mongoose.model("Applications" , Application)