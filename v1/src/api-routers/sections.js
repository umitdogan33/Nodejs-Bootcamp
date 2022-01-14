const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Sections");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
// const {index,create} = require("../controllers/Sections");
 const {create,index,update,deleteSection} = require("../controllers/Sections");
const getLog = require("../middlewares/getLog");

router.
    route("/").
post(authenticeToken,validate(schemas.createValidation),create)
router.route("/:projectId").get(authenticeToken,index);
router.route("/:id",).patch(authenticeToken,validate(schemas.updateValidation),update);
router.route("/:id",).delete(authenticeToken,deleteSection);

module.exports =router;
