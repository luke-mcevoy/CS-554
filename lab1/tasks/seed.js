const mongoCollections = require('../config/mongoCollections');
const dbConnection = require('../config/mongoConnection');
const data = require('../data/');
const users = data.users;
const posts = data.posts;

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();

	const luke = await users.addUser('Luke_McEvoy');
	const waldo = await users.addUser('wheresWaldo');
	const alan = await users.addUser('alanTuring101');
	const shaq = await users.addUser('orlandoSuperMan');

	const registerdUsers = [luke, matt, waldo, alan, shaq];

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
