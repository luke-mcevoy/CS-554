import '../../App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import URLGenerator from '../URLGenerator';

const comicsURL = 'https://gateway.marvel.com:443/v1/public/comics';

const Comic = (props) => {
	const [comicsState, setComicsState] = useState({
		data: undefined,
		loading: true,
	});

	// Comics id
	useEffect(() => {
		async function fetchComicData() {
			try {
				const currComicURL = URLGenerator(comicsURL);
				console.log('currComicURL: ', comicsURL);
				const { data: comic } = await axios.get(
					currComicURL + '/' + props.match.params.id,
				);
				setComicsState({ data: comic, loading: false });
				console.log(comic);
			} catch (e) {
				console.log(e);
			}
		}
		fetchComicData();
	}, [props.match.params.id]);

	if (comicsState.loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h2>
					This is Comics page and we got your comics data: {comicsState.data}
				</h2>
			</div>
		);
	}
};

export default Comic;
