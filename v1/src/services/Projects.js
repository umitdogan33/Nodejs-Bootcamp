const Project = require("../models/ProjectModel")

const insert = (projectData) =>{
    const projects = Project(projectData)
    return projects.save();
}

const list = () =>{
    return Project.find({});
}
module.exports={
    insert,
    list,
}