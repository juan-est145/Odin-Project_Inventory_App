const queries = require("../db/queries");
const { query, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";
const validateInput = [
	query("game").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
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
	validateInput,
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

module.exports = { getGames, getAllGames };