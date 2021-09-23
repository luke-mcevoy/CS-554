const bluebird = require('bluebird');
const express = require('express');
const app = express();
const redis = require('redis');
const client = redis.createClient();
const showsData = require('./data/shows');
const validation = require('./validation/validation');

bluebird.promisifyAll(redis.RedisClient.prototype);
bluebird.promisifyAll(redis.Multi.prototype);

const static = express.static(__dirname + '/public');

const exphbs = require('express-handlebars');
const { default: axios } = require('axios');

app.use('/public', static);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

/**
 * This route will show the list of shows. It will check the cache to see if
 * we have the show list homepage already cached. If the show list homepage is
 * already in the cache, you will serve it from the cache.
 */
app.get('/', async (req, res, next) => {
	let cacheForHomePageExists = await client.getAsync('homePage');
	if (cacheForHomePageExists) {
		res.send(cacheForHomePageExists);
	} else {
		next();
	}
});

/**
 * Get route accessed if the home page is not cached. Will make an axios call to
 * get list of shows data
 */
app.get('/', async (req, res) => {
	try {
		let allShowsData = await showsData.getAllShows();
		res.render('search/searchTerm', { shows: allShowsData });
	} catch (e) {
		throw e;
	}
});

/**
 * This route will show the details of a show. It will check the cache to see if we
 * have the show details page already cached. If so, you will serve it from the cache.
 */
app.get('/show/:id', async (req, res, next) => {
	let showId = req.params.id;
	if (!validation.validShowId(id)) throw 'Invalid Show ID';
	let cacheForShowIdPageExists = await client.getAsync(`showIdPage_${showId}`);
	if (cacheForShowIdPageExists) {
		res.send(cacheForShowIdPageExists);
	} else {
		next();
	}
});

app.get('/show/:id', async (req, res, next) => {
	try {
		let showId = req.params.id;
		if (!validation.validShowId(showId)) throw 'Invalid Show ID';
		let showData = await showsData.getShowById(showId);
		res.render('search/showLink', { show: showData });
	} catch (e) {
		throw e;
	}
});

/**
 * This route will search the data based on the searchTerm that is passed into
 * the request.body
 */
app.post('/search', async (req, res, next) => {
	try {
		let searchTerm = req.body.searchTerm;
		if (!validation.validSearchTerm(searchTerm)) throw 'Invalid Search Term';
		let searchData = await showsData.getShowsBySearch(searchTerm);
	} catch (e) {
		throw e;
	}
});

/**
 * This route will display the top 10 search terms that are stored in our sorted set.
 */
app.get('/popularSearches', async (req, res, next) => {});

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
