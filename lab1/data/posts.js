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

		console.log('Entering loop');
		for (currentComment of blogPost.comments) {
			if (currentComment._id.toString() == commentId.toString()) {
				return currentComment;
			}
		}
		throw 'Comment not found';
	},
	async deleteCommentById(blogPostId, commentId) {
		const blogPost = await this.getBlogPostById(blogPostId);
		if (!blogPost) throw 'Blog post not found';

		const editedBlogPost = blogPost;

		console.log('Before: ', editedBlogPost.comments.length);

		for (let i = 0; i < blogPost.comments.length; i++) {
			if (blogPost.comments[i]._id.toString() == commentId.toString()) {
				editedBlogPost.comments.splice(i, 1);
			}
		}

		console.log('After: ', editedBlogPost.comments.length);

		/**
		 * 	idk why this isn't working
		 */
		const updateInfo = await blogPostCollection.updateOne(
			{ _id: ObjectId(blogPost._id) },
			{ $set: { comments: { _id: ObjectId(commentId) } } },
		);
		console.log('out of pull'); // Doesn't make it here
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return true;
	},
	async addBlogPost(title, body, userThatPosted) {
		const blogPostCollection = await blogPosts();
		let newBlogPost = {
			title: title,
			body: body,
			userThatPosted: {
				_id: userThatPosted._id,
				username: userThatPosted.username,
			},
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
	async updateAllOfBlogPost(postId, newTitle, newBody) {
		const blogPostCollection = await blogPosts();

		const updateInfo = await blogPostCollection.updateOne(
			{ _id: ObjectId(postId) },
			{ $set: { title: newTitle, body: newBody } },
		);
		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return this.getBlogPostById(postId);
	},
	async updateSomeOfBlogPost(postId, newTitle, newBody) {
		if (!newTitle && !newBody) {
			return this.getBlogPostById(postId);
		}

		if (newTitle && newBody) {
			throw 'Can not edit all fields in this method';
		}

		if (!newTitle && newBody) {
			const blogPostCollection = await blogPosts();

			const updateInfo = await blogPostCollection.updateOne(
				{ _id: ObjectId(postId) },
				{ $set: { body: newBody } },
			);
			if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
				throw 'Update failed';
			return this.getBlogPostById(postId);
		}

		if (newTitle && !newBody) {
			const blogPostCollection = await blogPosts();

			const updateInfo = await blogPostCollection.updateOne(
				{ _id: ObjectId(postId) },
				{ $set: { title: newTitle } },
			);
			if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
				throw 'Update failed';
			return this.getBlogPostById(postId);
		}
	},
	async addCommentToBlogPost(blogPostId, user, comment) {
		const blogPostCollection = await blogPosts();

		const commentObj = {
			_id: new ObjectId(),
			userThatPostedComment: { _id: user._id, username: user.username },
			comment: comment,
		};

		const updateInfo = await blogPostCollection.updateOne(
			{ _id: ObjectId(blogPostId) },
			{ $push: { comments: commentObj } },
		);

		if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
			throw 'Update failed';
		return this.getBlogPostById(blogPostId);
	},
};

module.exports = exportedMethods;
