const mongoCollections = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();

	const luke = await users.addUser('Luke', 'Luke_McEvoy', 'password');
	const waldo = await users.addUser('Waldo', 'wheresWaldo', 'password');
	const alan = await users.addUser('Alan', 'alanTuring101', 'password');
	const shaq = await users.addUser('Shaq', 'orlandoSuperMan', 'password');

	const registerdUsers = [luke, waldo, alan, shaq];

	seedBlogPostTitle = 'Lorem ipsum dolor sit amet';
	seedBlogPostBody =
		'consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean';

	const randomRange = function () {
		return Math.ceil(20 + Math.random() * 1000);
	};
	const randomUser = function () {
		return registerdUsers[Math.floor(Math.random() * registerdUsers.length)];
	};

	for (let i = 0; i < randomRange(); i++) {
		await posts.addBlogPost(seedBlogPostTitle, seedBlogPostBody, randomUser());
	}

	console.log('Done seeding database');
};

main().catch(console.log);
