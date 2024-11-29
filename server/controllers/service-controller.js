const Service = require("../model/service-model")


const services = async (req , res  ) => {
 try {
    const response = await Service.find();
    
    if (!response ){
        res.status(404).json({ msg : "no service found "})
        return  
        
    }
    return  res.status(200).json({msg : "Service found " , data : response })
    
 }
 catch (error) {
    console.log(`services : ${error}`)  
 }
}

module.exports = services ;