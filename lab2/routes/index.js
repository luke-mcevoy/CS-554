const path = require('path');

const constructorMethod = (app) => {
	app.get('/', (req, res) => {
		res.sendFile(path.resolve('src/static/homepage.html'));
	});

	app.use('*', (req, res) => {
		res.sendFile(path.resolve('src/static/errorpage.html'));
	});
};

module.exports = constructorMethod;
