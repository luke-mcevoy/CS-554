import React from 'react';
// import './App.css';
import Home from './Home';
import MyBin from './MyBin';
import MyPosts from './MyPosts';
import NewPosts from './NewPosts';
import { NavLink, BrowserRouter as Router, Route } from 'react-router-dom';
import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	ApolloProvider,
} from '@apollo/client';
const client = new ApolloClient({
	cache: new InMemoryCache(),
	link: new HttpLink({
		uri: 'http://localhost:4000',
	}),
});

function App() {
	return (
		<ApolloProvider client={client}>
			<Router>
				<div>
					<header className="App-header">
						<nav>
							<NavLink className="navlink" to="/my-bin">
								my-bin
							</NavLink>
							<br></br>
							<NavLink className="navlink" to="/">
								images
							</NavLink>
							<br></br>
							<NavLink className="navlink" to="/my-posts">
								my-posts
							</NavLink>
							{/* <br></br>
							<NavLink className="navlink" to="/new-posts">
								new-post
							</NavLink> */}
						</nav>
					</header>
					<Route exact path="/" component={Home} />
					<Route exact path="/my-bin" component={MyBin} />
					<Route exact path="/my-posts" component={MyPosts} />
					<Route exact path="/new-posts" component={NewPosts} />
				</div>
			</Router>
		</ApolloProvider>
	);
}

export default App;
