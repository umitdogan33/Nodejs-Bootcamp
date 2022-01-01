const projectService = require("../services/Projects");
const {insert,list,loginUser,modify} = require("../services/Users");
const httpStatus = require("http-status");
const {passwordToHash, generateAccessToken, generateRefreshToken} = require("../scripts/utilities/helper");
const uuid = require("uuid")
const events = require("events")
const eventEmitter = require("../scripts/events/eventEmitter");
const nodemailer = require("nodemailer");
const create  = (req,res) =>{
    req.body.password = passwordToHash(req.body.password)
    insert(req.body).then((response)=>{
        res.status(httpStatus.CREATED).send(response)
    })
        .catch((e)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

const login = (req,res)=>{
    req.body.password = passwordToHash(req.body.password)
    loginUser(req.body).then((response)=>{
        if(!response) return res.status(httpStatus.NOT_FOUND).send({message:"Böyle Bir Kullanıcı Bulunamadı"})
        console.log("login_response",response)
        response = {
            ...response.toObject(),
            tokens:{
                access_token : generateAccessToken(response ),
                refresh_token : generateRefreshToken(response)
            },
        };
        delete response.password;

        res.status(httpStatus.OK).send(response)
    })
        .catch((e)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })
}

const index  = (req,res) =>{
    list().then((response)=>{
        res.status(httpStatus.OK).send(response);
    })
        .catch((e)=>{
            res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
        })

}

const projectList = (req,res)=>{
    projectService.list({user_id: req.user?._id}).then((response)=>{
        res.status(httpStatus.OK).send(response)
    }).catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e);
    })
}

const resetPassword = (req,res)=> {
    const new_password = uuid.v4()?.split("-")[0] || new Date().getTime();

    modify({email: req.body.email}, {password: passwordToHash(new_password)}).then((response) => {
        if (!response) {
            return res.status(httpStatus.NOT_FOUND).send({error: "böyle bir kullanıcı bulunmamaktadır"})
        }
        console.log("satır 65",req.body.email)
        eventEmitter.emit("send_email", {
            // from: response.email

            to: res.email,
            subject: "Şifre Sıfırlama", // Subject line
            html: `Şifre Sıfırlandı<br/>Yeni Şifre<br/><b>Şifre:${new_password}</b>`, // html body
        })
        console.log(response.email)
        res.status(httpStatus.OK).send("isteğiniz üzerine sıfırlama işlemi oluşmuştur epastaya bak");

    }).catch((e)=>{
        res.status(httpStatus.INTERNAL_SERVER_ERROR).send(e)
    })
}

module.exports ={
    create,
    index,
    login,
    projectList,
    resetPassword
}