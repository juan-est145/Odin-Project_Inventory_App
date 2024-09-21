const pool = require("./pool");

//TO DO: Implement try/catch

async function getAllGames() {
	const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
										FROM games INNER JOIN developers ON games.dev_id=developers.id;");
	return (rows);
}

async function getGame(game) {
	const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
										FROM games INNER JOIN developers ON games.dev_id=developers.id\
											WHERE games.title ILIKE $1;", [`%${game}%`]);
	return (rows);
}

module.exports = { getAllGames, getGame };