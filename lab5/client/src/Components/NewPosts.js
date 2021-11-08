import { useMutation } from '@apollo/client';
import queries from '../queries';
import React from 'react';

function NewPosts() {
	const [addUserPostedImage] = useMutation(queries.UPLOAD_USERPOSTEDIMAGE, {
		update(cache, { data: { addUserPostedImage } }) {
			const queryData = cache.readQuery({
				query: queries.GET_USERPOSTEDIMAGES,
			});
			let userPostedImages = [];
			console.log(cache);
			console.log(addUserPostedImage);
			if (!addUserPostedImage) {
				addUserPostedImage = [];
			}
			if (queryData !== null) {
				userPostedImages = queryData.userPostedImages;
			}
			console.log(addUserPostedImage);
			cache.writeQuery({
				query: queries.GET_USERPOSTEDIMAGES,
				data: {
					userPostedImages: userPostedImages.concat([addUserPostedImage]),
				},
			});
			console.log(cache);
		},
	});

	let description;
	let url;
	let posterName;
	return (
		<div>
			<h1>Create a New Post</h1>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					addUserPostedImage({
						variables: {
							description: description.value,
							url: url.value,
							posterName: posterName.value,
						},
					});
					console.log(addUserPostedImage);
					description.value = '';
					url.value = '';
					posterName.value = '';
					alert('User Image Added');
				}}
			>
				<div className="form-group">
					<label>
						Description:
						<br />
						<input
							ref={(node) => {
								description = node;
							}}
							autoFocus={true}
						/>
					</label>
				</div>
				<br />
				<div className="form-group">
					<label>
						Image URL:
						<input
							ref={(node) => {
								url = node;
							}}
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Poster Name:
						<input
							ref={(node) => {
								posterName = node;
							}}
						/>
					</label>
				</div>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default NewPosts;
