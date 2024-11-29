const {z} = require ("zod");

const  signUpSchema = z.object({
    username:z .string({required_error : "Name is required  "})
                .trim()
                .min(3,{message : "name must be at least of 3 chars."})
                .max(255 , {message : "name must not more than 255 chars."}) ,

                email:z .string({required_error : "email is required  "})
                .trim()
                .email({message:"invaild email address "})
                .min(3,{message : "name must be at least of 3 chars."})
                .max(255 , {message : "name must not more than 255 chars."}) ,

                phone:z .string({required_error : "phone number is required  "})
                .trim() 
                .min(10 , {message : " phone number must be 10 digit "})
                .max(10 , {message : "phone number must 10 digit "}) ,


                password :z .string({required_error : "password is required  "})
                .min(8,{message : "name must be at least of 8 chars."})
                .max(255 , {message : "name must not more than 255 chars."})         

})

module.exports = signUpSchema ;