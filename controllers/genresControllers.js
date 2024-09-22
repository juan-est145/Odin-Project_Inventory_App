const queries = require("../db/queries");

//TO DO: Implement try/catch
function listGenres(query) {
	const result = query.map((value) => {
		return (`Genre: ${value.genre}`);
	});
	return (result);
}

async function getAllGenres(req, res) {
	const query = await queries.getAllGenres();
	const results = listGenres(query);
	res.render("allGames", {array: results});
}

module.exports = { getAllGenres };