const axios = require('axios');
const validation = require('../validation/validation');

const tvmazeBaseURL = 'http://api.tvmaze.com';

const exportedMethods = {
	async getAllShows() {
		try {
			let { data } = await axios.get(tvmazeBaseURL + '/shows');
			return data;
		} catch (e) {
			throw 'Error fetching show list data from API';
		}
	},
	async getShowById(showId) {
		try {
			if (!validation.validShowId(showId)) throw 'Invalid Show ID';
			let { data } = await axios.get(tvmazeBaseURL + `/shows/${showId}`);
			return data;
		} catch (e) {
			throw 'Show not found with provided ID';
		}
	},
	async getShowsBySearch(searchTerm) {
		try {
			if (!validation.validSearchTerm(searchTerm)) throw 'Invalid Search Term';
			let { data } = await axios.get(
				tvmazeBaseURL + `/search/shows?q=${searchTerm}`,
			);
			return data;
		} catch (e) {
			throw 'Shows not found with search term';
		}
	},
	async getPopularSearches() {
		try {
			// Some shit with redis
		} catch (e) {
			throw 'Failed to recevive populate searches';
		}
	},
};

module.exports = exportedMethods;
