import { NavLink } from 'react-router-dom';
import '../App.css';

const Navigation = () => {
	return (
		<nav className="navigation">
			<ul>
				<li>
					<NavLink exact to="/" activeClassName="active">
						Landing
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/characters" activeClassName="active">
						Characters
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/comics" activeClassName="active">
						Comics
					</NavLink>
				</li>
				<li>
					<NavLink exact to="/series" activeClassName="active">
						Series
					</NavLink>
				</li>
			</ul>
		</nav>
	);
};

export default Navigation;
