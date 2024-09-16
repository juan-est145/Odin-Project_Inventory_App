const usersStorage = require("../storages/usersStorage");
const { body, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";
const validateUser = [
	body("firstName").trim()
		.isAlpha().withMessage(`First name ${alphaErr}`)
		.isLength({ min: 1, max: 10 }).withMessage(`First name ${lengthErr}`),
	body("lastName").trim()
		.isAlpha().withMessage(`Last name ${alphaErr}`)
		.isLength({min: 1, max: 10}).withMessage(`Last name ${lengthErr}`),
]		


function usersListGet(req, res) {
	res.render("index", { title: "User list", users: usersStorage.getUsers(), });
}

function usersCreateGet(req, res) {
	res.render("createUser", { title: "Create user", })
}

const usersCreatePost = [
	validateUser,
	function usersCreatePost(req, res) {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).render("createUser", {
				title: "Create user",
				errors: errors.array(),
			});
		}
		const { firstName, lastName } = req.body;
		usersStorage.addUser({ firstName, lastName });
		res.redirect("/");
	}
]

module.exports = { usersListGet, usersCreateGet, usersCreatePost }