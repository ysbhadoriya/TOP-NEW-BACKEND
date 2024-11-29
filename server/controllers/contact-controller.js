const   Contact = require("../model/contact-from")

const contactFrom = async( req , res ) => {
    try {
        const response = req.body ;
        await Contact.create(response) ;
        return res.status(200).json("message sent successfully")
    } catch (err) {
        res.status(500).json("message not deliverd")

    }
}
module.exports = contactFrom     