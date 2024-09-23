const { Router } = require("express");
const devControllers = require("../controllers/devsControllers");

const devRouter = Router();
devRouter.get("/", devControllers.getDevs);
devRouter.get("/all", devControllers.getAllDevs);
devRouter.get("/new", devControllers.getNewDev);
devRouter.post("/new", devControllers.postNewDev);

module.exports = devRouter;