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
	const reqParm = req.query.game;
	const query = reqParm? await queries.getGame(reqParm) : null;
	if (query === null) {
		res.render("games", { array: [] });
		return;
	}
	const results = listGames(query);
	res.render("games", { array: results.length !== 0? results : null });
}

async function getAllGames(req, res) {
	const query = await queries.getAllGames();
	const results = listGames(query);
	res.render("allGames", {array: results});
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