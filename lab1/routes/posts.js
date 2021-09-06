const express = require('express');
const router = express.Router();
const data = require('../data');
const postData = data.posts;

router.get('/:id', async (req, res) => {
	try {
		const post = await postData.getBlogPostById(req.params.id);
		res.json(post);
	} catch (e) {
		res.status(404).json({ message: 'Blog post not found' });
	}
});

router.get('/', async (req, res) => {
	try {
		const postList = await postData.getAllBlogPosts();
		res.json(postList);
	} catch (e) {
		res.status(500).send();
	}
});

router.post('/', async (req, res) => {
	// Not implemented
	res.status(501).send();
});

router.delete('/', async (req, res) => {
	// Not implemented
	res.status(501).send();
});

module.exports = router;
