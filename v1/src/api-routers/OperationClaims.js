const express = require("express");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
const {create,index} = require("../controllers/OperationClaims");
const validate = require("../middlewares/validate");
router.
route("/").
post(create)

router.route("/",).get(authenticeToken,index);

module.exports =router;
