const User = require("../models/UserModel")
const BaseService = require("./BaseService");

class UserService extends BaseService{
    constructor() {
        super(User)
    }
    }
module.exports=UserService;