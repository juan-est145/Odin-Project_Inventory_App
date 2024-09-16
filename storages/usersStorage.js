class UsersStorage {
	constructor() {
		this.storage = {};
		this.id = 0;
	}

	addUser({ firstName, lastName, email, age=null, bio=null }) {
		const id = this.id;
		this.storage[id] = { id, firstName, lastName, email, age, bio };
		this.id++;
	}

	getUsers() {
		return Object.values(this.storage);
	}

	getUser(id) {
		return this.storage[id];
	}

	updateUser(id, { firstName, lastName }) {
		this.storage[id] = { id, firstName, lastName };
	}

	deleteUser(id) {
		delete this.storage[id];
	}
}

module.exports = new UsersStorage();