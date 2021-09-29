const express = require('express');
const router = express.Router();
const showsData = require('../data/shows');
const redis = require('redis');
const client = redis.createClient();
const validation = require('../validation/validation');

/**
 * This route will show the list of shows. It will check the cache to see if
 * we have the show list homepage already cached. If the show list homepage is
 * already in the cache, you will serve it from the cache.
 */

// Redis
router.get('/', async (req, res, next) => {
	let cacheForHomePageExists = await client.getAsync('homePage');
	if (cacheForHomePageExists) {
		console.log('cache home page returned');
		res.send(cacheForHomePageExists);
	} else {
		next();
	}
});

// Axios
router.get('/', async (req, res) => {
	try {
		console.log('axios home page returned');
		let allShowsData = await showsData.getAllShows();
		res.render('search/searchTerm', { shows: allShowsData });
	} catch (e) {
		console.log(e);
		throw e;
	}
});

/**
 * This route will show the details of a show. It will check the cache to see if we
 * have the show details page already cached. If so, you will serve it from the cache.
 */

// Redis
router.get('/show/:id', async (req, res, next) => {
	let showId = req.params.id;
	if (!validation.validShowId(showId)) throw 'Invalid Show ID';
	let cacheForShowIdPageExists = await client.getAsync(`showIdPage_${showId}`);
	if (cacheForShowIdPageExists) {
		console.log(`cache show ${showId} page returned`);
		res.send(cacheForShowIdPageExists);
	} else {
		next();
	}
});

// Axios
router.get('/show/:id', async (req, res, next) => {
	try {
		let showId = req.params.id;
		if (!validation.validShowId(showId)) throw 'Invalid Show ID';
		let showData = await showsData.getShowById(showId);
		console.log(`axios show ${showData.id} page returned`);
		res.render('search/showLink', { show: showData });
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
router.post('/search', async (req, res, next) => {
	try {
		let searchTerm = req.body.searchTerm;
		if (!validation.validSearchTerm(searchTerm)) throw 'Invalid Search Term';
		let cacheForSearchTermPageExists = await client.getAsync(
			`searchTermPage_${searchTerm}`,
		);
		if (cacheForSearchTermPageExists) {
			res.send(cacheForSearchTermPageExists);
		} else {
			next();
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
});

// Axios
router.post('/search', async (req, res, next) => {
	try {
		let searchTerm = req.body.searchTerm;
		if (!validation.validSearchTerm(searchTerm)) throw 'Invalid Search Term';
		let searchData = await showsData.getShowsBySearch(searchTerm);
		res.render({ json: searchData });
	} catch (e) {
		console.log(e);
		throw e;
	}
});

/**
 * This route will display the top 10 search terms that are stored in our sorted set.
 */

// Redis
router.get('/popularSearches', async (req, res, next) => {
	try {
		// Redis cache page, are they unique?
	} catch (e) {
		console.log(e);
		throw e;
	}
});

// Axios
router.get('/popularSearches', async (req, res, next) => {
	try {
	} catch (e) {
		console.log(e);
		throw e;
	}
});

module.exports = router;
