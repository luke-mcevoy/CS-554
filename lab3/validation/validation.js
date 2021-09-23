const exportedMethods = {
	validShowId(showId) {
		showId = parseInt(showId);
		if (typeof showId != 'number') {
			return false;
		}
		return true;
	},
	validSearchTerm(searchTerm) {
		if (
			typeof searchTerm != 'string' ||
			searchTerm.replace(/\s/g, '').length == 0
		) {
			return false;
		}
		return true;
	},
};

module.exports = exportedMethods;
