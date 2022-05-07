//validation
//validate middleware
const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Projects");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
const idChecker = require("../middlewares/idChecker");
const authorize = require("../middlewares/authorization");
// const {create,index,update,deleteProject} = require("../controllers/Projects");
const ProjectController = require("../controllers/Projects");
const logger = require("../scripts/logger/Project");
router.
    route("/").
post(authenticeToken,validate(schemas.createValidation,logger),ProjectController.create);

router.route("/",).get(authenticeToken,authorize(["admin"]),ProjectController.index);
router.route("/:id",).patch(idChecker("id"),authenticeToken,validate(schemas.updateValidation),ProjectController.update);
router.route("/:id",).delete(authenticeToken,idChecker(),ProjectController.deleteProject);

module.exports =router;
