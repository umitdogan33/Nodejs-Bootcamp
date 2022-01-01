const UserOperationClaim = require("../models/UserOperationClaimsModel")
const insert = (data) =>{
    const userOperationClaim = UserOperationClaim(data);
    return userOperationClaim.save();
}

const list = () =>{
    return UserOperationClaim.find({});
}

const listByUserId = (filter) =>{
    return UserOperationClaim.find({operationClaimsId:filter});
}

module.exports={
    insert,
    list,
    listByUserId,
}