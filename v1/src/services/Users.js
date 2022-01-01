const User = require("../models/UserModel")

const insert = (projectData) =>{
    const projects = User(projectData)
    return projects.save();
}

const loginUser =  (loginData) => {
    return User.findOne(loginData);
}

const list = () => {
    return User.find({});
}

const modify = (where,data) =>{
    return User.findOneAndUpdate(where,data,{new:true})
}

module.exports={
    insert,
    list,
    loginUser,
    modify,
}