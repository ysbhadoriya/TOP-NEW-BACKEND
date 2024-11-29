const mongoose = require('mongoose');
const jwt = require("jsonwebtoken")


// Define the schema for the User
const userSchema = new mongoose.Schema({
    username: { type: String, required: true },         
    email: { type: String, required: true },
    phone: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin : { type: Boolean,default: false}
});

userSchema.methods.comparePassword = async function (password) {
    return  bcrypt.compare(password, this.password);
} 


//jwt 
const SECRET = "SECRETKEYISHERE" ;
userSchema.methods.generateToken = async function() {
    try {
        const token =jwt.sign(
            {
                userId : this._id.toString(),
                email: this.email ,
                isAdmin : this.isAdmin
            } , 
            SECRET , 
            {
                expiresIn: "2d"
            }       
        ) ;

      
        return token

    } catch (error) {
        console.error(error)
    }
}

// Create the model from the schema
const User = mongoose.model('User', userSchema);

module.exports =  User ;