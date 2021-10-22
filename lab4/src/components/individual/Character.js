import React, { useState, useEffect } from 'react';
import URLGenerator from '../URLGenerator';
import axios from 'axios';
import {
	makeStyles,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
} from '@material-ui/core';
import '../../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 550,
		height: 'auto',
		marginLeft: 'auto',
		marginRight: 'auto',
		borderRadius: 5,
		border: '1px solid #1e8678',
		boxShadow: '0 19px 38px rgba(0,0,0,0.30), 0 15px 12px rgba(0,0,0,0.22);',
	},
	titleHead: {
		borderBottom: '1px solid #1e8678',
		fontWeight: 'bold',
	},
	grid: {
		flexGrow: 1,
		flexDirection: 'row',
	},
	media: {
		height: '100%',
		width: '100%',
	},
	button: {
		color: '#1e8678',
		fontWeight: 'bold',
		fontSize: 12,
	},
});

const Character = (props) => {
	const characterListURL =
		'https://gateway.marvel.com:443/v1/public/characters';
	const [characterState, setCharacterState] = useState({
		character: undefined,
		loading: true,
	});
	const classes = useStyles();

	useEffect(() => {
		async function fetchData() {
			try {
				const currCharacterURL = URLGenerator(
					characterListURL + '/' + props.match.params.id,
				);
				console.log('currCharacterURL: ', currCharacterURL);
				const { data } = await axios.get(currCharacterURL);
				console.log('characer data: ', data.data.results[0]);
				setCharacterState({ character: data.data.results[0], loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.id]);

	let description = null;
	const regex = /(<([^>]+)>)/gi;
	if (characterState.character && characterState.character.description) {
		description =
			characterState.character &&
			characterState.character.description.replace(regex, '');
	} else {
		description = 'No description';
	}

	let name = null;
	if (characterState.character && characterState.character.name) {
		name = characterState.character && characterState.character.name;
	} else {
		name = 'No name';
	}

	if (characterState.loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h1>
					Card will go here for {name} and {description}
				</h1>
			</div>
		);
	}
};

export default Character;
