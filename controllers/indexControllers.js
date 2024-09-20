const db = require("../db/queries");

async function getIndex(req, res) {
	const usernames = await db.getAllUsernames();
	console.log(`Usernames: ${usernames}`);
	res.status(200).send(`Usernames: ${usernames.map(user => user.username).join(", ")}`);
}

module.exports = { getIndex };