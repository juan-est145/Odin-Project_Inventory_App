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
		array: [],
		action: "/genres",
		method: "/get",
		id: "genre",
		allRoute: "/genres/all",
		descText: "genres",
	};
	const reqParm = req.query.genre;
	const query = reqParm ? await queries.getGenre(reqParm) : null;
	
	if (query) {
		const results = listGenres(query);
		viewArgs.array = results.length !== 0 ? results : null;
	}		
	res.render("getView", viewArgs);
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