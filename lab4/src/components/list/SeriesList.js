import React, { useState, useEffect } from 'react';
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

const SeriesList = (props) => {
	const seriesURL = 'https://gateway.marvel.com:443/v1/public/series';
	const regex = /(<([^>]+)>)/gi;
	const [seriesState, setSeriesState] = useState({
		series: undefined,
		loading: true,
	});

	if (!props.match.params.page) {
		props.match.params.page = 0;
	}

	const [seriesPageNum, setSeriesPageNum] = useState(props.match.params.page);

	const classes = useStyles();
	let card = null;

	useEffect(() => {
		async function fetchData() {
			try {
				const currSeriesURL = URLGenerator(seriesURL);
				const { data } = await axios.get(currSeriesURL);
				setSeriesState({ series: data.data.results, loading: false });
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
					'https://gateway.marvel.com:443/v1/public/series?limit=10&offset=20';
				const url =
					baseUrl + '&ts=' + ts + '&apikey=' + publickey + '&hash=' + hash;
				const { data } = await axios.get(url);
				setSeriesState({ series: data.data.results, loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [seriesPageNum, props.match.params.page]);

	const buildCard = (series) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={series.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<Link to={`/series/${series.id}`}>
							<CardMedia
								className={classes.media}
								component="img"
								image={
									series.thumbnail &&
									series.thumbnail.path &&
									series.thumbnail.extension
										? `${series.thumbnail.path}/standard_xlarge.${series.thumbnail.extension}`
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
									{series.name}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{series.description
										? series.description.replace(regex, '').substring(0, 139) +
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
		seriesState.series &&
		seriesState.series.map((character) => {
			return buildCard(character);
		});

	if (seriesState.loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<Link to={`/series/page/${parseInt(props.match.params.page) - 1}`}>
					<Button>Previous</Button>
				</Link>

				<Link to={`/series/page/${parseInt(props.match.params.page) + 1}`}>
					<Button>Next</Button>
				</Link>
				<br />
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default SeriesList;
