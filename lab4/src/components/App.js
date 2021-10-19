import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Characters from './Characters';
import Comics from './Comics';
import Series from './Series';
import Landing from './Landing';
import Navigation from './Navigation';

const App = () => {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Navigation />
				</header>
			</div>
			<Route exact path="/" component={Landing} />
			<Route path="/characters" component={Characters} />
			<Route path="/comics" component={Comics} />
			<Route path="/series" component={Series} />

			{/* <Route exact path="/characters/page/:pagenum" component={Characters} />
			<Route exact path="/characters/:id" component={Characters} />
			<Route exact path="/comics/page/:page" component={Comics} />
			<Route exact path="/comics/:id" component={Comics} />
			<Route exact path="/series/page/:page" component={Series} />
			<Route exact path="/series/:id" component={Series} /> */}
		</Router>
	);
};

export default App;
