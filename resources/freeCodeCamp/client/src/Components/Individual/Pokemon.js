import React, { useEffect, useState } from 'react';
import '../../App.css';
import axios from 'axios';
import {
	makeStyles,
	Card,
	CardContent,
	CardMedia,
	Typography,
	CardHeader,
} from '@material-ui/core';
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

const Pokemon = (props) => {
	const [pokemonState, setPokemonState] = useState({
		pokemon: undefined,
		loading: true,
	});
	const classes = useStyles();

	useEffect(() => {
		async function fetchData() {
			console.log(props.match.params.id);
			if (props.match.params.id) {
				try {
					const { data } = await axios.get(
						'http://localhost:9000/pokemon/' + props.match.params.id,
					);
					console.log('Client Pokemnon data: ', data);
					setPokemonState({ pokemon: data, loading: false });
				} catch (e) {
					console.log(e);
				}
			}
		}
		fetchData();
	}, [props.match.params.id]);

	if (pokemonState.loading) {
		return (
			<div>
				<h1>Loading...</h1>
			</div>
		);
	} else {
		return (
			<Card className={classes.card} variant="outlined">
				<CardHeader
					className={classes.titleHead}
					title={pokemonState.pokemon.name}
				/>
				<CardMedia
					className={classes.media}
					component="img"
					image={
						pokemonState.pokemon &&
						pokemonState.pokemon.sprites &&
						pokemonState.pokemon.sprites.front_default ? (
							`${pokemonState.pokemon.sprites.front_default}`
						) : (
							<p>Fuck this</p>
						)
					}
				></CardMedia>
			</Card>
		);
	}
};

export default Pokemon;
