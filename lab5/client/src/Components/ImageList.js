import { useQuery, useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import React, { useState } from 'react';
import queries from '../queries';

const ImageList = (props) => {
	const [updateBin] = useMutation(queries.UPDATE_IMAGE);
	const [uploadImage] = useMutation(queries.UPLOAD_USERPOSTEDIMAGE);
	const [deleteFromBin] = useMutation(queries.DELETE_BINNEDIMAGE);
	// const images = [];

	// console.log('Data in ImageList: ', props.data);

	// if (props.deleteFromBin) console.log('I can delete from bin');
	// if (props.addToBin) console.log('I can add to bin');
	// if (props.removeFromBin) console.log('I can remove from bin');
	// if (props.getMorePictures) console.log('I can get more pictures');
	// if (props.uploadAPost) console.log('I can upload a post');

	// console.log('props loading: ', props.loading);
	// console.log('props error: ', props.error);
	// console.log('props data: ', props.data);

	let data = props.data;
	let loading = props.loading;
	let error = props.error;

	if (data) {
		let images;
		if (data.binnedImages) {
			images = data.binnedImages;
		} else if (data.userPostedImages) {
			images = data.userPostedImages;
		} else {
			images = data.unsplashImages;
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
									<h2>Description: {image.description}</h2>
									{props.addToBin && !image.binned ? (
										<button
											className="button"
											onClick={async (e) => {
												e.preventDefault();

												let uploadReturn = await uploadImage({
													variables: {
														url: image.url,
													},
												});

												// console.log(
												// 	'Upload Return: ',
												// 	uploadReturn.data.uploadImage._id,
												// 	typeof uploadReturn.data.uploadImage._id,
												// );

												let updateReturn = await updateBin({
													variables: {
														_id: uploadReturn.data.uploadImage._id,
														userPosted: false,
														binned: true,
													},
												});

												// console.log('Update Return', updateReturn);
											}}
										>
											add to bin
										</button>
									) : (
										''
									)}
									{props.removeFromBin && image.binned ? (
										<button
											className="button"
											onClick={async (e) => {
												e.preventDefault();

												let updateReturn = await updateBin({
													variables: {
														_id: image._id,
														binned: false,
													},
												});

												// console.log('updateReturn: ', updateReturn);
											}}
										>
											remove from bin
										</button>
									) : (
										''
									)}
									{image.userPosted ? (
										<button
											className="button"
											onClick={async (e) => {
												e.preventDefault();

												let deleted = await deleteFromBin({
													variables: {
														_id: image._id,
													},
												});

												// console.log('deleted: ', deleted);
												window.location.reload();
											}}
										>
											delete image
										</button>
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
