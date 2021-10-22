import React, { useState, setState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../img/download.jpeg';
import ReactPaginate from 'react-paginate';
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
import '../../App.css';
import URLGenerator from '../URLGenerator';
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

const CharacterList = (props) => {
	const characterListURL =
		'https://gateway.marvel.com:443/v1/public/characters';
	const regex = /(<([^>]+)>)/gi;
	const [charactersState, setCharactersState] = useState({
		characters: undefined,
		loading: true,
	});

	if (!props.match.params.page) {
		props.match.params.page = 0;
		console.log('Page num is', props.match.params.page);
	} else {
		console.log('Page num is', props.match.params.page);
	}

	const [pageNum, setPageNum] = useState(props.match.params.page);

	const classes = useStyles();
	let card = null;

	useEffect(() => {
		async function fetchData() {
			try {
				const currCharactersListURL = URLGenerator(characterListURL);
				console.log('currCharactersList URL: ', currCharactersListURL);
				const { data } = await axios.get(currCharactersListURL);
				console.log('characters data from fetch:', data.data.results);
				setCharactersState({ characters: data.data.results, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	// This fails with 401
	useEffect(() => {
		async function fetchData() {
			try {
				const limit = 20;
				const offset = 100;
				// https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=20&apikey=
				const md5 = require('blueimp-md5');
				const publickey = '3c595077cf2e884efee1655fdbbd3e56';
				const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
				const ts = new Date().getTime();
				const stringToHash = ts + privatekey + publickey;
				const hash = md5(stringToHash);
				const baseUrl =
					'https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=20';
				const url =
					baseUrl + '?ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
				console.log('Current Characters Page URL: ', url);
				const { data: characters } = await axios.get(url);
				setCharactersState({ data: characters.data.results, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [pageNum, props.match.params.page]);

	const buildCard = (character) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={character.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<Link to={`/characters/${character.id}`}>
							<CardMedia
								className={classes.media}
								component="img"
								image={
									character.thumbnail &&
									character.thumbnail.path &&
									character.thumbnail.extension
										? `${character.thumbnail.path}/standard_xlarge.${character.thumbnail.extension}`
										: noImage
								}
								title="show image"
							/>
							<CardContent>
								<Typography
									className={classes.titleHead}
									gutterBottom
									variant="h6"
									component="h3"
								>
									{character.name}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{character.description
										? character.description
												.replace(regex, '')
												.substring(0, 139) + '...'
										: 'No description'}
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	card =
		charactersState.characters &&
		charactersState.characters.map((character) => {
			return buildCard(character);
		});

	const pageIncrease = () => {
		console.log('pageIncrease fired');
		console.log('pageIncrease pageNume before: ', props.match.params.page);
		props.match.params.page = parseInt(props.match.params.page) + 1;
		console.log('pageIncrease pageNume after: ', props.match.params.page);
	};

	const pageDecrease = () => {
		console.log('pageIncrease fired');
		console.log('pageIncrease pageNume before: ', props.match.params.page);
		props.match.params.page = parseInt(props.match.params.page) - 1;
		console.log('pageIncrease pageNume after: ', props.match.params.page);
	};

	if (charactersState.loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<Link to={`/characters/page/${parseInt(props.match.params.page) - 1}`}>
					<Button onChange={pageDecrease}>Previous</Button>
				</Link>

				<Link to={`/characters/page/${parseInt(props.match.params.page) + 1}`}>
					<Button onChange={pageIncrease}>Next</Button>
				</Link>
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default CharacterList;
