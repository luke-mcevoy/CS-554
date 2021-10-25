import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import noImage from '../../img/download.jpeg';
import axios from 'axios';
import '../../App.css';
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

const ComicList = (props) => {
	if (!props.match.params.pagenum) {
		props.match.params.pagenum = 0;
	}

	const comicListURL = 'https://gateway.marvel.com:443/v1/public/comics';
	const regex = /(<([^>]+)>)/gi;

	const [comicsState, setComicsState] = useState({
		comics: undefined,
		loading: true,
	});

	if (!props.match.params.page) {
		props.match.params.page = 0;
	}

	const [pagenum, setPagenum] = useState(0);

	const previousButton = () => {
		if (pagenum !== 0) {
			let url = `/comics/page/${pagenum - 1}`;
			return (
				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setComicsState({
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
				const currComicListURL = URLGenerator(comicListURL);
				const { data } = await axios.get(currComicListURL);
				console.log('data.data.results: ', data.data.results);
				setComicsState({ comics: data.data.results, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, []);

	useEffect(() => {
		async function fetchData() {
			try {
				const limit = 20;
				const offset = limit * parseInt(props.match.params.pagenum) + 1;
				const md5 = require('blueimp-md5');
				const publickey = '3c595077cf2e884efee1655fdbbd3e56';
				const privatekey = 'f030b6590489ed73c2de64024dec779077d67597';
				const ts = new Date().getTime();
				const stringToHash = ts + privatekey + publickey;
				const hash = md5(stringToHash);
				const baseUrl = 'https://gateway.marvel.com:443/v1/public/comics';
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
				const { data } = await axios.get(url);
				setPagenum(parseInt(props.match.params.pagenum));
				setComicsState({
					comics: data.data.results,
					loading: false,
				});
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

	const buildCard = (comic) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={comic.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<Link to={`/comics/${comic.id}`}>
							<CardMedia
								className={classes.media}
								component="img"
								image={
									comic.thumbnail &&
									comic.thumbnail.path &&
									comic.thumbnail.extension
										? `${comic.thumbnail.path}/standard_xlarge.${comic.thumbnail.extension}`
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
									{comic.title}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{comic.description
										? comic.description.replace(regex, '').substring(0, 139) +
										  '...'
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
		comicsState.comics &&
		comicsState.comics.map((comic) => {
			console.log('making card for ', comic.title);
			return buildCard(comic);
		});

	if (comicsState.loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		let url = `/comics/page/${pagenum + 1}`;
		return (
			<div>
				{previousButton()}

				<Link
					className={classes.button}
					to={url}
					onClick={() => {
						setComicsState({
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

export default ComicList;
