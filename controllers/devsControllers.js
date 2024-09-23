require("dotenv").config();
const { query, body, validationResult } = require("express-validator");
const queries = require("../db/queries");

const lengthErr = "must be between 1 and 255 characters";
const validateGet = [
	query("devs").trim()
		.isLength({ max: 255 }).withMessage(`Search length ${lengthErr}`),
];

const validatePost = [
	body("newDev").trim()
		.isLength({ min: 1, max: 255 }).withMessage(`Dev name length ${lengthErr}`),
	body("password").trim()
		.notEmpty().equals(process.env.HTTP_PASSWORD).withMessage("Incorrect password"),
];

function listDevs(query) {
	const result = query.map((value) => {
		return (`Developer: ${value.name} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

const getDevs = [
	validateGet,
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

function getNewDev(req, res) {
	res.render("newDev", { error: null });
}

const postNewDev = [
	validatePost,
	async function postNewDev(req, res, next) {
		try {
			const reqParm = req.body.newDev;
			const errors = validationResult(req);
			if (!errors.isEmpty())
				return res.status(400).render("newDev", { error: errors.array() });
			await queries.postGenre(reqParm);
			res.redirect("/devs");
		} catch (error) {
			if (error.constraint === 'unique_name')
				return res.status(400).render("newDev", { error: [{ msg: "That developer is already registered" }] });
			next(error);
		}
	}
];

module.exports = { getDevs, getAllDevs, getNewDev, postNewDev }