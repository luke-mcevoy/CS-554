const productRoutes = require('./products');

const constructorMethod = (app) => {
	app.use('/products', productRoutes);

	app.use('*', (req, res) => {
		res.redirect('/products/1');
	});
};

module.exports = constructorMethod;
