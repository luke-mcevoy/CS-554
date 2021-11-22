const pokemonRoutes = require('./pokemon');

const constructorMethod = (app) => {
	app.use('/', pokemonRoutes);
	/*
        /
        /pokemon/page/:pagenum
        /pokemon/:id
        /trainers
    */
};

module.exports = constructorMethod;
