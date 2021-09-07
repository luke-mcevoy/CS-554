const mongoCollections = require('../config/mongoCollections');
const blogsPosts = mongoCollections.blogs;
const users = require('./users');
const uuid = require('uuid');
const { ObjectId } = require('bson');

let exportedMethods = {
	async getAllBlogPosts() {
		const blogPostCollection = await blogsPosts();
		return await blogPostCollection.find({}).toArray();
	},
	async getBlogPostById(id) {
		console.log(id, typeof ObjectId(id));
		const blogPostCollection = await blogsPosts();
		const blogPost = await blogPostCollection.findOne({ _id: ObjectId(id) });

		if (!blogPost) throw 'Blog post not found';
		return blogPost;
	},
	async addBlogPost(title, body, userThatPosted) {
		const blogPostCollection = await blogsPosts();

		/**
		 * Get user from session here, use as userThatPosted && userThatPostedComment
		 */

		let newBlogPost = {
			title: title,
			body: body,
			userThatPosted: userThatPosted,
			comments: [],
		};

		const newInsertInformation = await blogPostCollection.insertOne(
			newBlogPost,
		);
		if (newInsertInformation.insertedCount === 0) throw 'Insert failed!';

		return;
	},
	async removeBlogPost(id) {
		const blogPostCollection = await blogPosts();
		const deletionInfo = await blogPostCollection.deleteOne({
			_id: ObjectId(id),
		});
		if (deletionInfo.deletedCount === 0)
			throw `Could not delete blog post with id of ${id}`;
		return true;
	},
	/*
	async updateBlogPost(id, title, body, posterId) {
		const postCollection = await posts();
		const userThatPosted = await users.getUserById(posterId);

		let updatedPost = {
			title: title,
			body: body,
			poster: {
				id: posterId,
				name: userThatPosted.name,
			},
		};
		const updateInfo = await postCollection.updateOne(
			{ _id: id },
			{ $set: updatedPost },
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return this.getPostById(id);
	},
	*/
};

module.exports = exportedMethods;
