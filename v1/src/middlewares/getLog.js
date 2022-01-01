const httpStatus = require("http-status");
const express = require("express");
const router = express.Router();
const logger = require("../scripts/logger/server");


const getLog= ()  => (req,res,next) => {
    if(req.method=='GET'){
        logger.info(req.originalUrl);
    } 
    next();
}

module.exports = getLog;