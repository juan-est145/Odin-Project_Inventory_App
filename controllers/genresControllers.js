const queries = require("../db/queries");

function listGenres(query) {
	const result = query.map((value) => {
		return (`Genre: ${value.genre} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

async function getGenres(req, res, next) {
	const viewArgs = {
		array: [],
		action: "/genres",
		method: "/get",
		id: "genre",
		allRoute: "/genres/all",
		descText: "genres",
	};
	try {
		const reqParm = req.query.genre;
		const query = reqParm ? await queries.getGenre(reqParm) : null;

		if (query) {
			const results = listGenres(query);
			viewArgs.array = results.length !== 0 ? results : null;
		}
		res.render("getView", viewArgs);
	} catch (error) {
		next(error);
	}
}

async function getAllGenres(req, res, next) {
	try {
		const query = await queries.getAllGenres();
		const results = listGenres(query);
		res.render("allView", {
			array: results,
			route: "/genres",
			desc: "genres",
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { getAllGenres, getGenres };