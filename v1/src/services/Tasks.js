const Task = require("../models/TaskModel")
const BaseService = require("./BaseService");

class TaskService extends BaseService{
    constructor(){
        super(Task)
    }
list(where){
    return Task.find(where || {})
    .populate({
        path: "user_id",
            select: "email full_name profil_image"
        })
}
}
module.exports=TaskService;
