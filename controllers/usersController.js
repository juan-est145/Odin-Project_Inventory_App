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
		.isLength({ min: 1, max: 10 }).withMessage(`Last name ${lengthErr}`),
	body("email").trim()
		.isEmail().withMessage("This email is not valid"),
	body("age").optional({ values: "falsy" }).trim()
		.isInt({ min: 18, max: 120 }).withMessage("If introduced, age must be a number and between 18 and 120"),
	body("bio").optional({values: "falsy"}).trim()
		.isLength({max: 200}).withMessage("If introduced, max length is 200 characters"),
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
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.addUser({ firstName, lastName, email, age, bio });
		res.redirect("/");
	}
]

function usersUpdateGet(req, res) {
	const user = usersStorage.getUser(req.params.id);
	res.render("updateUser", {
		title: "Update user",
		user: user,
	});
}

const usersUpdatePost = [
	validateUser,
	function (req, res) {
		const user = usersStorage.getUser(req.params.id);
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(404).render("updateUser", {
				title: "Update user",
				user: user,
				errors: errors.array(),
			});
		}
		const { firstName, lastName, email, age, bio } = req.body;
		usersStorage.updateUser(req.params.id, { firstName, lastName, email, age, bio });
		res.redirect("/");
	}
];

function usersDeletePost(req, res) {
	usersStorage.deleteUser(req.params.id);
	res.redirect("/");
}

module.exports = { usersListGet, usersCreateGet, usersCreatePost, usersUpdateGet, usersUpdatePost, usersDeletePost }