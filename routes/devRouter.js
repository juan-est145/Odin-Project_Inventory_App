const { Router } = require("express");
const devControllers = require("../controllers/devsControllers");

const devRouter = Router();
devRouter.get("/", devControllers.getDevs);
devRouter.get("/all", devControllers.getAllDevs);

module.exports = devRouter;