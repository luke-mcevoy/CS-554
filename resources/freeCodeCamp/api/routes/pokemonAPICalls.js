const axios = require('axios');
const pokemonBaseURL = 'https://pokeapi.co/api/v2';

const exportedMethods = {
	async getPokemonByLimitOffset(limit, offset) {
		try {
			let GET;
			if (limit && offset) {
				GET = `${pokemonBaseURL}/pokemon/?limit=${limit}&offset=${offset}`;
			} else if (limit && !offset) {
				GET = `${pokemonBaseURL}/pokemon/?limit=${limit}`;
			} else if (!limit && offset) {
				GET = `${pokemonBaseURL}/pokemon/?offset=${offset}`;
			} else {
				GET = `${pokemonBaseURL}/pokemon/`;
			}
			let { data } = await axios.get(
				`${pokemonBaseURL}/pokemon/?limit=${limit}&offset=${offset}`,
			);
			return data;
		} catch (e) {
			console.log(e);
			throw 'Error fetching show list data from API';
		}
	},
	async getPokemonByID(pokemonID) {
		// https://pokeapi.co/api/v2/pokemon/{id or name}/
		try {
			console.log('Pokemon ID: ', pokemonID);
			let { data } = await axios.get(pokemonBaseURL + `/pokemon/${pokemonID}`);
			return data;
		} catch (e) {
			console.log(e);
			throw 'Show not found with provided ID';
		}
	},
};

module.exports = exportedMethods;
