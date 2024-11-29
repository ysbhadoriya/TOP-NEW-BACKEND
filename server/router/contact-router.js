const express = require("express");
const Router = express.Router();
const contactFrom = require("../controllers/contact-controller");
const router = require("./auth-router");

router.route("/contact").post(contactFrom ) ;

module.exports = router ;