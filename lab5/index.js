const { ApolloServer, gql } = require('apollo-server');
const mongoCollections = require('./config/mongoCollections');
const uuid = require('uuid');
const axios = require('axios');
const redis = require('redis');
const flat = require('flat');
const unflatten = flat.unflatten;
const client = redis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.flushall();

const imagePostCollection = mongoCollections.ImagePosts;

const typeDefs = gql`
	type Query {
		unsplashImages(pageNum: Int): [ImagePost]
		binnedImages: [ImagePost]
		userPostedImages: [ImagePost]
	}

	type ImagePost {
		_id: String!
		url: String!
		posterName: String!
		description: String
		userPosted: Boolean!
		binned: Boolean!
	}

	type Mutation {
		uploadImage(
			url: String!
			description: String
			posterName: String
		): ImagePost
		updateImage(
			_id: String!
			url: String
			posterName: String
			description: String
			userPosted: Boolean
			binned: Boolean
		): ImagePost
		deleteImage(_id: String!): ImagePost
	}
`;

const resolvers = {
	Query: {
		/* unsplashImages(pageNum: Int): [ImagePost] */
		unsplashImages: async (_, args) => {
			accessKey = 'sO_rjOMfqCYiAhWbtGHZBkyjNXQzxjTd2UNRKSptNm8';
			unsplashURL = `https://api.unsplash.com/photos?page=${args.pageNum}&client_id=`;
			imagePosts = [];
			console.log('args.pageNum: ', args.pageNum);
			try {
				let { data } = await axios.get(unsplashURL + accessKey);
				for (img of data) {
					// console.log(img);
					let newImagePost = {
						_id: img.id,
						url: img.urls.small,
						posterName: img.user.name,
						description: img.description,
						userPosted: false,
						binned: false,
					};
					imagePosts.push(newImagePost);
				}
			} catch (e) {
				console.log('could not get the unsplash api data');
				console.log(e);
			}
			return imagePosts;
		},
		/* binnedImages: [ImagePost] */
		binnedImages: async () => {
			let cacheBinnedImages = await client.getAsync('binnedImages');
			if (cacheBinnedImages) {
				console.log('Binned Images found');
				return cacheBinnedImages;
			} else {
				return null;
			}
		},
		/* userPostedImages: [ImagePost] */
		userPostedImages: async () => {
			const userPostedImages = await imagePostCollection();
			const userPostedImage = await userPostedImages.find({}).toArray();
			console.log(userPostedImage);
			return userPostedImage;
		},
	},
	ImagePost: {},
	Mutation: {
		// uploadImage(url!, description, posterName) -> ImagePost
		uploadImage: async (_, args) => {
			/*
            Create an ImagePost and save in Redis.
            Default values:
                binned: false
                userPosted: true
                id: a uuid
            */

			// fetch using Unsplash API
			const imagePosts = await imagePostCollection();
			const newImagePost = {
				_id: uuid.v4(),
				url: args.url,
				posterName: args.posterName ? args.posterName : 'No Poster Name',
				description: args.description ? args.description : 'No Description',
				userPosted: true,
				binned: false,
			};
			console.log(newImagePost);
			await imagePosts.insertOne(newImagePost);
			try {
				let flatImagePost = flat(newImagePost);
				let redisImagePost = await client.hmsetAsync(
					`${newImagePost._id}`,
					flatImagePost,
				);
				if (!redisImagePost) throw `Could not cache image ${newImagePost._id}`;
				console.log('Stringify, flatten, hmsetAsync: ', redisImagePost);

				const flatRedis = await client.hgetallAsync(newImagePost._id);
				console.log('flatRedis: ', flatRedis);

				const remade = unflatten(flatRedis);
				console.log('remade: ', remade);
			} catch (e) {
				console.log('redis failed');
				console.log(e);
			}

			return newImagePost;
		},
		updateImage: async (_, args) => {
			/* 
            1. If the image was not previously in the cache, and the user bins it, then add
            it to the cache using data from React state. 
            2. If an image post that came from Unsplash an was unbinned (binned set to false), remove from cache.
            */
		},
		deleteImage: async (_, args) => {
			/* Delete a user-posted Image Post from cache */
			doesImagePostExists = await client.existsAsync(args._id);
			if (doesImagePostExists) {
				let imagePost = await client.hgetallAsync(args._id);
				let deleteImagePost = await client.delAsync(args._id);
				console.log(
					`deleteImagePost ${args._id}: `,
					imagePost,
					unflatten(imagePost),
					typeof imagePost,
					typeof unflatten(imagePost),
				);
				return unflatten(imagePost);
			} else {
				return [];
			}
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url} 🚀`);
});
