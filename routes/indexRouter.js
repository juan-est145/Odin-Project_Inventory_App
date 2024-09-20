const { Router } = require("express");
const indexControllers = require("../controllers/indexControllers");

const indexRouter = Router();
indexRouter.get("/", indexControllers.getIndex);

module.exports = indexRouter;