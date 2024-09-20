const db = require("../db/queries");

function getNew(req, res) {
	res.render("new");
}

async function postNew(req, res) {
	const { user } = req.body;
	await db.insertUsername(user);
	res.redirect("/");
}

module.exports = { getNew, postNew };