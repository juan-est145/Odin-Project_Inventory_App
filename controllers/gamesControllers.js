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
		action: "/games",
		method: "/get",
		id: "game",
		allRoute: "/games/all",
		descText: "games",
	};
	const reqParm = req.query.game;
	const query = reqParm ? await queries.getGame(reqParm) : null;
	
	if (query === null) {
		res.render("getView", { 
			array: [],
			action: viewArgs.action,
			method: viewArgs.method,
			id: viewArgs.id,
			allRoute: viewArgs.allRoute,
			descText: viewArgs.descText,
		});
		return;
	}
	const results = listGames(query);	
	res.render("getView", { 
		array: results.length !== 0 ? results : null,
		action: viewArgs.action,
		method: viewArgs.method,
		id: viewArgs.id,
		allRoute: viewArgs.allRoute,
		descText: viewArgs.descText,
	});
}

async function getAllGames(req, res) {
	const query = await queries.getAllGames();
	const results = listGames(query);
	res.render("allView", { 
		array: results,
		route: "/games",
		desc: "games" 
	});
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