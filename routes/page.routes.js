const router = require("express").Router();
const controllers = require("../controllers/page.controller");

router.post("/", controllers.createPage);
router.get("/:id", controllers.getPage);
router.put("/:id", controllers.updatePage);
router.delete("/:id", controllers.deletePage);

module.exports = router;
