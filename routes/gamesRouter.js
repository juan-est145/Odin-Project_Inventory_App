const { Router } = require("express");
const gamesRouter = Router();
const gameControllers = require("../controllers/gamesControllers");

gamesRouter.get("/", gameControllers.getGames);

module.exports = gamesRouter;