const queries = require("../db/queries");
const { body, query, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";
const validateGet = [
	query("genre").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
];
const validatePost = [
	body("newGenre").trim()
		.isLength({ min: 1, max: 255 }).withMessage(`Genre name length ${lengthErr}`),
	body("password").trim()
		.notEmpty().equals(process.env.HTTP_PASSWORD).withMessage("Incorrect password"),
];

function listGenres(query) {
	const result = query.map((value) => {
		return (`Genre: ${value.genre} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

const getGenres = [
	validateGet,
	async function getGenres(req, res, next) {
		const viewArgs = {
			array: [],
			action: "/genres",
			method: "/get",
			id: "genre",
			allRoute: "/genres/all",
			descText: "genres",
			errors: null,
		};
		try {
			const reqParm = req.query.genre;
			if (reqParm) {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					viewArgs.errors = errors.array();
					return (res.status(400).render("getView", viewArgs));
				}
			}
			const query = await queries.getGenre(reqParm);
			if (query) {
				const results = listGenres(query);
				viewArgs.array = results.length !== 0 ? results : null;
			}
			res.render("getView", viewArgs);
		} catch (error) {
			next(error);
		}
	}
];

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

function getNewGenre(req, res) {
	res.render("newGenre", { error: null });
}

const postNewGenre = [
	validatePost,
	async function postNewGenre(req, res, next) {
		try {
			const reqParm = req.body.newGenre;
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).render("newGenre", { error: errors.array() });
			await queries.postGenre(reqParm);
			res.redirect("/genres");
		} catch (error) {
			if (error.constraint === 'unique_genre')
				return res.status(400).render("newGenre", { error: [{ msg: "That genre is already registered" }] });
			next(error);
		}
	}
];

module.exports = { getAllGenres, getGenres, getNewGenre, postNewGenre };