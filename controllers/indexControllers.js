const db = require("../db/queries");

async function getIndex(req, res) {
	const reqQuery = req.query.user;
	const userNames = reqQuery? await db.getUsername(reqQuery) : await db.getAllUsernames(); 
	res.render("index", {users: userNames});
}

module.exports = { getIndex };