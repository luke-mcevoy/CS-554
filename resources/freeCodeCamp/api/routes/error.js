var express = require('express');
var router = express.Router();

router.get('*', function (req, res, next) {
	res.status(404).send('<h1>Page not found on the server</h1>');
});

module.exports = router;
