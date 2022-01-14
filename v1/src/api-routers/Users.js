const express = require("express")
const {index, create,login,projectList,resetPassword,update,deleteUser,changePassword,updateProfileImage} = require("../controllers/Users");
const schemas = require("../validations/Users");
const validate = require("../middlewares/validate.js")
const logger = require("../scripts/logger/User.js")
const authenticeToken = require("../middlewares/authenticate")
const router = express.Router();

router.get("/",index);
// router.post("/",create);
router.route("/").post(validate(schemas.CreateValidation,logger),create)
router.route("/").patch(authenticeToken,update)
router.route("/login").post(validate(schemas.LoginValidation,logger),login)
router.route("/projects").get(authenticeToken,projectList)
router.route("/reset-password").post(resetPassword)
router.route("/change-password").post(authenticeToken,validate(schemas.ChangePasswordValidation),changePassword)
router.route("/update-profile-image").post(authenticeToken,updateProfileImage)
router.route("/:id").delete(authenticeToken,deleteUser)

module.exports=router;