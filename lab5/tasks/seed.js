const dbConnection = require('../config/mongoConnection');
const mongoCollections = require('../config/mongoCollections');
const uuid = require('uuid');

const ImagePosts = mongoCollections.ImagePosts;

const main = async () => {
	const db = await dbConnection();
	await db.dropDatabase();
	const imagePostCollection = await ImagePosts();

	await imagePostCollection.insertMany([
		{
			id: uuid.v4(),
			url: 'google.com',
			posterName: 'Luke McEvoy',
			description: 'Seeding the DB',
			userPosted: true,
			binned: false,
		},
	]);

	console.log('Done seeding database');
	await db.serverConfig.close();
};

main().catch(console.log);
