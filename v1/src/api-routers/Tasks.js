const express = require("express");
const validate = require("../middlewares/validate");
const schemas = require("../validations/Tasks");
const router = express.Router();
const authenticeToken = require("../middlewares/authenticate")
// const {index,create} = require("../controllers/Sections");
 const {create,index,update,deleteTask,makeComment,deleteComment,addSubTask,fetchTask} = require("../controllers/Tasks");

router.
    route("/").
post(authenticeToken,validate(schemas.createValidation),create)
router.route("/").get(authenticeToken,index);
router.route("/:id").patch(authenticeToken,validate(schemas.updateValidation),update);
router.route("/:id/make-comment").post(authenticeToken,validate(schemas.commentValidation),makeComment);
router.route("/:id/add-sub-task").post(authenticeToken,validate(schemas.createValidation),addSubTask);
router.route("/:taskId/:commentId").delete(authenticeToken,deleteComment);
router.route("/:id").get(authenticeToken,fetchTask);

module.exports =router;
