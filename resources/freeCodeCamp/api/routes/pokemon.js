var express = require('express');
var router = express.Router();
var pokemonAPIData = require('./pokemonAPICalls');

router.get('/page/:pagenum', async (req, res, next) => {
	try {
		if (req.params.pagenum) {
			const limit = 20;
			const offset = req.params.pagenum ? req.params.pagenum * limit : 0;
			const pokemonPage = await pokemonAPIData.getPokemonByLimitOffset(
				limit,
				offset,
			);
			if (!pokemonPage) throw `Failed to get pokemon for page ${pagenum}`;
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
