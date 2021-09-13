const Promise = require('bluebird');
const fs = Promise.promisifyAll(require('fs'));
const path = require('path');

let exportedMethods = {
	getLocalProducts() {
		return new Promise((resolve, reject) => {
			resolve([{ 1: 'One' }]);
		});
	},
	// This is a fun new syntax that was brought forth in ES6, where we can define
	// methods on an object with this shorthand!
	getProduct(id) {
		const productPath = path.resolve(__dirname, 'product-files/', `${id}.html`);

		return fs.statAsync(productPath).then((stats) => {
			return fs.readFileAsync(productPath, 'utf-8');
		});
	},
};

module.exports = exportedMethods;
