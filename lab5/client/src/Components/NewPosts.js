import React from 'react';

function NewPosts() {
	const handleNewPost = async (event) => {
		event.preventDefault();
		let { description } = event.target.elements;
		try {
			console.log('here is the description: ', description);
			console.log('this will be the new post query/mutation');
		} catch (error) {
			alert(error);
		}
	};
	const submitNewImage = async (event) => {
		event.preventDefault();
		let description = document.getElementById('description').value;
		let imageURL = document.getElementById('imageurl').value;
		let authorName = document.getElementById('authorname').value;
		console.log(description, imageURL, authorName);
	};
	return (
		<div>
			<h1>Create a New Post</h1>
			<form onSubmit={submitNewImage}>
				<div className="form-group">
					<label>
						Description:
						<input
							className="form-control"
							name="description"
							id="description"
							type="description"
							placeholder="Description"
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Image URL:
						<input
							className="form-control"
							name="imageurl"
							id="imageurl"
							type="imageurl"
							placeholder="Image Url"
							required
						/>
					</label>
				</div>
				<div className="form-group">
					<label>
						Author Name:
						<input
							className="form-control"
							name="authorname"
							id="authorname"
							type="authorname"
							placeholder="Author Name"
							required
						></input>
					</label>
				</div>
				<button type="submit" onClick={submitNewImage}>
					Submit
				</button>
			</form>
		</div>
	);
}

export default NewPosts;
