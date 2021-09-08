const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const uuid = require('uuid');
const bcrypt = require('bcryptjs');
const { ObjectID } = require('bson');
const saltRounds = 2;

let exportedMethods = {
	async getAllUsers() {
		const userCollection = await users();
		return await userCollection.find({}).toArray();
	},
	async getUserById(id) {
		const userCollection = await users();
		const user = await userCollection.findOne({ _id: id });
		if (!user) throw 'User not found';
		return user;
	},
	async addUser(name, username, password) {
		const userCollection = await users();

		try {
			/**
			 * 	Error checking
			 */
		} catch (e) {
			throw e;
		}

		const hashedPassword = await bcrypt.hash(password, saltRounds);

		let newUser = {
			_id: new ObjectID(),
			name: name,
			username: username,
			password: hashedPassword,
		};

		const insertInfo = await userCollection.insertOne(newUser);
		if (insertInfo.insertedCount === 0) throw 'Could not add user.';
		return await this.getUserById(insertInfo.insertedId);
	},
};

module.exports = exportedMethods;
