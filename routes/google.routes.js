const router = require("express").Router();
const passport = require("passport");
const controllers = require("../controllers/auth.controller.js");

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: false }),
  controllers.googleAuth
);

module.exports = router;
