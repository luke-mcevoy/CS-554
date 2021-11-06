import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import queries from '../queries';

const ImageList = (props) => {
	if (props.deleteFromBin) console.log('I can delete from bin');
	if (props.addToBin) console.log('I can add to bin');
	if (props.removeFromBin) console.log('I can remove from bin');
	if (props.getMorePictures) console.log('I can get more pictures');
	if (props.uploadAPost) console.log('I can upload a post');
	// const { loading, error, data } = useQuery(queries.GET_UNSPLASHIMAGES, {
	// 	fetchPolicy: 'cache-and-network',
	// });
	const { loading, error, data } = useQuery(queries.GET_BINNEDIMAGES, {
		fetchPolicy: 'cache-and-network',
	});

	if (data) {
		const { unsplashImages } = data;

		return (
			<div>
				{props.uploadAPost ? (
					<button>
						<Link to="/new-posts">Upload a Post</Link>
					</button>
				) : (
					''
				)}
				{props.getMorePictures ? (
					<button className="button">see fresh pictures</button>
				) : (
					''
				)}
				{unsplashImages &&
					unsplashImages.map((unsplashImage) => {
						return (
							<div className="card" key={unsplashImage._id}>
								<div className="card-body">
									<h1 className="card-title">{unsplashImage.posterName}</h1>
									<img src={unsplashImage.url} alt="new" />
									<h3>Description: {unsplashImage.description}</h3>
									{props.addToBin ? (
										<button className="button">add to bin</button>
									) : (
										''
									)}
									{props.removeFromBin ? (
										<button className="button">remove from bin</button>
									) : (
										''
									)}
									{props.deleteFromBin ? (
										<button className="button">delete from bin</button>
									) : (
										''
									)}
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
};

export default ImageList;
