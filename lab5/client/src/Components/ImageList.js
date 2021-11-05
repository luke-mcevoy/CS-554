import { useQuery } from '@apollo/client';
import React, { useState } from 'react';
import queries from '../queries';

function ImageList() {
	const { loading, error, data } = useQuery(queries.GET_UNSPLASHIMAGES, {
		fetchPolicy: 'cache-and-network',
	});

	if (data) {
		const { unsplashImages } = data;
		console.log(unsplashImages);

		return (
			<div>
				{unsplashImages.map((unsplashImage) => {
					return (
						<div className="card" key={unsplashImage._id}>
							<div className="card-body">
								<h1 className="card-title">{unsplashImage.posterName}</h1>
								<img src={unsplashImage.url} alt="new" />
								<h3>Description: {unsplashImage.description}</h3>
								<button className="button">add to bin</button>
							</div>
						</div>
					);
				})}
			</div>
		);
	} else if (loading) {
		return <div>Loading</div>;
	} else {
		return <div>{error.message}</div>;
	}
}

export default ImageList;
