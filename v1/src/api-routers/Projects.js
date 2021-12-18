//validation
//validate middleware
const express = require("express");
const router = express.Router();
const {create,index} = require("../controllers/Projects");
router.post("/",create)
router.get("/",index)

module.exports = {router}
