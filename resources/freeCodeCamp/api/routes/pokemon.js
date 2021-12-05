var express = require('express');
var router = express.Router();
var pokemonAPIData = require('./pokemonAPICalls');
const redis = require('redis');
const client = redis.createClient();
// const flatten = require('flatten');

client.flushall();

// Redis
router.get('/page/:pagenum', async (req, res, next) => {
	let pagenum = req.params.pagenum ? req.params.pagenum : 0;
	let cacheForPagenum = await client.getAsync(`pagenum_${pagenum}`);
	if (cacheForPagenum) {
		console.log(`cache home page ${pagenum} returned`);
		res.send(cacheForPagenum);
	} else {
		next();
	}
});

// Axios
router.get('/page/:pagenum', async (req, res, next) => {
	try {
		if (req.params.pagenum) {
			const limit = 20;
			const offset = req.params.pagenum ? req.params.pagenum * limit : 0;
			const pokemonPage = await pokemonAPIData.getPokemonByLimitOffset(
				limit,
				offset,
			);
			if (!pokemonPage)
				throw `Failed to get pokemon for page ${req.params.pagenum}`;

			// console.log(
			// 	`this will be going into the redis server for page_${
			// 		req.params.pagenum
			// 	}: ${flatten(JSON.stringify(pokemonPage))}`,
			// );

			// let cacheForPagenum = await client.setAsync(
			// 	`pagenum_${req.params.pagenum}`,
			// 	flatten(JSON.stringify(pokemonPage)),
			// );
			// if (!cacheForPagenum)
			// 	throw `Could not cache for page ${req.params.pagenum}`;
			res.json(pokemonPage);
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
});

router.get('/:id', async (req, res, next) => {
	try {
		if (req.params.id) {
			const pokemon = await pokemonAPIData.getPokemonByID(req.params.id);
			if (!pokemon) throw `Pokemon of ID ${req.params.id} could not be found`;
			res.json(pokemon);
		}
	} catch (e) {
		console.log(e);
		throw e;
	}
});

router.get('*', function (req, res, next) {
	res.status(404).send('<h1>Page not found on the server</h1>');
});

module.exports = router;
