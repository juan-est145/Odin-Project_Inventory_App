const { Router } = require("express");
const gamesRouter = Router();
const gameControllers = require("../controllers/gamesControllers");

gamesRouter.get("/", gameControllers.getGames);
gamesRouter.get("/all", gameControllers.getAllGames);

module.exports = gamesRouter;