const { ApolloServer, gql } = require('apollo-server');
const uuid = require('uuid');
const axios = require('axios');
const redis = require('redis');
const asyncRedis = require('async-redis');
const client = asyncRedis.createClient();
const bluebird = require('bluebird');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

client.flushall();

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
			// console.log('args.pageNum: ', args.pageNum);
			try {
				let { data } = await axios.get(unsplashURL + accessKey);
				for (img of data) {
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
				// console.log('could not get the unsplash api data');
				console.log(e);
			}
			return imagePosts;
		},
		/* binnedImages: [ImagePost] */
		binnedImages: async () => {
			// console.log('binnedImages');
			let keys = await client.KEYS('*');
			let values = [];
			for (key of keys) {
				value = await client.HGETALL(key);
				value.binned = value.binned === 'true';
				value.userPosted = value.userPosted === 'true';
				if (value.binned) values.push(value);
			}
			return values;
		},
		/* userPostedImages: [ImagePost] */
		userPostedImages: async () => {
			// console.log('userPostedImages');
			let keys = await client.KEYS('*');
			let values = [];
			for (key of keys) {
				value = await client.HGETALL(key);
				value.binned = value.binned === 'true';
				value.userPosted = value.userPosted === 'true';
				if (value.userPosted) values.push(value);
			}
			return values;
		},
	},
	// ImagePost: {},
	Mutation: {
		// DONE
		uploadImage: async (_, args) => {
			const newImagePost = {
				_id: uuid.v4(),
				url: args.url,
				posterName: args.posterName ? args.posterName : 'No Poster Name',
				description: args.description ? args.description : 'No Description',
				userPosted: true,
				binned: false,
			};
			// console.log('newImagePost in uploadImage: ', newImagePost);
			try {
				let redisImagePost = await client.hmset(newImagePost._id, newImagePost);
				if (!redisImagePost) throw `Could not cache image ${newImagePost._id}`;
			} catch (e) {
				// console.log('redis failed');
				console.log(e);
			}

			return newImagePost;
		},
		// DONE
		updateImage: async (_, args) => {
			/* 
            1. If the image was not previously in the cache, and the user bins it, then add
            it to the cache using data from React state. 
            2. If an image post that came from Unsplash an was unbinned (binned set to false), remove from cache.
            */

			doesImagePostExists = await client.exists(args._id);
			let imagePost = {};
			if (doesImagePostExists) {
				// console.log('image does exist');
				imagePost = await client.HGETALL(args._id);
			}
			// console.log('imagePost', imagePost);

			console.log('args: ', args);

			if (args._id) imagePost._id = args._id;
			if (args.url) imagePost.url = args.url;
			if (args.posterName) imagePost.posterName = args.posterName;
			if (args.description) imagePost.description = args.description;

			console.log('args.userPosted: ', args.userPosted);

			args.userPosted
				? (imagePost.userPosted = true)
				: (imagePost.userPosted = false);

			console.log('imagePost.userPosted: ', imagePost.userPosted);

			args.binned ? (imagePost.binned = true) : (imagePost.binned = false);

			console.log('args.binned: ', args.binned);

			imagePost.userPosted =
				imagePost.userPosted == 'true' || imagePost.userPosted == true
					? true
					: false;

			console.log('imagePost.userPosted: ', imagePost.userPosted);

			imagePost.binned =
				imagePost.binned == 'true' || imagePost.binned == true ? true : false;

			console.log('imagePost.binned: ', imagePost.binned);

			// console.log('imagePost', imagePost);
			try {
				let redisImagePostSet = await client.HMSET(imagePost._id, imagePost);
				let redisImagePostGet = await client.HGETALL(imagePost._id);
				if (!redisImagePostSet) throw `Could not cache image ${imagePost._id}`;
				if (redisImagePostGet)
					console.log('image post get: ', redisImagePostGet);
				return imagePost;
			} catch (e) {
				console.log(e);
				return [];
			}
		},
		// DONE
		deleteImage: async (_, args) => {
			/* Delete a user-posted Image Post from cache */
			doesImagePostExists = await client.exists(args._id);
			if (doesImagePostExists) {
				// console.log('image does exist');
				let imagePost = await client.HGETALL(args._id);
				let deleteImagePost = await client.del(args._id);
				if (!deleteImagePost) throw `Did not delete image ${args._id}`;
				return imagePost;
			} else {
				// console.log('image does NOT exist');
				return [];
			}
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`????  Server ready at ${url} ????`);
});
