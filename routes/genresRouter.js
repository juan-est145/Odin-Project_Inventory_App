const { Router } = require("express");
const genresControllers = require("../controllers/genresControllers");

const genresRouter = Router();
genresRouter.get("/", genresControllers.getAllGenres);

module.exports = genresRouter;