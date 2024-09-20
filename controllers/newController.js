function getNew(req, res) {
	res.render("new");
}

function postNew(req, res) {
	console.log("username to be saved: ", req.body.user);
}

module.exports = { getNew, postNew };