const { Router } = require("express");
const genresControllers = require("../controllers/genresControllers");

const genresRouter = Router();
genresRouter.get("/", genresControllers.getGenres);
genresRouter.get("/all", genresControllers.getAllGenres);
genresRouter.get("/new", genresControllers.getNewGenre);
genresRouter.post("/new", genresControllers.postNewGenre);

module.exports = genresRouter;