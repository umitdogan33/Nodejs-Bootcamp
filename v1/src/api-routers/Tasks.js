const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Tasks");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
// const {index,create} = require("../controllers/Sections");
 const TaskController = require("../controllers/Tasks");

router.
    route("/").
post(authenticeToken,validate(schemas.createValidation),TaskController.create)
router.route("/").get(authenticeToken,TaskController.index);
router.route("/:id").patch(authenticeToken,validate(schemas.updateValidation),TaskController.update);
router.route("/:id/make-comment").post(authenticeToken,validate(schemas.commentValidation),TaskController.makeComment);
router.route("/:id/add-sub-task").post(authenticeToken,validate(schemas.createValidation),TaskController.addSubTask);
router.route("/:taskId/:commentId").delete(authenticeToken,TaskController.deleteComment);
router.route("/:id").get(authenticeToken,TaskController.fetchTask);

module.exports =router;
