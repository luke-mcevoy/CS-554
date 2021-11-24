import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
	Card,
	CardActionArea,
	CardContent,
	CardMedia,
	Grid,
	Typography,
	makeStyles,
	Button,
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

const PokemonList = (props) => {
	if (!props.match.params.pagenum) {
		props.match.params.pagenum = 0;
	}

	const [pokemonListState, setPokemonListState] = useState({
		pokemonList: undefined,
		loading: true,
	});
	const [pagenum, setPagenum] = useState(0);

	const previousButton = () => {
		if (pagenum !== 0) {
			let url = `/pokemon/page/${pagenum - 1}`;
			return (
				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setPokemonListState({ loading: true });
					}}
				>
					<Button variant="contained">Previous</Button>
				</Link>
			);
		}
	};

	const classes = useStyles();
	let card = null;

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(
					'http://localhost:9000/pokemon/page/' + props.match.params.pagenum,
				);
				console.log(
					'Client side pokemon list: ',
					data.previous,
					data.next,
					data.results,
					typeof data.results,
				);
				setPagenum(parseInt(props.match.params.pagenum));
				const pokemonObj = data.results;
				console.log('pokemonObj: ', pokemonObj, typeof pokemonObj);
				let pokemonArr = [];

				for (let pokemon of pokemonObj) {
					pokemonArr.push({
						name: pokemon.name,
						url: pokemon.url,
						// image: pokemon.sprites.front_default,
					});
				}

				setPokemonListState({ pokemonList: pokemonArr, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

	const buildCard = (pokemon) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={pokemon.name}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<Link to={`/pokemon/${pokemon.name}`}>
							<CardMedia
								className={classes.media}
								component="img"
								image={
									pokemon && pokemon.image ? pokemon.image : <p>Fuck this</p>
								}
								title="show image"
							></CardMedia>
							<CardContent>
								<Typography
									className={classes.titleHead}
									variant="h6"
									component="h1"
								>
									{pokemon.name}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	card =
		pokemonListState.pokemonList &&
		pokemonListState.pokemonList.map((pokemon) => {
			return buildCard(pokemon);
		});

	if (pokemonListState.loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		let url = `/pokemon/page/${pagenum + 1}`;
		return (
			<div>
				{previousButton()}
				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setPokemonListState({ loading: true });
					}}
				>
					<Button variant="contained">Next</Button>
				</Link>

				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}

	// return <div>What up player</div>;
};

export default PokemonList;
