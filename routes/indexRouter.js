const { Router } = require("express");
const indexController = require("../controllers/indexControllers");

const indexRouter = Router();
indexRouter.get("/", indexController.getIndex);

module.exports = indexRouter;