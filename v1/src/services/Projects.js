const Project = require("../models/ProjectModel")
const BaseService = require("./BaseService");
class ProjectService extends BaseService{
    constructor(){
        super(Project);
    }

list(where) {
    return Project.find({where} || {})
    .populate({
        path: "user_id",
            select: "email full_name profil_image"
        })
}
}
module.exports=ProjectService;
