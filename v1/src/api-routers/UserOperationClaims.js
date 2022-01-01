const express = require("express");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
const {create,index,listByUserId} = require("../controllers/UserOperationClaims");
const validate = require("../middlewares/validate");
router.
route("/").
post(create)

router.route("/",).get(index);
router.route("/listByUserId",).get(listByUserId);

module.exports =router;
