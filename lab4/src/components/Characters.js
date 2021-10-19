import React from 'react';
import useAxios from './useAxios';
import '../App.css';

const charactersURL = '';

const Characters = (props) => {
	let { charactersData, loading } = useAxios(charactersURL);

	if (loading) {
		return (
			<div>
				<h2>Loading...</h2>
			</div>
		);
	} else {
		return (
			<div>
				<h2>
					This is Comics page and we got your comics data: {charactersData}
				</h2>
			</div>
		);
	}
};

export default Characters;
