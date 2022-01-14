const Project = require("../models/ProjectModel")


//!override yapılabiliyor
const insert = (projectData) =>{
    const projects = Project(projectData)
    return projects.save();
}

const  list  = (where) =>{
    return Project.find({where} || {})
    .populate({
        path: "user_id",
            select: "email full_name profil_image"
        })
}

const modify = (data,id) =>{
return Project.findByIdAndUpdate(id,data,{new: true});
}

const remove = (id)=>{
    return Project.findByIdAndDelete(id,{new:true})
}

module.exports={
    insert,
    list,
    modify,
    remove
}
