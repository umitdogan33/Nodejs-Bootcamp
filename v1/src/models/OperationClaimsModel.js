const Mongoose = require("mongoose");

const ProjectSchema = new Mongoose.Schema({
    name: String
},{timestamps:true,versionKey:false})

// ProjectSchema.pre("save",(next,doc)=>{
//     logger.log({
//         level:"info",
//         message : doc,
//     })
//     console.log("öncesi");
//     next();
// })
module.exports=Mongoose.model("operationClaim",ProjectSchema)
