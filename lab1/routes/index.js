const postRoutes = require('./posts');

const constructorMethod = (app) => {
	app.use('/blog', postRoutes);

	app.use('*', (req, res) => {
		res.status(404).json({ error: 'Not found' });
	});
};

module.exports = constructorMethod;
