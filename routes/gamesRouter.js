const { Router } = require("express");
const gamesRouter = Router();
const gameControllers = require("../controllers/gamesControllers");

gamesRouter.get("/", gameControllers.getGames);
gamesRouter.get("/all", gameControllers.getAllGames);
gamesRouter.get("/new", gameControllers.getNewGame);

module.exports = gamesRouter;