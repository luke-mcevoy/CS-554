import { NavLink } from 'react-router-dom';
import '../App.css';

const Navigation = () => {
	return (
		<nav className="navigation">
			<ul>
				<li>
					<NavLink exact to="/" activeClassName="active">
						Home
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/pokemon" activeClassName="active">
						Pokemon
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/trainers" activeClassName="active">
						Trainers
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
