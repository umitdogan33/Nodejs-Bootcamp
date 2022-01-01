const OperationClaim =require("../models/OperationClaimsModel")
const insert = (ClaimData) =>{
    const operationClaim = OperationClaim(ClaimData);
   return operationClaim.save();
}

const list = () =>{
    return OperationClaim.find({});
}

module.exports={
    insert,
    list,
}
