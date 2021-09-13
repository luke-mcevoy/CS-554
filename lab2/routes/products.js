const express = require('express');
const router = express.Router();
const data = require('../data');
const productData = data.products;

router.get('/:id', (req, res) => {
	productData
		.getProduct(req.params.id)
		.then((product) => {
			res.render('products/single', { productContent: product });
		})
		.catch(() => {
			res.render(404).json({ error: 'Product not found' });
		});
});

router.get('/', (req, res) => {
	productData.getLocalProducts().then(
		(productList) => {
			res.render('products/local', productList);
		},
		() => {
			res.sendStatus(500);
		},
	);
});

module.exports = router;
