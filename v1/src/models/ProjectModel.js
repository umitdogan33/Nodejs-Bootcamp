const Mongoose = require("mongoose");
const logger = require("../scripts/logger/Project");

const ProjectSchema = new Mongoose.Schema({
    name: String,
    user_id:{
        type:Mongoose.Types.ObjectId,
        ref:"users"
    }
},{timestamps:true,versionKey:false})

// ProjectSchema.pre("save",(next,doc)=>{
//     logger.log({
//         level:"info",
//         message : doc,
//     })
//     console.log("öncesi");
//     next();
// })

ProjectSchema.post("save",(object)=>{
    logger.log({
        level:"info",
        message : object,
    })
    console.log("sonrası");
})
// ProjectSchema.get("save",(object)=>{
//     // console.log("sonrası",object);
//     logger.log({
//         level:"info",
//         message : object,
//     })
// })
module.exports=Mongoose.model("project",ProjectSchema)
