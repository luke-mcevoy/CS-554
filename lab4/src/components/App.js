import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ComicList from './list/ComicList';
import CharacterList from './list/CharacterList';
import SeriesList from './list/SeriesList';
import Landing from './Landing';
import Navigation from './Navigation';
import Comic from './individual/Comic';
import Character from './individual/Character';
import Series from './individual/Series';

const App = () => {
	return (
		<Router>
			<div className="App">
				<header className="App-header">
					<Navigation />
				</header>
			</div>
			<Route exact path="/" component={Landing} />
			<Route exact path="/characters" component={CharacterList} />
			<Route exact path="/comics" component={ComicList} />
			<Route exact path="/series" component={SeriesList} />
			<Route exact path="/characters/page/:pagenum" component={CharacterList} />
			<Route exact path="/characters/:id" component={Character} />
			<Route exact path="/comics/page/:page" component={ComicList} />
			<Route exact path="/comics/:id" component={Comic} />
			<Route exact path="/series/page/:page" component={SeriesList} />
			<Route exact path="/series/:id" component={Series} />
		</Router>
	);
};

export default App;
