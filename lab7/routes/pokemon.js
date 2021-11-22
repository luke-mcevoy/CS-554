const express = require('express');
const router = express.Router();
const redis = require('redis');
const client = redis.createClient();

client.flushall();

/**
 * This route will show the details of a show. It will check the cache to see if we
 * have the show details page already cached. If so, you will serve it from the cache.
 */

// Redis
router.get('/page/:page', async (req, res, next) => {
	try {
	} catch (e) {
		console.log(e);
		throw e;
	}
});

// Axios
router.get('/page/:page', async (req, res, next) => {
	try {
	} catch (e) {
		console.log(e);
		throw e;
	}
});

/**
 * This route will search the data based on the searchTerm that is passed into
 * the request.body
 */

// Redis
router.get('/:id', async (req, res, next) => {
	try {
	} catch (e) {
		console.log(e);
		throw e;
	}
});

// Axios
router.get('/:id', async (req, res, next) => {
	try {
	} catch (e) {
		console.log(e);
		throw e;
	}
});

module.exports = router;
