const pool = require("./pool");

async function getAllGames() {
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
			FROM games INNER JOIN developers ON games.dev_id=developers.id;");
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getGame(game) {
	if (!game)
		return (null);
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name \
			FROM games INNER JOIN developers ON games.dev_id=developers.id\
				WHERE games.title ILIKE $1;", [`%${game}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function postGame(game) {
	if (!game)
		return (null);
	try {
		const { rows } = await pool.query("INSERT INTO games(title,release_date,dev_id) \
											VALUES($1, $2, (SELECT id FROM developers WHERE name=$3));", game);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getAllGenres() {
	try {
		const { rows } = await pool.query("SELECT * FROM genres");
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getGenre(genre) {
	if (!genre)
		return (null);
	try {
		const { rows } = await pool.query("SELECT games.title, genres.genre\
			FROM game_genre\
				INNER JOIN games ON games.id=game_genre.game_id\
				INNER JOIN genres ON genres.id=game_genre.genre_id\
			WHERE genres.genre ILIKE $1;", [`${genre}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function postGenre(genre) {
	if (!genre)
		return (null);
	try {
		const { rows } = await pool.query("INSERT INTO genres(genre) VALUES($1);", [genre]);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getAllDevs() {
	try {
		const { rows } = await pool.query("SELECT * FROM developers");
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function getDevs(devs) {
	if (!devs)
		return (null);
	try {
		const { rows } = await pool.query("SELECT games.id, games.title, games.release_date, developers.name\
			FROM games\
			INNER JOIN developers ON games.dev_id=developers.id\
			WHERE name ILIKE $1;", [`${devs}%`]);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

async function postDev(dev) {
	if (!dev)
		return (null);
	try {
		const { rows } = await pool.query("INSERT INTO developers(name) VALUES($1);", [dev]);
		return (rows);
	} catch (error) {
		console.error(error);
		throw error;
	}
}

module.exports = {
	getAllGames,
	getGame,
	postGame,
	getAllGenres,
	getGenre,
	postGenre,
	getAllDevs,
	getDevs,
	postDev,
};