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

async function getAllGenres() {
	const { rows } = await pool.query("SELECT * FROM GENRES");
	return (rows);
}

async function getGenre(genre) {
	const { rows } = await pool.query("SELECT games.title, genres.genre\
										FROM game_genre\
											INNER JOIN games ON games.id=game_genre.game_id\
											INNER JOIN genres ON genres.id=game_genre.genre_id\
										WHERE genres.genre ILIKE $1;", [`${genre}%`]);
	return (rows);
}

module.exports = { getAllGames, getGame, getAllGenres, getGenre };