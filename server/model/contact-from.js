const {Schema } = require("mongoose")
const { required } = require("../validators/auth-validator");
const { model } = require("mongoose");

const contactSchema = new Schema({
    username : {type : String , required : true},
    email : {type : String , required : true},
    message : {type : String , required : true}
});

const Contact = new model("contact" , contactSchema);
module.exports = Contact ;

