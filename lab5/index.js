const { ApolloServer, gpl } = require('apollo-server');
const mongoCollections = require('./config/mongoCollections');
const uuid = require('uuid');
const { imagePost } = require('./config/mongoCollections');

const imagePostCollection = mongoCollections.imagePost;

const typeDefs = gpl`
    type Query {
        unsplashImages(pageNum: Int): [ImagePost]
        binnedImages: [ImagePost]
        userPostedImages: [ImagePost]
    }

    type ImagePost {
        id: ID!
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
            id: ID!
            url: String
            posterName: String
            description: String
            userPosted: Boolean
            binned: Boolean
        ): ImagePost
        deleteImage(id: ID!): ImagePost
    }
`;

const resolvers = {
	Query: {
		/* unsplashImages(pageNum: Int): [ImagePost] */
		unsplashImages: async (_, args) => {
			const unsplashImages = await imagePostCollection();
			const unsplashImage = await unsplashImages.findOne({ _id: args._id });
			return unsplashImage;
		},
		/* binnedImages: [ImagePost] */
		binnedImages: async () => {
			const binnedImages = await imagePostCollection();
			const binnedImage = await binnedImages.find({}).toArray();
			return binnedImage;
		},
		/* userPostedImages: [ImagePost] */
		userPostedImages: async () => {
			const userPostedImages = await imagePostCollection();
			const userPostedImage = await userPostedImages.find({}).toArray();
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
				description: args.description ? args.description : 'No Description',
				posterName: args.posterName ? args.posterName : 'No Poster Name',
			};
			await imagePosts.insertOne(newImagePost);
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
		},
	},
};

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
	console.log(`🚀  Server ready at ${url} 🚀`);
});
