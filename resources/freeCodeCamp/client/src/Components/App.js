import React from 'react';
// import '../App.css';
import { BrowserRouter, Route } from 'react-router-dom';
import Pokemon from './Individual/Pokemon';
import PokemonList from './List/PokemonList';
import TrainersList from './List/TrainersList';
import Navigation from './Navigation';

const App = () => {
	return (
		<BrowserRouter>
			<div className="App">
				<header className="App-header">
					<Navigation />
				</header>
			</div>
			<Route exact path="/pokemon/page/:pagenum" component={PokemonList} />
			<Route exact path="/pokemon/:id" component={Pokemon} />
			<Route exact path="/pokemon/" component={PokemonList} />
			{/* <Route exact path="/trainers" component={TrainersList} /> */}
		</BrowserRouter>
	);
};

export default App;
