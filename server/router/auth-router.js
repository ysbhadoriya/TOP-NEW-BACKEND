const express = require("express");
const router =  express.Router();
const authController = require ("../controllers/auth-controller");
const validate = require("../middleware/validate-middleware")
const signUpSchema = require("../validators/auth-validator")
const authMiddleware = require("../middleware/auth-middleware")




router.route("/").get(authController.home);
router.route("/register").post(validate(signUpSchema) ,authController.register)
router.route("/login").post(authController.login)
router.route("/user").get(authMiddleware , authController.user)



module.exports = router