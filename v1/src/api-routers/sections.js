const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Sections");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
//  const {create,index,update,deleteSection} = require("../controllers/Sections");
 const Section = require("../controllers/Sections");
 const SectionController = new Section();
const getLog = require("../middlewares/getLog");

router.
    route("/").
post(authenticeToken,validate(schemas.createValidation),SectionController.create)
router.route("/:projectId").get(authenticeToken,SectionController.index);
router.route("/:id",).patch(authenticeToken,validate(schemas.updateValidation),SectionController.update);
router.route("/:id",).delete(authenticeToken,SectionController.deleteSection);

module.exports =router;
