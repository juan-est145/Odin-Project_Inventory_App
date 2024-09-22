const queries = require("../db/queries");

function listGames(query) {
	const results = query.map((value) => {
		const date = new Date(value.release_date).toLocaleDateString("en-US", {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		return (`Title: ${value.title} | Developer: ${value.name} | Release date: ${date}`);
	});
	return (results);
}

async function getGames(req, res, next) {
	const viewArgs = {
		array: [],
		action: "/games",
		method: "/get",
		id: "game",
		allRoute: "/games/all",
		descText: "games",
	};
	try {
		const reqParm = req.query.game;
		const query = reqParm ? await queries.getGame(reqParm) : null;
		
		if (query) {
			const results = listGames(query);
			viewArgs.array = results.length !== 0 ? results : null;
		}
		res.render("getView", viewArgs);
	} catch (error) {
		next(error);
	}
}

async function getAllGames(req, res, next) {
	try {
		const query = await queries.getAllGames();
		const results = listGames(query);
		res.render("allView", {
			array: results,
			route: "/games",
			desc: "games"
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { getGames, getAllGames };