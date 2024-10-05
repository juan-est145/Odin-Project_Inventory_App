const { options } = require("pg/lib/defaults");
const queries = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";
const validateGet = [
	query("game").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
];
const validatePost = [
	body("newGame").trim()
		.isLength({ min: 1, max: 255 }).withMessage(`Game title length ${lengthErr}`),
	body("date").trim()
		.notEmpty().withMessage("Date cannot be empty")
		.isDate().withMessage("Please enter a valid date"),
	body("password").trim()
	.notEmpty().equals(process.env.HTTP_PASSWORD).withMessage("Incorrect password"),
	body("devsList").trim()
		.exists({ values: "falsy" }).withMessage("Select a dev")
		.isLength({ min: 1, max: 255 }).withMessage(`Dev name length ${lengthErr}`)
		.custom(async (value) => {
			const devs = await queries.getAllDevs();
			const devNames = devs.map(dev => dev.name);
			if (!devNames.includes(value))
				throw new Error("Dev not present in database");
			return (true);
		}),
	body("genres").trim()
		.exists({ values: "falsy" }).withMessage("Select at least one genre")
		.isLength({ min: 1, max: 255 }).withMessage(`Genre length ${lengthErr}`)
		.custom(async (value, { req }) => {
			const genres = await queries.getAllGenres();
			const genresName = genres.map(genre => genre.genre);
			const genresList = Array.isArray(req.body.genres)? req.body.genres : Array(req.body.genres);
			const allGenresValid = genresList.every(genre => genresName.includes(genre));
			if (!allGenresValid)
				throw new Error("One or more genres are not present in the database");
			return (true);
		}),
];

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

const getGames = [
	validateGet,
	async function get(req, res, next) {
		const viewArgs = {
			array: [],
			action: "/games",
			method: "/get",
			id: "game",
			allRoute: "/games/all",
			descText: "games",
			errors: null,
		};
		try {
			const reqParm = req.query.game;
			if (reqParm) {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					viewArgs.errors = errors.array();
					return res.status(400).render("getView", viewArgs);
				}
			}
			const query = await queries.getGame(reqParm);
			if (query) {
				const results = listGames(query);
				viewArgs.array = results.length !== 0 ? results : null;
			}
			res.render("getView", viewArgs);
		} catch (error) {
			next(error);
		}
	}
];

async function getAllGames(req, res, next) {
	try {
		const query = await queries.getAllGames();
		const results = listGames(query);
		res.render("allView", {
			array: results,
			route: "/games",
			desc: "games"
		});
	} catch (error) {
		next(error);
	}
}

async function getNewGame(req, res, next) {
	try {
		const devs = await queries.getAllDevs();
		const genres = await queries.getAllGenres();
		res.render("newGame", { devs: devs, genres: genres, error: null });
	} catch (error) {
		next(error);
	}
}

const postNewGame = [
	validatePost,
	async function postNewGame(req, res, next) {
		try {
			console.log(req.body);
			const reqParm = req.body;
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				const data = await postError(errors.array());
				return res.status(400).render("newGame", data);
			}
			await queries.postGame([
				reqParm.newGame,
				reqParm.date,
				reqParm.devsList,
			]);
			res.redirect("/games");
		} catch (error) {
			if (error.constraint === "unique_title") {
				const data = await postError([{ msg: "That game is already registered" }]);
				return res.status(400).render("newGame", data);
			}
			next(error);
		}
	}
];

async function postError(error) {
	return ({
		devs: await queries.getAllDevs(),
		genres: await queries.getAllGenres(),
		error: error
	});
}

module.exports = { getGames, getAllGames, getNewGame, postNewGame };