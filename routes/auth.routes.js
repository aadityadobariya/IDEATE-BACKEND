const router = require("express").Router();
const passport = require("passport");
const controllers = require("../controllers/auth.controller.js");
const { ensureAuthenticated } = require("../middlewares/auth.middleware.js");

router.post("/register", controllers.registerUser);
router.post("/login", controllers.login);
router.get("/token", controllers.newToken);

module.exports = router;
