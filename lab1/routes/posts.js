const { ObjectId } = require('bson');
const express = require('express');
const router = express.Router();
const data = require('../data');
const bcrypt = require('bcryptjs');
const postData = data.posts;
const userData = data.users;

/**
 * 	Gets all blog posts NORMAL
 */
router.get('/', async (req, res) => {
	try {
		const postList = await postData.getAllBlogPosts();

		if (req.query && Object.keys(req.query).length != 0) {
			console.log('There is a query ', req.query);
			if (req.query.skip) {
				let i;
				try {
					i = parseInt(req.query.skip);
				} catch (e) {
					res.json({ error: 'Skip query string was invalid' });
				}
				while (i-- && i > 0) postList.reverse().pop();
			}

			if (req.query.take) {
				let i;
				try {
					i = parseInt(req.query.skip);
				} catch (e) {
					res.json({ error: 'Skip query string was invalid' });
				}

				postList.splice(i, postList.length - i);
			}
		} else {
			console.log('There is no query');
			postList.splice(0, 20);
		}
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
		const post = await postData.getBlogPostById(ObjectId(req.params.id));
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
		if (!req.session.user) {
			res.json({ error: 'User not signed in' });
		}

		let newPostContent = req.body;

		if (!newPostContent) {
			res
				.status(400)
				.json({ error: 'You must provide data to create a new blog post' });
			return;
		}

		if (!newPostContent.title) {
			res
				.status(400)
				.json({ error: 'You must provide a title to create a new blog post' });
			return;
		}

		if (!newPostContent.body) {
			res
				.status(400)
				.json({ error: 'You must provide a body to create a new blog post' });
			return;
		}

		const newPost = await postData.addBlogPost(
			newPostContent.title,
			newPostContent.body,
			req.session.user,
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
	if (!req.session.user) {
		res.json({ error: 'User not signed in' });
	}

	let post;
	try {
		post = await postData.getBlogPostById(ObjectId(req.params.id));
		if (post.userThatPosted._id != req.session.user._id) {
			res.json({ error: 'User can edit post of other user' });
		}
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

	const updatedPost = await postData.updateAllOfBlogPost(
		ObjectId(post._id),
		newBlogPostInfo.title,
		newBlogPostInfo.body,
	);

	res.json(updatedPost);
});

/**
 * 	Updates SOME of the blog post with the supplied ID
 */
router.patch('/:id', async (req, res) => {
	if (!req.session.user) {
		res.json({ error: 'User not signed in' });
	}

	let post;
	try {
		post = await postData.getBlogPostById(ObjectId(req.params.id));
		if (post.userThatPosted._id != req.session.user._id) {
			res.json({ error: 'User can edit post of other user' });
		}
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

	if (newBlogPostInfo.title && newBlogPostInfo.body) {
		res.status(400).json({
			error:
				'You cant use PATCH when all attributes are provided, use PUT instead',
		});
		return;
	}

	const updatedPost = await postData.updateSomeOfBlogPost(
		ObjectId(post._id),
		newBlogPostInfo.title,
		newBlogPostInfo.body,
	);

	res.json(updatedPost);
});

/**
 * 	Adds a new comment to the blog posts
 */
router.post('/:id/comments', async (req, res) => {
	if (!req.session.user) {
		res.json({ error: 'User not signed in' });
		return;
	}

	try {
		let post;
		try {
			post = await postData.getBlogPostById(ObjectId(req.params.id));
		} catch (e) {
			res.status(404).json({ error: 'Post not found' });
		}
		let newBlogComment = req.body;

		if (!newBlogComment) {
			res.status(400).json({
				error: 'You must provide data to create a new blog post comment',
			});
			return;
		}

		const updatedPost = await postData.addCommentToBlogPost(
			post._id,
			req.session.user,
			newBlogComment.comments,
		);
		res.json(updatedPost);
	} catch (e) {
		res.status(404).json({ error: 'Post not found!!' });
	}
});

/**
 * 	Deletes the comment with an ide of commentID on the blog post with an ID
 */
router.delete('/:blogId/:commentId', async (req, res) => {
	if (!req.session.user) {
		res.json({ error: 'User not signed in' });
	}
	try {
		try {
			let post = await postData.getBlogPostById(ObjectId(req.params.blogId));
		} catch (e) {
			res.status(404).json({ error: 'Post not found' });
		}

		try {
			let comment = await postData.getCommentById(
				ObjectId(req.params.blogId),
				ObjectId(req.params.commentId),
			);

			console.log('found comment: ', comment);

			if (
				comment.userThatPostedComment._id.toString() !=
				req.session.user._id.toString()
			) {
				res.json({ error: 'User can delete comment of other user' });
				return;
			}

			console.log('users check out');

			let removedComment = await postData.deleteCommentById(
				ObjectId(req.params.blogId),
				ObjectId(req.params.commentId),
			);

			console.log('removed comment: ', removedComment);

			res.json(removedComment);
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
				let name = req.body.name;
				let username = req.body.username;
				if (!name) throw 'No name provided';
				if (!username) throw 'No username provided';
				if (typeof name != 'string') throw 'name needs to be a valid string';
				if (typeof username != 'string')
					throw 'username needs to be a valid string';
				if (!name.replace(/\s/g, '').length)
					throw 'name needs to be a valid string';
				if (!username.replace(/\s/g, '').length)
					throw 'username needs to be a valid string';
			} catch (e) {
				res.status(403);
			}
		}

		let password = req.body.password;
		if (!password) throw 'No password provided';
		if (typeof password != 'string')
			throw 'password needs to be a valid string';
		if (!password.replace(/\s/g, '').length)
			throw 'password needs to be a valid string';

		const user = await userData.addUser(
			req.body.name,
			req.body.username,
			req.body.password,
		);
		req.session.user = {
			id: ObjectId(user._id),
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

		if (!currUser.username) throw 'No username provided';
		if (typeof currUser.username != 'string')
			throw 'username needs to be a valid string';
		if (!currUser.username.replace(/\s/g, '').length)
			throw 'name needs to be a valid string';

		req.session.user = {
			_id: currUser._id,
			username: currUser.username,
		};
		res.json(currUser);
	} catch (e) {
		res.json({ error: e });
	}
});

/**
 * 	Deletes the session, logs user out
 */
router.get('/logout', async (res, req) => {
	if (!req.session.user) {
		res.json({ error: 'User not signed in' });
	}
	try {
		req.session.destroy();
	} catch (e) {
		return;
	}
});

module.exports = router;
