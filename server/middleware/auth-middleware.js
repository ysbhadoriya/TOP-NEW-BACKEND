const jwt = require ("jsonwebtoken") ;
const User = require("../model/user-model")

const authMiddleware = async(req , res , next ) => {
const token = req.header('Authorization');
const SECRET = "SECRETKEYISHERE" ;
if(!token){
    return res
    .status(401)
    .json({message: 'unauthorized HTTP , Token not provided'});
}
// console.log("token from auth middleware ", token );

const jwtToken = token.replace("Bearer" , "").trim()
console.log("token from auth middleware" , jwtToken );

try {

 const isVerified = jwt.verify(jwtToken , SECRET )
//  console.log(isVerified);
 
 const userData = await User.findOne ({ email :isVerified.email  }).select({
    password : 0 
}

)
console.log(userData);
 
    req.user = userData;
    req.token = token; 
    req.userID = userData._id ;

   next() 
} catch (error) {
    return res.status(401).json({ message : "unauthorized . Invalid token "})
}
}

module.exports = authMiddleware ;