const queries = require("../db/queries");

//TO DO: Implement try/catch
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

async function getGames(req, res) {
	const viewArgs = {
		array: [],
		action: "/games",
		method: "/get",
		id: "game",
		allRoute: "/games/all",
		descText: "games",
	};
	const reqParm = req.query.game;
	const query = reqParm ? await queries.getGame(reqParm) : null;

	if (query) {
		const results = listGames(query);
		viewArgs.array = results.length !== 0 ? results : null;
	}
	res.render("getView", viewArgs);
}

async function getAllGames(req, res) {
	try {
		const query = await queries.getAllGames();
		const results = listGames(query);
		res.render("allView", {
			array: results,
			route: "/games",
			desc: "games"
		});
	} catch (error) {
		res.send("uwu, We make a fucky wucky");
	}

}

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

module.exports = { getGames, getAllGames };