import React from 'react';
import useAxios from './useAxios';
import '../App.css';

const seriesURL = '';

const Series = (props) => {
	let { seriesData, loading } = useAxios(seriesURL);

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h2>This is Comics page and we got your comics data: {seriesData}</h2>
			</div>
		);
	}
};

export default Series;
