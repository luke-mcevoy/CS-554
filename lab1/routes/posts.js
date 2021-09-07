const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

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
		const post = await postData.getBlogPostById(req.params.id);
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
		console.log('POST called for adding blog');
		console.log(req.body);
		if (!req.body.title) throw 'Missing blog post title';
		if (!req.body.body) throw 'Missing blog post body';
		const addedPost = await postData.addBlogPost(req.params);
		res.json(addedPost);
	} catch (e) {
		res.status(500).send();
	}
});

/**
 *	Updates ALL details of the blog post with the supplied ID
 */
router.put('/:id', async (req, res) => {
	try {
		return;
	} catch (e) {
		return;
	}
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
		return;
	} catch (e) {
		return;
	}
});

/**
 * 	Delets the comment with an ide of commentID on the blog post with an ID
 */
router.delete('/:blogId/:commentId', async (req, res) => {
	try {
		return;
	} catch (e) {
		return;
	}
});

/**
 * 	Creates a new user in the system and returns the created user documen
 */
router.post('/signup', async (req, res) => {
	try {
		return;
	} catch (e) {
		return;
	}
});

/**
 * 	Logs in a user with username and password
 */
router.post('/login', async (req, res) => {
	try {
		return;
	} catch (e) {
		return;
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
