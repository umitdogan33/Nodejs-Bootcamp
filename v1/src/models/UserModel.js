const Mongoose = require("mongoose");

const UserSchema = new Mongoose.Schema({
    full_name:String,
    password:String,
    email: String,
    profil_image:String,
    roles: [String],
},{timestamps:true,versionKey:false})

// ProjectSchema.pre("save",(next,doc)=>{
//     logger.log({
//         level:"info",
//         message : doc,
//     })
//     console.log("öncesi");
//     next();
// })

module.exports=Mongoose.model("users",UserSchema)
