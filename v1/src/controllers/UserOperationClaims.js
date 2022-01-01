const {insert,list,listByUserId} = require("../services/UserOperationClaims");
const httpStatus = require("http-status");
const create = (req,res) =>{
    insert(req.body).then((response)=>{
        res.status(httpStatus.CREATED).send(response);
    }).
    catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
}

const index  = (req,res) => {
    list().then((response) => {
        res.status(httpStatus.OK).send(response);
    })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

const getByUserId = (id)  => (req,res) => {
    (listByUserId(id)).then((response) => {
        res.status(httpStatus.OK).send(response);
    })
        .catch((e) => {
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

module.exports ={
    create,
    index,
    listByUserId,
}