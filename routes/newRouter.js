const { Router } = require("express");
const newControllers = require("../controllers/newController");

const newRouter = Router();
newRouter.get("/", newControllers.getNew);
newRouter.post("/", newControllers.postNew);

module.exports = newRouter;