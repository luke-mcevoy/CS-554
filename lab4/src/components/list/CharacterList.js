import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../img/download.jpeg';
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
import SearchMarvel from '../search/SearchMarvel';
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
	if (!props.match.params.pagenum) {
		props.match.params.pagenum = 0;
	}

	const characterListURL =
		'https://gateway.marvel.com:443/v1/public/characters';
	const regex = /(<([^>]+)>)/gi;

	const [charactersState, setCharactersState] = useState({
		characters: undefined,
		loading: true,
	});
	const [characterSearchTerm, setCharacterSearchTerm] = useState('');
	const [pagenum, setPagenum] = useState(0);

	const previousButton = () => {
		if (pagenum !== 0) {
			let url = `/characters/page/${pagenum - 1}`;
			return (
				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setCharactersState({
							loading: true,
						});
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
				const limit = 20;
				const offset = limit * parseInt(props.match.params.pagenum) + 1;
				// https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=20&apikey=
				const md5 = require('blueimp-md5');
				const publickey = '3c595077cf2e884efee1655fdbbd3e56';
				const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
				const ts = new Date().getTime();
				const stringToHash = ts + privatekey + publickey;
				const hash = md5(stringToHash);
				const baseUrl =
					// 'https://gateway.marvel.com:443/v1/public/characters?limit=10&offset=20';
					'https://gateway.marvel.com:443/v1/public/characters';
				const url =
					baseUrl +
					'?limit=' +
					limit +
					'&offset=' +
					offset +
					'&ts=' +
					ts +
					'&apikey=' +
					publickey +
					'&hash=' +
					hash;
				console.log('Current Characters Page URL: ', url);
				const { data } = await axios.get(url);
				setPagenum(parseInt(props.match.params.pagenum));
				setCharactersState({
					characters: data.data.results,
					loading: false,
				});
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

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

	useEffect(() => {
		async function fetchData() {
			try {
				const md5 = require('blueimp-md5');
				const publickey = '3c595077cf2e884efee1655fdbbd3e56';
				const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
				const ts = new Date().getTime();
				const stringToHash = ts + privatekey + publickey;
				const hash = md5(stringToHash);
				const baseUrl =
					'https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=' +
					characterSearchTerm;
				const url =
					baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
				console.log('url for searchTerm of the character list is ', url);
				const { data } = await axios.get(url);
				console.log(
					'characters data from searchTerm fetch:',
					data.data.results,
				);
				setCharactersState({ characters: data.data.results, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		if (characterSearchTerm) {
			fetchData();
		}
	}, [characterSearchTerm]);

	const searchValue = async (value) => {
		console.log('searchValue is', value);
		setCharacterSearchTerm(value);
	};

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
									component="h1"
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
								<Typography variant="body2" color="textSecondary" component="p">
									{character.comics.available
										? 'Comics avaliable: ' + character.comics.available
										: 'No Comics'}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{character.events.available
										? 'Events avaliable: ' + character.events.available
										: 'No Events'}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{character.series.available
										? 'Series avaliable: ' + character.series.available
										: 'No Events'}
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

	if (charactersState.loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		let url = `/characters/page/${pagenum + 1}`;
		return (
			<div>
				<SearchMarvel searchValue={searchValue} />
				{previousButton()}

				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setCharactersState({
							loading: true,
						});
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
};

export default CharacterList;
