const queries = require("../db/queries");

//TO DO: Implement try/catch

async function getGames(req, res) {
	const query = await queries.getAllGames();
	const results = query.map((value) => {
		const date = new Date(value.release_date).toLocaleDateString("en-US", {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
		return (`Title: ${value.title} | Developer: ${value.name} | Release date: ${date}`);
	});
	res.render("games", { array: results });
}

module.exports = { getGames };