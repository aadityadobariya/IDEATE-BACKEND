const router = require("express").Router();
const controllers = require("../controllers/page.controller");
const isAuthorized = require("../middlewares/auth.middleware.js");

router.post("/", isAuthorized, controllers.createPage);
router.get("/:pageId", isAuthorized, controllers.getPageById);
router.get("/", isAuthorized, controllers.getAllPages);
router.put("/:id", isAuthorized, controllers.updatePage);
router.delete("/:id", isAuthorized, controllers.deletePage);

module.exports = router;
