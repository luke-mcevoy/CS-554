const express = require('express');
const app = express();
const configRoutes = require('./routes');
const session = require('express-session');

const rewriteUnsupportedBrowserMethods = (req, res, next) => {
	// If the user posts to the server with a property called _method, rewrite the request's method
	// To be that method; so if they post _method=PUT you can now allow browsers to POST to a route that gets
	// rewritten in this middleware to a PUT route
	if (req.body && req.body._method) {
		req.method = req.body._method;
		delete req.body._method;
	}

	// let the next middleware run:
	next();
};

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(rewriteUnsupportedBrowserMethods);

app.use(
	session({
		name: 'AuthCookie',
		secret: 'data',
		saveUninitialized: true,
		resave: false,
		cookie: { maxAge: 60000000 },
	}),
);

app.use('/logout', (req, res, next) => {
	if (!req.session.user) {
		return;
	}
	next();
});

app.use(async (req, res, next) => {
	const date = new Date().toUTCString();
	const authenStatus = req.session.user
		? 'Authenticated User'
		: 'Non-Authenticated Users';
	console.log(`[${date}]: ${req.method} ${req.originalUrl} (${authenStatus})`);
	next();
});

configRoutes(app);

app.listen(3000, () => {
	console.log("We've now got a server!");
	console.log('Your routes will be running on http://localhost:3000');
});
