const queries = require("../db/queries");
const { query, validationResult } = require("express-validator");

const lengthErr = "must be between 1 and 255 characters";
const validateInput = [
	query("genre").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
];

function listGenres(query) {
	const result = query.map((value) => {
		return (`Genre: ${value.genre} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

const getGenres = [
	validateInput,
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
				if (!errors.isEmpty()){
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

module.exports = { getAllGenres, getGenres };