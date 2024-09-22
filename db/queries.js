const pool = require("./pool");

//TO DO: Implement try/catch

async function getAllGames() {
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
			FROM games INNER JOIN developers ON games.dev_id=developers.id;");
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function getGame(game) {
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
			FROM games INNER JOIN developers ON games.dev_id=developers.id\
				WHERE games.title ILIKE $1;", [`%${game}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
	}

}

async function getAllGenres() {
	try {
		const { rows } = await pool.query("SELECT * FROM GENRES");
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function getGenre(genre) {
	try {
		const { rows } = await pool.query("SELECT games.title, genres.genre\
			FROM game_genre\
				INNER JOIN games ON games.id=game_genre.game_id\
				INNER JOIN genres ON genres.id=game_genre.genre_id\
			WHERE genres.genre ILIKE $1;", [`${genre}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function getAllDevs() {
	try {
		const { rows } = await pool.query("SELECT * FROM developers");
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

async function getDevs(devs) {
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name\
			FROM games\
			INNER JOIN developers ON games.dev_id=developers.id\
			WHERE name ILIKE $1;", [`${devs}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
	}
}

module.exports = { getAllGames, getGame, getAllGenres, getGenre, getAllDevs, getDevs };