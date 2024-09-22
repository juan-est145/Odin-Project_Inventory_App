const queries = require("../db/queries");

//TO DO: Implement try/catch
function listGenres(query) {
	const result = query.map((value) => {
		return (`Genre: ${value.genre} ${value.hasOwnProperty("title")? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

async function getGenres(req, res) {
	const viewArgs = {
		action: "/genres",
		method: "/get",
		id: "genre",
		allRoute: "/genres/all",
		descText: "genres",
	};
	const reqParm = req.query.genre;
	const query = reqParm ? await queries.getGenre(reqParm) : null;
	
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
	const results = listGenres(query);
	res.render("getView", { 
		array: results.length !== 0 ? results : null,
		action: viewArgs.action,
		method: viewArgs.method,
		id: viewArgs.id,
		allRoute: viewArgs.allRoute,
		descText: viewArgs.descText,
	});
}

async function getAllGenres(req, res) {
	const query = await queries.getAllGenres();
	const results = listGenres(query);
	res.render("allView", { 
		array: results,
		route: "/genres",
		desc: "genres",
	});
}

module.exports = { getAllGenres, getGenres };