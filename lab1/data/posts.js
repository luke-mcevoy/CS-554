const mongoCollections = require('../config/mongoCollections');
const blogPosts = mongoCollections.blogs;
const users = require('./users');
const uuid = require('uuid');
const { ObjectId } = require('bson');

let exportedMethods = {
	async getAllBlogPosts() {
		const blogPostCollection = await blogPosts();
		return await blogPostCollection.find({}).toArray();
	},
	async getBlogPostById(id) {
		const blogPostCollection = await blogPosts();
		const blogPost = await blogPostCollection.findOne({ _id: ObjectId(id) });

		if (!blogPost) throw 'Blog post not found';
		return blogPost;
	},
	async getCommentById(blogPostId, commentId) {
		const blogPost = await this.getBlogPostById(blogPostId);
		if (!blogPost) throw 'Blog post not found';

		// blogPost.comments.find({"comments"});
	},
	async addBlogPost(title, body, userThatPosted) {
		const blogPostCollection = await blogPosts();

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
		return this.getBlogPostById(newInsertInformation.insertedId);
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
	async updateBlogPost(id, title, body, posterId = 0) {
		const blogPostCollection = await blogPosts();
		// const userThatPosted = await users.getUserById(posterId);

		let updatedPost = {
			title: title,
			body: body,
			poster: {
				id: posterId,
				// name: userThatPosted.name,
				name: 'dev',
			},
		};
		const updateInfo = await blogPostCollection.updateOne(
			{ _id: id },
			{ $set: updatedPost },
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return this.getBlogPostById(id);
	},
	async addCommentToBlogPost(blogPostId, comment) {
		const blogPostCollection = await blogPosts();
		const userThatPosted = {
			_id: req.session._id,
			username: req.session.username,
		};
		const updateInfo = await blogPostCollection.updateOne(
			{ _id: ObjectId(blogPostId) },
			{ $userThatPostedComment: userThatPosted },
			{ $set: { comments: comment.comments } },
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return this.getBlogPostById(blogPostId);
	},
};

module.exports = exportedMethods;
