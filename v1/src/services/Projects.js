const Project = require("../models/ProjectModel")

const insert = (projectData) =>{
    const projects = Project(projectData)
    return projects.save();
}

const  list  = (where) =>{
    return Project.find({where} || {})
    .populate({
        path: "user_id",
            select: "email full_name"
        })
}

const modify = (data,id) =>{
return Project.findByIdAndUpdate(id,data,{new: true});
}

module.exports={
    insert,
    list,
    modify
}
