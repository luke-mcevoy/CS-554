const searchRoutes = require('./search');

const constructorMethod = (app) => {
	app.use('/', searchRoutes);
};

module.exports = constructorMethod;
