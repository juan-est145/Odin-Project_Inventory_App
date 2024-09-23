const { query, validationResult } = require("express-validator");
const queries = require("../db/queries");

const lengthErr = "must be between 1 and 255 characters";
const validateInput = [
	query("devs").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
];

function listDevs(query) {
	const result = query.map((value) => {
		return (`Developer: ${value.name} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

const getDevs = [
	validateInput,
	async function getDevs(req, res, next) {
		const viewArgs = {
			array: [],
			action: "/devs",
			method: "/get",
			id: "devs",
			allRoute: "/devs/all",
			descText: "devs",
			errors: null,
		};
		try {
			const reqParm = req.query.devs;
			if (reqParm) {
				const errors = validationResult(req);
				if (!errors.isEmpty()) {
					viewArgs.errors = errors.array();
					return res.status(400).render("getView", viewArgs);
				}
			}
			const query = await queries.getDevs(reqParm);
			if (query) {
				const results = listDevs(query);
				viewArgs.array = results.length !== 0 ? results : null;
			}
			res.render("getView", viewArgs);
		} catch (error) {
			next(error);
		}
	}
];

async function getAllDevs(req, res, next) {
	try {
		const query = await queries.getAllDevs();
		const results = listDevs(query);
		res.render("allView", {
			array: results,
			route: "/devs",
			desc: "devs",
		});
	} catch (error) {
		next(error);
	}
}

module.exports = { getDevs, getAllDevs }