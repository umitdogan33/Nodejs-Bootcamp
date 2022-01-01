//validation
//validate middleware
const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Projects");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
const {create,index,update} = require("../controllers/Projects");
const getLog = require("../middlewares/getLog");
const logger = require("../scripts/logger/Project");
// getLog(logger);
router.
    route("/").
post(authenticeToken,validate(schemas.createValidation,logger),create)

router.route("/",).get(authenticeToken,index);
router.route("/:id",).patch(authenticeToken,validate(schemas.updateValidation),update);

module.exports =router;
