import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import queries from '../queries';

const ImageList = (props) => {
	const [pageNum, setPagenum] = useState(0);
	console.log('Data in ImageList: ', props.data);

	if (props.deleteFromBin) console.log('I can delete from bin');
	if (props.addToBin) console.log('I can add to bin');
	if (props.removeFromBin) console.log('I can remove from bin');
	if (props.getMorePictures) console.log('I can get more pictures');
	if (props.uploadAPost) console.log('I can upload a post');

	console.log('props loading: ', props.loading);
	console.log('props error: ', props.error);
	console.log('props data: ', props.data);

	let data = props.data;
	let loading = props.loading;
	let error = props.error;

	if (data) {
		let images;
		if (props.binnedQuery && data) {
			const { binnedImages } = data;
			images = binnedImages;
		} else if (data.userPostedImages) {
			const { userPostedImages } = data;
			images = data.userPostedImages;
		} else {
			const { unsplashImages } = data;
			images = unsplashImages;
		}

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
				{images &&
					images.map((image) => {
						return (
							<div className="card" key={image._id}>
								<div className="card-body">
									<h1 className="card-title">{image.posterName}</h1>
									<img src={image.url} alt="new" />
									<h3>Description: {image.description}</h3>
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
