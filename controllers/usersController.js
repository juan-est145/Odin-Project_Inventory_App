const usersStorage = require("../storages/usersStorage");

function usersListGet(req, res) {
	res.render("index", { title: "User list", users: usersStorage.getUsers(), });
}

function usersCreateGet(req, res) {
	res.render("createUser", { title: "Create user", })
}

function usersCreatePost(req, res) {
	const {firstName, lastName} = req.body;
	usersStorage.addUser({firstName, lastName});
	res.redirect("/");
}

module.exports = {usersListGet, usersCreateGet, usersCreatePost}