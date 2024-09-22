const queries = require("../db/queries");

//TO DO: Implement try/catch
function listDevs(query) {
	const result = query.map((value) => {
		return (`Developer: ${value.name} ${value.hasOwnProperty("title")? `| Title: ${value.title}` : ""}`);
	});
	return (result);
}

async function getDevs(req, res) {
	const viewArgs = {
		array: [],
		action: "/devs",
		method: "/get",
		id: "devs",
		allRoute: "/devs/all",
		descText: "devs",
	};
	const reqParm = req.query.devs;
	const query = reqParm ? await queries.getDevs(reqParm) : null;
	
	if (query) {
		const results = listDevs(query);
		viewArgs.array = results.length !== 0 ? results : null;
	}		
	res.render("getView", viewArgs);
}

async function getAllDevs(req, res) {
	const query = await queries.getAllDevs();
	const results = listDevs(query);
	res.render("allView", { 
		array: results,
		route: "/devs",
		desc: "devs",
	});
}

module.exports = { getDevs, getAllDevs }