const Task = require("../models/TaskModel")

const findOne = (where) =>{
    return Task.findOne(where);
}

const insert = (sectionData) =>{
    const task = Task(sectionData)
    return task.save();
}

const  list  = (where) =>{
    return Task.find(where || {})
    .populate({
        path: "user_id",
            select: "email full_name profil_image"
        })
}

const modify = (data,id) =>{
return Task.findByIdAndUpdate(id,data,{new: true});
}

const remove = (id)=>{
    return Task.findByIdAndDelete(id,{new:true})
}

module.exports={
    insert,
    list,
    modify,
    remove,
    findOne
}
