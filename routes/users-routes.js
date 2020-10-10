const express = require("express");
const { check } = require("express-validator");

const UserController = require("../controllers/users-controllers");
const fileUpload = require("../middleware/file-upload");

const router = express.Router();

router.get("/", UserController.getUsers);

router.get("/:uid", UserController.getUserById);

router.post("/resetPassword", UserController.resetPassword);

router.post(
  "/updatePassword",
  check("password").isLength({ min: 6 }),
  UserController.updatePassword
);

router.post(
  "/signup",
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(), //normalizeEmail checking if it is an email
    check("password").isLength({ min: 6 }),
  ],
  UserController.signup
);

router.patch(
  "/:uid",
  fileUpload.single("image"),
  [
    check("firstName").not().isEmpty(),
    check("lastName").not().isEmpty(),
    check("email").normalizeEmail().isEmail(),
  ],
  UserController.updateUserInfo
);

router.post("/login", UserController.login);

module.exports = router;
