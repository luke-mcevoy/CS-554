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

const Comic = (props) => {
	const comicsURL = 'https://gateway.marvel.com:443/v1/public/comics';
	const [comicState, setComicState] = useState({
		comic: undefined,
		loading: true,
	});
	const classes = useStyles();

	useEffect(() => {
		async function fetchComicData() {
			try {
				const currComicURL = URLGenerator(
					comicsURL + '/' + props.match.params.id,
				);
				const { data } = await axios.get(currComicURL);
				console.log('comic fetch data: ', data.data.results[0]);
				setComicState({ comic: data.data.results[0], loading: false });
			} catch (e) {
				console.log(e);
			}
		}
		fetchComicData();
	}, [props.match.params.id]);

	if (comicState.loading) {
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
					title={comicState.comic.title}
				/>
				<CardMedia
					className={classes.media}
					component="img"
					image={
						comicState.comic.thumbnail &&
						comicState.comic.thumbnail.path &&
						comicState.comic.thumbnail.extension
							? `${comicState.comic.thumbnail.path}/standard_xlarge.${comicState.comic.thumbnail.extension}`
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
								{comicState.comic && comicState.comic.description ? (
									<dd>Description: {comicState.comic.description}</dd>
								) : (
									<dd>Description: None</dd>
								)}
							</dt>
							<dt className="title">
								{comicState.comic && comicState.comic.pageCount ? (
									<dd>Page Count: {comicState.comic.pageCount}</dd>
								) : (
									<dd>Page Count: None</dd>
								)}
							</dt>
						</p>
					</dl>
				</CardContent>
			</Card>
		);
	}
};

export default Comic;
