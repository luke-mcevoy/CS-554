const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid');

let exportedMethods = {
	async getAllUsers() {
		const userCollection = await users();
		const userList = await userCollection.find({}).toArray();
		return userList;
	},
	async getUserById(id) {
		const userCollection = await users();
		const user = await userCollection.findOne({ _id: id });
		if (!user) throw 'User not found';
		return user;
	},
	async addUser(username) {
		const userCollection = await users();

		let newUser = {
			_id: uuid.v4(),
			username: username,
		};

		const newInsertInformation = await userCollection.insertOne(newUser);
		if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';
		return await this.getUserById(newInsertInformation.insertedId);
	},
};

module.exports = exportedMethods;
