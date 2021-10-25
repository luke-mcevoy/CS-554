import React, { useState, useEffect } from 'react';
import URLGenerator from '../URLGenerator';
import noImage from '../../img/download.jpeg';
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

const Series = (props) => {
	const seriesURL = 'https://gateway.marvel.com:443/v1/public/series';
	const [seriesState, setSeriesState] = useState({
		series: undefined,
		loading: true,
	});
	const classes = useStyles();

	useEffect(() => {
		async function fetchData() {
			try {
				const currSeriesURL = URLGenerator(
					seriesURL + '/' + props.match.params.id,
				);
				const { data } = await axios.get(currSeriesURL);
				console.log('Series fetch: ', data.data.results[0]);
				setSeriesState({ series: data.data.results[0], loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchData();
	}, [props.match.params.id]);

	let description = null;
	const regex = /(<([^>]+)>)/gi;
	if (seriesState.series && seriesState.series.description) {
		description =
			seriesState.series && seriesState.series.description.replace(regex, '');
	} else {
		description = 'No description';
	}

	if (seriesState.loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<Card className={classes.card} variant="outlined">
				<CardHeader
					className={classes.titleHead}
					title={seriesState.series.title}
				/>
				<CardMedia
					className={classes.media}
					component="img"
					image={
						seriesState.series.thumbnail &&
						seriesState.series.thumbnail.path &&
						seriesState.series.thumbnail.extension
							? `${seriesState.series.thumbnail.path}/standard_xlarge.${seriesState.series.thumbnail.extension}`
							: noImage
					}
					title="show image"
				/>

				<CardContent>
					<Typography
						variant="body2"
						color="textSecondary"
						components="span"
					></Typography>
					<dl>
						<p>
							<dt className="title">
								{seriesState.series && seriesState.series.startYear ? (
									<dd>Start Year: {seriesState.series.startYear}</dd>
								) : (
									<dd>Start Year: None</dd>
								)}
							</dt>
							<dt className="title">
								{seriesState.series && seriesState.series.endYear ? (
									<dd>End Year: {seriesState.series.endYear}</dd>
								) : (
									<dd>End Year: None</dd>
								)}
							</dt>
							<dt className="title">
								{seriesState.series && seriesState.series.rating ? (
									<dd>Rating: {seriesState.series.raing}</dd>
								) : (
									<dd>Rating: None</dd>
								)}
							</dt>
						</p>
					</dl>
				</CardContent>
			</Card>
		);
	}
};

export default Series;
