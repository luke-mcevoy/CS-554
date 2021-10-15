import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import SearchShows from './SearchShows';
import noImage from '../img/download.jpeg';
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

import '../App.css';
const useStyles = makeStyles({
	card: {
		maxWidth: 250,
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

const Pagnation = (props) => {
	const regex = /(<([^>]+)>)/gi;
	const classes = useStyles();
	const [loading, setLoading] = useState(true);
	const [searchData, setSearchData] = useState(undefined);
	const [showsData, setShowsData] = useState(undefined);
	const [pageNumber, setPageNumber] = useState(1);
	let card = null;

	useEffect(() => {
		async function fetchData() {
			try {
				const { data: show } = await axios.get(
					`https://api.tvmaze.com/shows?page=${props.match.params.pagenum}`,
				);
				setShowData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.pagenum]);

	useEffect(() => {
		async function fetchData() {
			try {
				const { data } = await axios.get(
					`https://api.tvmaze.com/shows?page=${pageNumber}`,
				);
				setShowData(data);
				setLoading(false);
			} catch (e) {
				console.log(e);
			}
		}
		if (pageNumber) {
			console.log('pageNumber updated');
			fetchData();
		}
	}, [pageNumber]);

	const pageValue = async (value) => {
		setPageNumber(value);
	};

	const buildCard = (show) => {
		return (
			<Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={show.id}>
				<Card className={classes.card} variant="outlined">
					<CardActionArea>
						<Link to={`/shows/${show.id}`}>
							<CardMedia
								className={classes.media}
								component="img"
								image={
									show.image && show.image.original
										? show.image.original
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
									{show.name}
								</Typography>
								<Typography variant="body2" color="textSecondary" component="p">
									{show.summary
										? show.summary.replace(regex, '').substring(0, 139) + '...'
										: 'No Summary'}
									<span>More Info</span>
								</Typography>
							</CardContent>
						</Link>
					</CardActionArea>
				</Card>
			</Grid>
		);
	};

	if (pageNumber) {
		card =
			searchData &&
			searchData.map((shows) => {
				let { show } = shows;
				return buildCard(show);
			});
	} else {
		card =
			showsData &&
			showsData.map((show) => {
				return buildCard(show);
			});
	}

	if (loading) {
		return (
			<div>
				<h2>Loading....</h2>
			</div>
		);
	} else {
		return (
			<div>
				<SearchShows searchValue={searchValue} />
				<br />
				<br />
				<Button className="pageNumButtonPrev">Previous</Button>
				<Button className="pageNumButtonNext">Next</Button>
				<Grid container className={classes.grid} spacing={5}>
					{card}
				</Grid>
			</div>
		);
	}
};

export default Pagnation;
