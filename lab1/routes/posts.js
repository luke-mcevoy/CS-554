const { ObjectID } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const postData = data.posts;
const userData = data.users;

/**
 * 	Gets all blog posts
 */
router.get('/', async (req, res) => {
	try {
		const postList = await postData.getAllBlogPosts();
		res.json(postList);
	} catch (e) {
		res.status(500).send();
	}
});

/**
 * 	Gets blog post by ID
 */
router.get('/:id', async (req, res) => {
	try {
		const post = await postData.getBlogPostById(ObjectID(req.params.id));
		res.json(post);
	} catch (e) {
		res.status(404).json({ message: 'Blog post not found' });
	}
});

/**
 * 	Creates blog post
 */
router.post('/', async (req, res) => {
	try {
		let newPostContent = req.body;

		console.log(newPostContent);

		// if (!newPostContent.title) throw 'No title provided for new blog post';
		// if (!newPostContent.body) throw 'No body provided for new blog post';

		// if (typeof newPostContent.title !== String)
		// 	throw 'Invalid title provided for new blog post';
		// if (typeof newPostContent.body !== String)
		// 	throw 'Invalid title provided for new blog post';

		console.log('Passed error checking');

		/**
		 * 	Check string lengths are != 0
		 */

		/**
		 * 	Grab current user from session
		 */

		const newPost = await postData.addBlogPost(
			newPostContent.title,
			newPostContent.body,
		);

		res.json(newPost);
	} catch (e) {
		res.status(500).send();
	}
});

/**
 *	Updates ALL details of the blog post with the supplied ID
 */
router.put('/:id', async (req, res) => {
	let post;
	try {
		post = await postData.getBlogPostById(ObjectID(req.params.id));
	} catch (e) {
		res.status(404).json({ error: 'Post not found' });
	}
	let newBlogPostInfo = req.body;

	if (!newBlogPostInfo) {
		res
			.status(400)
			.json({ error: 'You must provide data to create a new blog post' });
		return;
	}

	if (!newBlogPostInfo.title) {
		res
			.status(400)
			.json({ error: 'You must provide a title to create a new blog post' });
		return;
	}

	if (!newBlogPostInfo.body) {
		res
			.status(400)
			.json({ error: 'You must provide a body to create a new blog post' });
		return;
	}

	const updatedPost = await postData.updateBlogPost(
		ObjectID(post._id),
		newBlogPostInfo.title,
		newBlogPostInfo.body,
	);

	res.json(updatedPost);
});

/**
 * 	Updates SOME of the blog post with the supplied ID
 */
router.patch('/:id', async (req, res) => {
	try {
		return;
	} catch (e) {
		return;
	}
});

/**
 * 	Adds a new comment to the blog posts
 */
router.post('/:id/comments', async (req, res) => {
	try {
		let post;
		try {
			post = await postData.getBlogPostById(ObjectID(req.params.id));
		} catch (e) {
			res.status(404).json({ error: 'Post not found' });
		}
		let newBlogComment = req.body;
		const updatedPost = await postData.addCommentToBlogPost(newBlogComment);
		res.json(updatedPost);
	} catch (e) {
		res.status(404).json({ error: 'Post not found!!' });
	}
});

/**
 * 	Deletes the comment with an ide of commentID on the blog post with an ID
 */
router.delete('/:blogId/:commentId', async (req, res) => {
	try {
		let post;
		try {
			post = await postData.getBlogPostById(ObjectID(req.params.id));
		} catch (e) {
			res.status(404).json({ error: 'Post not found' });
		}

		let comment;
		try {
			comment = await postData.getCommentById(ObjectID(req.params.commentId));
		} catch (e) {
			res.status(404).json({ error: 'Comment not found' });
		}
	} catch (e) {
		return;
	}
});

async function uniqueUsername(inputUsername) {
	let uniqueUsername = true;
	for (let user of await userData.getAllUsers()) {
		if (user.username.toLowerCase() == inputUsername.toLowerCase()) {
			uniqueUsername = false;
		}
	}
	return uniqueUsername;
}

/**
 * 	Creates a new user in the system and returns the created user documen
 */
router.post('/signup', async (req, res) => {
	try {
		if (await uniqueUsername(req.body.username)) {
			try {
				/**
				 * 	Error checking first name and shit
				 */
			} catch (e) {
				res.status(403);
			}
		}
		const user = await userData.addUser(
			req.body.name,
			req.body.username,
			req.body.password,
		);
		req.session.user = {
			id: user._id,
			name: user.name,
			username: user.username,
		};
		res.json(user);
		return user;
	} catch (e) {
		// res.render(403);
		console.log(e);
		return e;
	}
});

/**
 * 	Logs in a user with username and password
 */
router.post('/login', async (req, res) => {
	try {
		let currUser;
		for (let user of await userData.getAllUsers()) {
			if (user.username.toLowerCase() == req.body.username.toLowerCase()) {
				if (await bcrypt.compare(req.body.password, user.password)) {
					currUser = user;
				}
			}
		}
		req.session.user = {
			id: currUser._id,
			username: currUser.username,
		};
		res.json(currUser);
	} catch (e) {
		return e;
	}
});

/**
 * 	Deletes the session, logs user out
 */
router.get('/logout', async (res, req) => {
	try {
		req.session.destroy();
	} catch (e) {
		return;
	}
});

module.exports = router;
