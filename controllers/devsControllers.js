const queries = require("../db/queries");

//TO DO: Implement validators for get requests and getQuery add a return null statement

function listDevs(query) {
	const result = query.map((value) => {
		return (`Developer: ${value.name} ${value.hasOwnProperty("title") ? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

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
		const query = reqParm ? await queries.getDevs(reqParm) : null;

		if (query) {
			const results = listDevs(query);
			viewArgs.array = results.length !== 0 ? results : null;
		}
		res.render("getView", viewArgs);
	} catch (error) {
		next(error);
	}
}

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