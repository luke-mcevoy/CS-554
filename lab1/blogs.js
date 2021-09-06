const mongoCollections = require('./config/mongoCollections');
const posts = mongoCollections.posts;

let exportedMethods = {
	async getBlogsById(id) {
		if (!id) throw 'You must provide an id to search for';

		const blogsCollection = await blogs();
		const blogs = await blogsCollection.findOne({ _id: id });
		if (blogs === null) throw 'No blog with that id';

		return blogs;
	},
	async addBlogs(name, data) {
		if (!name) throw 'You must provide a name for your blog';
		if (!data) throw 'You must provide data for you blog post';

		const blogsCollection = await blogs();

		const newPostInfo = {
			name: name,
			data: data,
		};

		const insertInfo = await blogsCollection.insertOne(newBlogInfo);
		if (insertInfo.insertCount === 0) throw 'Could not add blog';

		// const newPost = await this.getPostById(insertInfo.insertedInfo);

		return newPostInfo;
	},
};

module.exports = exportedMethods;
